import Link from "next/link"
import { Plane } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-text-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6 text-gradient-primary-start" />
              <span className="text-xl font-bold text-white">EkYatrahamaresath</span>
            </div>
            <p className="text-sm text-white/70">
              Your trusted travel partner for unforgettable holiday experiences across India.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/holidays" className="hover:text-gradient-primary-start transition-colors">
                  Browse Holidays
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-gradient-primary-start transition-colors">
                  Search Packages
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-gradient-primary-start transition-colors">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Popular Destinations</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Goa</li>
              <li>Kerala</li>
              <li>Rajasthan</li>
              <li>Himachal Pradesh</li>
              <li>Andaman</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Email: support@makemytrip.com</li>
              <li>Phone: 1800-123-4567</li>
              <li>24/7 Customer Support</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
          <p>&copy; 2025 ekYatrahamaresath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
