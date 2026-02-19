import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockPackages } from "@/lib/mock-data"
import { MapPin, Calendar, Star } from "lucide-react"
import Image from "next/image"

export default function HolidaysPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Holiday Packages</h1>
        <p className="text-text-secondary">Explore our complete collection of handcrafted holiday experiences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Filter By Category</h3>
              <div className="space-y-2">
                {["All", "Beach", "Adventure", "Cultural", "Wildlife", "Honeymoon", "Family"].map((category) => (
                  <Link
                    key={category}
                    href={category === "All" ? "/holidays" : `/holidays?category=${category.toLowerCase()}`}
                    className="block py-2 px-3 rounded-md hover:bg-surface-light transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Package Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockPackages.map((pkg) => (
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
                      <Badge className="absolute top-4 right-4 bg-brand-accent hover:bg-brand-accent-hover">
                        Save ₹{pkg.originalPrice - pkg.price}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm text-text-secondary">{pkg.destination}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {pkg.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm text-text-secondary">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="h-4 w-4 fill-rating text-rating" />
                      <span className="font-semibold">{pkg.rating}</span>
                      <span className="text-sm text-text-secondary">({pkg.reviews} reviews)</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        {pkg.originalPrice && (
                          <p className="text-sm text-text-tertiary line-through">
                            ₹{pkg.originalPrice.toLocaleString()}
                          </p>
                        )}
                        <p className="text-2xl font-bold text-brand-primary">₹{pkg.price.toLocaleString()}</p>
                        <p className="text-xs text-text-tertiary">per person</p>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
