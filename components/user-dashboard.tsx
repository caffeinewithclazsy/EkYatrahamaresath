"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getCurrentUser } from "@/lib/auth"
import { getUserBookings, cancelBooking } from "@/lib/bookings"
import type { Booking, User } from "@/lib/types"
import { MapPin, Calendar, Users, CreditCard, AlertCircle, CheckCircle, XCircle } from "lucide-react"

export function UserDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth?redirect=/account")
      return
    }

    setUser(currentUser)
    const userBookings = getUserBookings(currentUser.id)
    setBookings(userBookings)
    setLoading(false)
  }, [router])

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      const success = cancelBooking(bookingId)
      if (success && user) {
        const updatedBookings = getUserBookings(user.id)
        setBookings(updatedBookings)
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getStatusIcon = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Info Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Account</h1>
        <p className="text-gray-600">Welcome back, {user.name}!</p>
      </div>

      {/* User Details Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Phone</p>
              <p className="font-semibold">{user.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Bookings</h2>
        <Button asChild variant="outline">
          <a href="/holidays">Browse More Packages</a>
        </Button>
      </div>

      {bookings.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You haven't made any bookings yet.{" "}
            <a href="/holidays" className="text-blue-600 hover:underline">
              Browse our holiday packages
            </a>{" "}
            to get started!
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Booking Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{booking.packageName}</h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.destination}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Start Date</p>
                          <p className="font-semibold">
                            {new Date(booking.startDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Travelers</p>
                          <p className="font-semibold">{booking.travelers}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Total Amount</p>
                          <p className="font-semibold text-blue-600">₹{booking.totalPrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Booking ID: </span>
                          <span className="font-mono font-semibold">{booking.id}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Booked on: </span>
                          <span className="font-semibold">
                            {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-40">
                    {booking.status === "confirmed" && (
                      <>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/package/${booking.packageId}`}>View Package</a>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                          Cancel Booking
                        </Button>
                      </>
                    )}
                    {booking.status === "cancelled" && (
                      <Button variant="outline" size="sm" asChild>
                        <a href="/holidays">Book Again</a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
