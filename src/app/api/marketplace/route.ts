import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'buy' or 'sell'
    const status = searchParams.get('status');

    const whereClause: any = {};
    if (type) whereClause.type = type.toUpperCase();
    if (status) whereClause.status = status.toUpperCase();

    const orders = await db.marketplaceOrder.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        carbonCredit: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
            activity: {
              select: {
                type: true,
                carbonOffset: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching marketplace orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch marketplace orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, carbonCreditId, type, amount, pricePerTon, paymentMethod } = await request.json();

    // Validate required fields
    if (!userId || !carbonCreditId || !type || !amount || !pricePerTon) {
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

    // Check if carbon credit exists and belongs to user (for sell orders)
    const carbonCredit = await db.carbonCredit.findUnique({
      where: { id: carbonCreditId },
      include: { user: true },
    });

    if (!carbonCredit) {
      return NextResponse.json(
        { error: 'Carbon credit not found' },
        { status: 404 }
      );
    }

    if (type.toUpperCase() === 'SELL' && carbonCredit.userId !== userId) {
      return NextResponse.json(
        { error: 'Carbon credit does not belong to user' },
        { status: 403 }
      );
    }

    if (carbonCredit.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Carbon credit is not active' },
        { status: 400 }
      );
    }

    // Create marketplace order
    const order = await db.marketplaceOrder.create({
      data: {
        userId,
        carbonCreditId,
        type: type.toUpperCase(),
        amount,
        pricePerTon,
        status: 'OPEN',
        paymentMethod,
      },
    });

    // If it's a sell order, update carbon credit status
    if (type.toUpperCase() === 'SELL') {
      await db.carbonCredit.update({
        where: { id: carbonCreditId },
        data: {
          status: 'FOR_SALE',
          price: pricePerTon,
        },
      });
    }

    return NextResponse.json({
      message: 'Marketplace order created successfully',
      order,
    });
  } catch (error) {
    console.error('Error creating marketplace order:', error);
    return NextResponse.json(
      { error: 'Failed to create marketplace order' },
      { status: 500 }
    );
  }
}