"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockPackages } from "@/lib/mock-data"
import { Search, MapPin, Calendar, Star, TrendingUp, Sparkles } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const featuredPackages = mockPackages.slice(0, 3)
  const popularDestinations = ["Goa", "Kerala", "Rajasthan", "Himachal", "Andaman", "Ladakh"]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?destination=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push("/search")
    }
  }

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/goa-beach-sunset-palm-trees.jpg"
            alt="Travel destination"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 gradient-overlay" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-wider">Premium Travel Experiences</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">Discover Your Next Adventure</h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 text-pretty max-w-2xl mx-auto">
            Explore handcrafted holiday packages across India. From beaches to mountains, we have it all.
          </p>

          {/* Glowing Search Bar */}
          <div className="max-w-3xl mx-auto">
            <Card className="search-glow bg-white/95 backdrop-blur border-0">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Where do you want to go?"
                      className="h-12 text-lg border-0 focus-visible:ring-2 focus-visible:ring-gradient-primary-start"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="gradient-primary text-white hover:opacity-90 transition-opacity btn-pulse h-12 px-8"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Search Holidays
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-surface">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-6 w-6 text-gradient-primary-start" />
            <h2 className="text-3xl font-bold text-brand-teal">Popular Destinations</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularDestinations.map((destination) => (
              <Link key={destination} href={`/search?destination=${destination}`} className="group">
                <Card className="hover-lift border-2 border-transparent hover:border-brand-teal/30 transition-all">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-brand-teal group-hover:scale-110 transition-transform" />
                    <p className="font-semibold text-text-primary">{destination}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-light">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Featured Holiday Packages</h2>
            <Button
              asChild
              variant="outline"
              className="border-gradient-primary-start text-gradient-primary-start bg-transparent"
            >
              <Link href="/holidays">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg, index) => (
              <Link key={pkg.id} href={`/package/${pkg.id}`}>
                <Card
                  className={`group overflow-hidden transition-all hover-lift ${
                    index % 2 === 0 ? "hover-glow-teal" : "hover-glow-orange"
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={pkg.image || "/placeholder.svg?height=400&width=600&query=travel%20destination"}
                      alt={pkg.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {pkg.originalPrice && (
                      <Badge className="absolute top-4 right-4 bg-error text-white hover:bg-error/90">
                        Save ₹{pkg.originalPrice - pkg.price}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm text-text-secondary">{pkg.destination}</span>
                      <Badge
                        variant="secondary"
                        className="ml-auto"
                        style={{
                          backgroundColor: index % 2 === 0 ? "var(--brand-teal)" : "var(--brand-orange)",
                          color: "white",
                        }}
                      >
                        {pkg.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-text-primary group-hover:text-gradient-primary-start transition-colors">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm text-text-secondary">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="h-4 w-4 fill-rating text-rating" />
                      <span className="font-semibold text-text-primary">{pkg.rating}</span>
                      <span className="text-sm text-text-secondary">({pkg.reviews} reviews)</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        {pkg.originalPrice && (
                          <p className="text-sm text-text-tertiary line-through">
                            ₹{pkg.originalPrice.toLocaleString()}
                          </p>
                        )}
                        <p className="text-2xl font-bold text-gradient-primary-start">₹{pkg.price.toLocaleString()}</p>
                        <p className="text-xs text-text-tertiary">per person</p>
                      </div>
                      <Button size="sm" className="gradient-primary text-white hover:opacity-90 transition-opacity">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">Why Choose ekYatrahamaresath?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-text-primary">Best Prices</h3>
                <p className="text-text-secondary">
                  Competitive pricing with exclusive deals and discounts on all packages.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--brand-teal)" }}
                >
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-text-primary">Handpicked Destinations</h3>
                <p className="text-text-secondary">
                  Carefully curated packages to the most beautiful locations in India.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--brand-orange)" }}
                >
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-text-primary">24/7 Support</h3>
                <p className="text-text-secondary">
                  Round-the-clock customer support for a hassle-free travel experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
