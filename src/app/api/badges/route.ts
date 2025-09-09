import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const category = searchParams.get('category');

    if (userId) {
      // Get user's badges
      const userBadges = await db.userBadge.findMany({
        where: { userId },
        include: {
          badge: true,
        },
        orderBy: { earnedAt: 'desc' },
      });

      return NextResponse.json({ userBadges });
    } else {
      // Get all available badges
      const whereClause: any = {};
      if (category) whereClause.category = category.toUpperCase();

      const badges = await db.badge.findMany({
        where: whereClause,
        orderBy: { createdAt: 'asc' },
      });

      return NextResponse.json({ badges });
    }
  } catch (error) {
    console.error('Error fetching badges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch badges' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, badgeId } = await request.json();

    // Validate required fields
    if (!userId || !badgeId) {
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

    // Check if badge exists
    const badge = await db.badge.findUnique({
      where: { id: badgeId },
    });

    if (!badge) {
      return NextResponse.json(
        { error: 'Badge not found' },
        { status: 404 }
      );
    }

    // Check if user already has this badge
    const existingUserBadge = await db.userBadge.findUnique({
      where: {
        userId_badgeId: {
          userId,
          badgeId,
        },
      },
    });

    if (existingUserBadge) {
      return NextResponse.json(
        { error: 'User already has this badge' },
        { status: 400 }
      );
    }

    // Award badge to user
    const userBadge = await db.userBadge.create({
      data: {
        userId,
        badgeId,
        earnedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Badge awarded successfully',
      userBadge: {
        ...userBadge,
        badge,
      },
    });
  } catch (error) {
    console.error('Error awarding badge:', error);
    return NextResponse.json(
      { error: 'Failed to award badge' },
      { status: 500 }
    );
  }
}