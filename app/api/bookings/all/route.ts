import { NextResponse } from 'next/server';
import { getBookings } from '@/lib/bookings';

export async function GET(request: Request) {
  try {
    const bookings = await getBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Failed to get bookings:', error);
    return NextResponse.json({ error: 'Failed to get bookings' }, { status: 500 });
  }
}