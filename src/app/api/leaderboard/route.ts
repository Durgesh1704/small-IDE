import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'ALL_TIME';
    const limit = parseInt(searchParams.get('limit') || '10');

    const leaderboard = await db.leaderboard.findMany({
      where: { period: period.toUpperCase() },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: [
        { impactScore: 'desc' },
        { totalCarbonOffset: 'desc' },
        { treesPlanted: 'desc' },
        { plasticRecycled: 'desc' },
      ],
      take: limit,
    });

    // Add rank to each entry
    const leaderboardWithRanks = leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    return NextResponse.json({ leaderboard: leaderboardWithRanks });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, period = 'ALL_TIME' } = await request.json();

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's activities to calculate leaderboard stats
    const activities = await db.activity.findMany({
      where: { userId },
      include: {
        carbonCredits: true,
      },
    });

    const stats = {
      treesPlanted: 0,
      plasticRecycled: 0,
      totalCarbonOffset: 0,
      impactScore: 0,
    };

    activities.forEach((activity) => {
      stats.totalCarbonOffset += activity.carbonOffset;
      stats.impactScore += Math.round(activity.carbonOffset * 10);

      if (activity.type === 'TREE_PLANTING') {
        const metadata = activity.metadata ? JSON.parse(activity.metadata) : {};
        stats.treesPlanted += metadata.treeCount || 1;
      } else if (activity.type === 'PLASTIC_RECYCLING') {
        const metadata = activity.metadata ? JSON.parse(activity.metadata) : {};
        stats.plasticRecycled += metadata.weight || 1;
      }
    });

    // Update or create leaderboard entry
    const leaderboard = await db.leaderboard.upsert({
      where: { 
        userId_period: {
          userId,
          period: period.toUpperCase(),
        },
      },
      update: {
        ...stats,
        lastUpdated: new Date(),
      },
      create: {
        userId,
        period: period.toUpperCase(),
        ...stats,
      },
    });

    return NextResponse.json({
      message: 'Leaderboard updated successfully',
      leaderboard,
    });
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to update leaderboard' },
      { status: 500 }
    );
  }
}