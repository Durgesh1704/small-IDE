import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    const whereClause: any = {};
    if (userId) whereClause.userId = userId;
    if (status) whereClause.status = status;

    const carbonCredits = await db.carbonCredit.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        activity: {
          select: {
            id: true,
            type: true,
            carbonOffset: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ carbonCredits });
  } catch (error) {
    console.error('Error fetching carbon credits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch carbon credits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, activityId, amount, tokenId } = await request.json();

    // Validate required fields
    if (!userId || !amount) {
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

    // If activityId is provided, check if it exists and doesn't have credits yet
    if (activityId) {
      const existingCredits = await db.carbonCredit.findFirst({
        where: { activityId },
      });

      if (existingCredits) {
        return NextResponse.json(
          { error: 'Activity already has carbon credits associated' },
          { status: 400 }
        );
      }
    }

    // Create carbon credit
    const carbonCredit = await db.carbonCredit.create({
      data: {
        userId,
        activityId,
        amount,
        tokenId,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({
      message: 'Carbon credit created successfully',
      carbonCredit,
    });
  } catch (error) {
    console.error('Error creating carbon credit:', error);
    return NextResponse.json(
      { error: 'Failed to create carbon credit' },
      { status: 500 }
    );
  }
}