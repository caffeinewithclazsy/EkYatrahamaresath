import { NextResponse } from 'next/server';
import { cancelBooking } from '@/lib/bookings';

// Handle DELETE request to cancel a booking
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    const success = await cancelBooking(id);
    
    if (success) {
      return NextResponse.json({ message: 'Booking cancelled successfully' });
    } else {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to cancel booking:', error);
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
  }
}