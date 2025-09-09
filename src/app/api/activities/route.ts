import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (userId) {
      // Get activities for specific user
      const activities = await db.activity.findMany({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          carbonCredits: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ activities });
    } else {
      // Get all activities
      const activities = await db.activity.findMany({
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          carbonCredits: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ activities });
    }
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, type, location, carbonOffset, metadata } = await request.json();

    // Validate required fields
    if (!userId || !type || !carbonOffset) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

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

    // Create activity
    const activity = await db.activity.create({
      data: {
        userId,
        type,
        location: location ? JSON.stringify(location) : null,
        carbonOffset,
        metadata: metadata ? JSON.stringify(metadata) : null,
        verificationStatus: 'PENDING',
      },
    });

    // Update user's leaderboard stats
    const leaderboard = await db.leaderboard.findUnique({
      where: { userId },
    });

    if (leaderboard) {
      const updateData: any = {
        totalCarbonOffset: {
          increment: carbonOffset,
        },
        impactScore: {
          increment: Math.round(carbonOffset * 10), // Simple scoring system
        },
        lastUpdated: new Date(),
      };

      if (type === 'TREE_PLANTING') {
        updateData.treesPlanted = {
          increment: metadata?.treeCount || 1,
        };
      } else if (type === 'PLASTIC_RECYCLING') {
        updateData.plasticRecycled = {
          increment: metadata?.weight || 1,
        };
      }

      await db.leaderboard.update({
        where: { userId },
        data: updateData,
      });
    }

    return NextResponse.json({
      message: 'Activity created successfully',
      activity,
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
}