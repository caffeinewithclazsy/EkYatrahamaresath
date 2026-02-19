import type { Booking } from "./types"
import { mockBookings } from "./mock-data"

// Mock booking storage - in production, use a database
export function getBookings(): Booking[] {
  if (typeof window === "undefined") return mockBookings

  const bookingsStr = localStorage.getItem("bookings")
  if (!bookingsStr) {
    localStorage.setItem("bookings", JSON.stringify(mockBookings))
    return mockBookings
  }

  try {
    return JSON.parse(bookingsStr)
  } catch {
    return mockBookings
  }
}

export function getUserBookings(userId: string): Booking[] {
  return getBookings().filter((b) => b.userId === userId)
}

export function createBooking(booking: Omit<Booking, "id" | "bookingDate" | "status">): Booking {
  const bookings = getBookings()
  const newBooking: Booking = {
    ...booking,
    id: `book-${Date.now()}`,
    bookingDate: new Date().toISOString().split("T")[0],
    status: "confirmed",
  }
  bookings.push(newBooking)
  localStorage.setItem("bookings", JSON.stringify(bookings))
  return newBooking
}

export function cancelBooking(bookingId: string): boolean {
  const bookings = getBookings()
  const booking = bookings.find((b) => b.id === bookingId)
  if (booking) {
    booking.status = "cancelled"
    localStorage.setItem("bookings", JSON.stringify(bookings))
    return true
  }
  return false
}
