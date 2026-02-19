"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockPackages } from "@/lib/mock-data"
import { getCurrentUser } from "@/lib/auth"
import { createBooking } from "@/lib/bookings"
import type { Package } from "@/lib/types"
import { MapPin, Calendar, Users, CreditCard, Check, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CheckoutForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const packageId = searchParams.get("packageId")
  const selectedDate = searchParams.get("date")

  const [pkg, setPkg] = useState<Package | null>(null)
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null)
  const [travelers, setTravelers] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingId, setBookingId] = useState("")
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    if (!currentUser) {
      router.push(`/auth?redirect=/checkout?packageId=${packageId}&date=${selectedDate}`)
      return
    }

    if (packageId) {
      const foundPkg = mockPackages.find((p) => p.id === packageId)
      if (foundPkg) {
        setPkg(foundPkg)
        setFormData({
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          cardNumber: "",
          cardExpiry: "",
          cardCvv: "",
        })
      } else {
        router.push("/holidays")
      }
    }
  }, [packageId, selectedDate, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pkg || !user) return

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create booking via API
    const response = await fetch('/api/bookings/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: pkg.id,
        userId: user.id,
        packageName: pkg.name,
        destination: pkg.destination,
        travelers,
        startDate: selectedDate || pkg.availableDates[0],
        totalPrice: pkg.price * travelers,
        contactInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      })
    });

    if (response.ok) {
      const booking = await response.json();
      setBookingId(booking.id)
      setBookingComplete(true)
    } else {
      console.error('Failed to create booking');
      // Handle error appropriately
    }
    setIsProcessing(false)
  }

  if (!pkg) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (bookingComplete) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-text-primary">Booking Confirmed!</h1>
            <p className="text-text-secondary mb-2">Your booking has been successfully confirmed.</p>
            <p className="text-sm text-text-tertiary mb-8">Booking ID: {bookingId}</p>

            <div className="bg-gradient-primary-start/10 p-6 rounded-lg mb-8 text-left">
              <h3 className="font-bold mb-4 text-text-primary">Booking Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Package:</span>
                  <span className="font-semibold text-text-primary">{pkg.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Destination:</span>
                  <span className="font-semibold text-text-primary">{pkg.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Start Date:</span>
                  <span className="font-semibold text-text-primary">
                    {new Date(selectedDate || pkg.availableDates[0]).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Travelers:</span>
                  <span className="font-semibold text-text-primary">{travelers}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-text-secondary">Total Amount:</span>
                  <span className="font-bold text-lg text-gradient-primary-start">
                    ₹{(pkg.price * travelers).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary text-white">
                <Link href="/account">View My Bookings</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/holidays">Browse More Packages</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalPrice = pkg.price * travelers

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-text-primary">Complete Your Booking</h1>
      <p className="text-text-secondary mb-8">Just a few steps to confirm your dream vacation</p>

      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[
            { num: 1, label: "Traveler Details" },
            { num: 2, label: "Contact Info" },
            { num: 3, label: "Payment" },
          ].map((step, index) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep >= step.num ? "gradient-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.num ? <Check className="h-5 w-5" /> : step.num}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    currentStep >= step.num ? "text-gradient-primary-start" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < 2 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all ${
                    currentStep > step.num ? "bg-gradient-primary-start" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Traveler Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gradient-primary-start" />
                  Traveler Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="travelers">Number of Travelers</Label>
                  <Input
                    id="travelers"
                    type="number"
                    min="1"
                    max="10"
                    value={travelers}
                    onChange={(e) => {
                      setTravelers(Number.parseInt(e.target.value) || 1)
                      setCurrentStep(1)
                    }}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (e.target.value && currentStep < 2) setCurrentStep(2)
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (e.target.value && currentStep < 2) setCurrentStep(2)
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                      if (e.target.value && currentStep < 2) setCurrentStep(2)
                    }}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gradient-primary-start" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-warning/10 border border-warning/30 p-4 rounded-md flex items-start gap-3 mb-4">
                  <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-text-primary">
                    <p className="font-semibold mb-1">Demo Payment</p>
                    <p className="text-text-secondary">
                      This is a demo checkout. Use any card details - no actual payment will be processed.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, cardNumber: e.target.value })
                      if (e.target.value && currentStep < 3) setCurrentStep(3)
                    }}
                    maxLength={19}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input
                      id="cardExpiry"
                      type="text"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input
                      id="cardCvv"
                      type="text"
                      placeholder="123"
                      value={formData.cardCvv}
                      onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing Payment..." : `Pay ₹${totalPrice.toLocaleString()}`}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative h-40 rounded-lg overflow-hidden">
                <Image
                  src={pkg.image || "/placeholder.svg?height=400&width=600&query=travel%20destination"}
                  alt={pkg.name}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-text-primary">{pkg.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <MapPin className="h-4 w-4" />
                    {pkg.destination}
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Calendar className="h-4 w-4" />
                    {selectedDate
                      ? new Date(selectedDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Date not selected"}
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Users className="h-4 w-4" />
                    {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Price per person</span>
                  <span className="font-semibold text-text-primary">₹{pkg.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Number of travelers</span>
                  <span className="font-semibold text-text-primary">{travelers}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-bold text-text-primary">Total Amount</span>
                  <span className="font-bold text-xl text-gradient-primary-start">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-success/10 p-4 rounded-lg space-y-2 text-sm">
                <p className="flex items-center gap-2 text-success">
                  <Check className="h-4 w-4" />
                  Free cancellation up to 7 days
                </p>
                <p className="flex items-center gap-2 text-success">
                  <Check className="h-4 w-4" />
                  Instant confirmation
                </p>
                <p className="flex items-center gap-2 text-success">
                  <Check className="h-4 w-4" />
                  24/7 customer support
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
