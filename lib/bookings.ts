import type { Booking } from "./types"
import { mockBookings } from "./mock-data"
import { readDatabase, writeDatabase, initializeDatabase } from "./database"
import { v4 as uuidv4 } from 'uuid'

// Server-side booking functions using the new database implementation
export async function getBookings(): Promise<Booking[]> {
  await initializeDatabase();
  const db = await readDatabase();
  return db.bookings;
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  const bookings = await getBookings();
  return bookings.filter((b) => b.userId === userId);
}

export async function createBooking(booking: Omit<Booking, "id" | "bookingDate" | "status">): Promise<Booking> {
  await initializeDatabase();
  const db = await readDatabase();
  
  const newBooking: Booking = {
    ...booking,
    id: uuidv4(),
    bookingDate: new Date().toISOString().split("T")[0],
    status: "confirmed",
  }
  
  db.bookings.push(newBooking);
  await writeDatabase(db);
  
  return newBooking;
}

export async function cancelBooking(bookingId: string): Promise<boolean> {
  await initializeDatabase();
  const db = await readDatabase();
  
  const bookingIndex = db.bookings.findIndex((b) => b.id === bookingId);
  if (bookingIndex !== -1) {
    db.bookings[bookingIndex].status = "cancelled";
    await writeDatabase(db);
    return true;
  }
  return false;
}
