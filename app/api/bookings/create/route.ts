import { NextResponse } from 'next/server';
import { createBooking } from '@/lib/bookings';

export async function POST(request: Request) {
  try {
    const bookingData = await request.json();
    const booking = await createBooking(bookingData);
    return NextResponse.json(booking);
  } catch (error) {
    console.error('Failed to create booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}