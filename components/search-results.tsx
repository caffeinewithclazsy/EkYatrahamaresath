"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { mockPackages } from "@/lib/mock-data"
import type { SearchFilters } from "@/lib/types"
import { MapPin, Calendar, Star, Search, SlidersHorizontal } from "lucide-react"

export function SearchResults() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<SearchFilters>({
    destination: searchParams.get("destination") || "",
    category: searchParams.get("category") || "all",
    minPrice: 0,
    maxPrice: 50000,
    rating: 0,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredPackages = mockPackages.filter((pkg) => {
    // Search query filter
    if (
      searchQuery &&
      !pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pkg.destination.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Destination filter
    if (filters.destination && !pkg.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
      return false
    }

    // Category filter
    if (filters.category !== "all" && pkg.category !== filters.category) {
      return false
    }

    // Price filter
    if (pkg.price < (filters.minPrice || 0) || pkg.price > (filters.maxPrice || 50000)) {
      return false
    }

    // Rating filter
    if (filters.rating && pkg.rating < filters.rating) {
      return false
    }

    return true
  })

  useEffect(() => {
    const destination = searchParams.get("destination")
    const category = searchParams.get("category")
    if (destination || category) {
      setFilters((prev) => ({
        ...prev,
        destination: destination || "",
        category: category || "all",
      }))
    }
  }, [searchParams])

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }))
  }

  const resetFilters = () => {
    setFilters({
      destination: "",
      category: "all",
      minPrice: 0,
      maxPrice: 50000,
      rating: 0,
    })
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Search Holiday Packages</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by destination or package name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button variant="outline" size="lg" onClick={() => setShowFilters(!showFilters)} className="md:w-auto">
            <SlidersHorizontal className="mr-2 h-5 w-5" />
            {showFilters ? "Hide" : "Show"} Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`lg:w-80 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Filters</h3>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              </div>

              {/* Destination Filter */}
              <div className="space-y-2">
                <Label>Destination</Label>
                <Input
                  type="text"
                  placeholder="Enter destination"
                  value={filters.destination}
                  onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                />
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="beach">Beach</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="wildlife">Wildlife</SelectItem>
                    <SelectItem value="honeymoon">Honeymoon</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-4">
                <Label>Price Range</Label>
                <Slider
                  min={0}
                  max={50000}
                  step={1000}
                  value={[filters.minPrice || 0, filters.maxPrice || 50000]}
                  onValueChange={handlePriceChange}
                  className="py-4"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">₹{(filters.minPrice || 0).toLocaleString()}</span>
                  <span className="font-medium">₹{(filters.maxPrice || 50000).toLocaleString()}</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <Label>Minimum Rating</Label>
                <Select
                  value={filters.rating?.toString() || "0"}
                  onValueChange={(value) => setFilters({ ...filters, rating: Number.parseFloat(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any Rating</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.8">4.8+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="mb-6">
            <p className="text-gray-600">
              Found <span className="font-bold text-gray-900">{filteredPackages.length}</span> packages
            </p>
          </div>

          {filteredPackages.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No packages found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPackages.map((pkg) => (
                <Link key={pkg.id} href={`/package/${pkg.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {pkg.originalPrice && (
                        <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600">
                          Save ₹{pkg.originalPrice - pkg.price}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{pkg.destination}</span>
                        <Badge variant="secondary" className="ml-auto">
                          {pkg.category}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {pkg.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{pkg.rating}</span>
                        <span className="text-sm text-gray-600">({pkg.reviews} reviews)</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          {pkg.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString()}</p>
                          )}
                          <p className="text-2xl font-bold text-blue-600">₹{pkg.price.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">per person</p>
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
