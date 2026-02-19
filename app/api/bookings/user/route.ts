import { NextResponse } from 'next/server';
import { getUserBookings } from '@/lib/bookings';

export async function GET(request: Request) {
  try {
    // Extract user ID from session/token in a real app
    // For now, we'll get user ID from query params
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const bookings = await getUserBookings(userId);
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Failed to get user bookings:', error);
    return NextResponse.json({ error: 'Failed to get bookings' }, { status: 500 });
  }
}