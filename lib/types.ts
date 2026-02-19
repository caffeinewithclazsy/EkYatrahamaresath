export interface Package {
  id: string
  name: string
  destination: string
  duration: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  description: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itinerary: ItineraryDay[]
  category: "beach" | "adventure" | "cultural" | "wildlife" | "honeymoon" | "family"
  availableDates: string[]
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  meals: string[]
  accommodation?: string
}

export interface Booking {
  id: string
  packageId: string
  userId: string
  packageName: string
  destination: string
  travelers: number
  startDate: string
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled"
  bookingDate: string
  contactInfo: {
    name: string
    email: string
    phone: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  password?: string
  role: "user" | "admin"
}

export interface SearchFilters {
  destination?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  duration?: string
  rating?: number
}
