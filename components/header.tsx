"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plane, User, Menu, X } from "lucide-react"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, setUser } = useUser()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md"
          : "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="gradient-primary p-2 rounded-lg">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary group-hover:text-gradient-primary-start transition-colors">
              ekYatrahamaresath
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/holidays"
              className="text-sm font-medium text-text-secondary hover:text-gradient-primary-start transition-colors"
            >
              Holidays
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium text-text-secondary hover:text-gradient-primary-start transition-colors"
            >
              Search
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-sm font-medium text-text-secondary hover:text-gradient-primary-start transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 hover:text-gradient-primary-start">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Bookings</Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="gradient-primary text-white hover:opacity-90 transition-opacity">
                <Link href="/auth">Login / Register</Link>
              </Button>
            )}

            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 border-t">
            <Link
              href="/holidays"
              className="block py-2 text-sm font-medium hover:text-brand-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Holidays
            </Link>
            <Link
              href="/search"
              className="block py-2 text-sm font-medium hover:text-brand-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="block py-2 text-sm font-medium hover:text-brand-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
