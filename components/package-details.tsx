"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Package } from "@/lib/types"
import { MapPin, Calendar, Star, Check, X, ChevronRight } from "lucide-react"

interface PackageDetailsProps {
  package: Package
}

export function PackageDetails({ package: pkg }: PackageDetailsProps) {
  const [selectedDate, setSelectedDate] = useState(pkg.availableDates[0])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
        <Link href="/" className="hover:text-brand-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/holidays" className="hover:text-brand-primary">
          Holidays
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-text-primary">{pkg.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover" />
            {pkg.originalPrice && (
              <Badge className="absolute top-4 right-4 bg-brand-accent hover:bg-brand-accent-hover text-lg py-2 px-4">
                Save ₹{pkg.originalPrice - pkg.price}
              </Badge>
            )}
          </div>

          {/* Package Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-text-secondary" />
              <span className="text-text-secondary">{pkg.destination}</span>
              <Badge variant="secondary" className="ml-2">
                {pkg.category}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{pkg.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-text-secondary" />
                <span className="text-text-secondary">{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-rating text-rating" />
                <span className="font-semibold">{pkg.rating}</span>
                <span className="text-text-secondary">({pkg.reviews} reviews)</span>
              </div>
            </div>
            <p className="text-text-primary leading-relaxed">{pkg.description}</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="highlights" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
            </TabsList>

            <TabsContent value="highlights" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Package Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="itinerary" className="mt-6">
              <div className="space-y-4">
                {pkg.itinerary.map((day) => (
                  <Card key={day.day}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline">Day {day.day}</Badge>
                        {day.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-text-primary">{day.description}</p>
                      {day.meals.length > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">Meals:</span>
                          <span className="text-text-secondary">{day.meals.join(", ")}</span>
                        </div>
                      )}
                      {day.accommodation && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">Stay:</span>
                          <span className="text-text-secondary">{day.accommodation}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inclusions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Whats Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.inclusions.map((inclusion, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exclusions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Whats Not Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.exclusions.map((exclusion, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <X className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
                        <span>{exclusion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Book This Package</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                {pkg.originalPrice && (
                  <p className="text-lg text-text-tertiary line-through">₹{pkg.originalPrice.toLocaleString()}</p>
                )}
                <p className="text-4xl font-bold text-brand-primary">₹{pkg.price.toLocaleString()}</p>
                <p className="text-sm text-text-tertiary">per person</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Select Start Date</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border rounded-md"
                >
                  {pkg.availableDates.map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href={`/checkout?packageId=${pkg.id}&date=${selectedDate}`}>Book Now</Link>
              </Button>

              <div className="pt-4 border-t space-y-2 text-sm text-text-secondary">
                <p className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Instant confirmation
                </p>
                <p className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  Free cancellation up to 7 days
                </p>
                <p className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
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
