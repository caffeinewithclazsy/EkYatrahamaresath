# EkYatrahamaresath - Holiday Booking Platform

A modern, full-stack holiday booking platform built with Next.js 15, featuring a premium design with gradient aesthetics, complete booking flow, and admin dashboard.

## Features

- 🏖️ **Browse Holiday Packages** - Explore 6+ handcrafted vacation packages across India
- 🔍 **Advanced Search & Filters** - Search by destination, category, price range, and ratings
- 📅 **Complete Booking Flow** - Select dates, travelers, and complete checkout with demo payment
- 👤 **User Authentication** - Login/Register system with demo accounts
- 📊 **User Dashboard** - View and manage your bookings
- 🛡️ **Admin Panel** - Comprehensive admin dashboard with booking analytics
- 🎨 **Premium Design** - Modern UI with purple-pink gradients, smooth animations, and hover effects
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 with custom design tokens
- **UI Components:** shadcn/ui
- **Typography:** Poppins (headings) + Roboto (body)
- **State Management:** React Hooks + localStorage
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Accounts

### User Account
- **Email:** john@example.com
- **Password:** any password (demo mode)

### Admin Account
- **Email:** admin@ekYatrahamaresath.com
- **Password:** any password (demo mode)

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Home page with hero and featured packages
│   ├── holidays/page.tsx     # All packages with category filters
│   ├── search/page.tsx       # Search results with advanced filters
│   ├── package/[id]/page.tsx # Package detail page
│   ├── checkout/page.tsx     # Booking checkout flow
│   ├── account/page.tsx      # User dashboard
│   ├── admin/page.tsx        # Admin dashboard
│   ├── auth/page.tsx         # Login/Register page
│   ├── layout.tsx            # Root layout with header/footer
│   └── globals.css           # Global styles and design tokens
├── components/
│   ├── header.tsx            # Sticky header with auth
│   ├── footer.tsx            # Footer with links
│   ├── search-results.tsx    # Search component with filters
│   ├── package-details.tsx   # Package detail view
│   ├── checkout-form.tsx     # Checkout form with payment
│   ├── user-dashboard.tsx    # User bookings dashboard
│   ├── admin-dashboard.tsx   # Admin analytics dashboard
│   ├── auth-form.tsx         # Login/Register forms
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── mock-data.ts          # Sample packages and bookings
│   ├── types.ts              # TypeScript interfaces
│   ├── auth.ts               # Authentication utilities
│   ├── bookings.ts           # Booking management
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
\`\`\`

## Key Features Explained

### 1. Home Page
- Full-width hero with gradient overlay
- Glowing search bar with smooth animations
- Featured packages with hover effects
- Popular destinations quick links
- Why choose us section

### 2. Search & Filters
- Real-time search by destination/package name
- Category filter (Beach, Adventure, Cultural, etc.)
- Price range slider
- Minimum rating filter
- Responsive filter sidebar

### 3. Package Details
- Comprehensive package information
- Tabbed interface (Highlights, Itinerary, Inclusions, Exclusions)
- Date selection
- Sticky booking sidebar
- Breadcrumb navigation

### 4. Checkout Flow
- Step-by-step booking process
- Traveler count selection
- Contact information form
- Demo payment (no real charges)
- Booking confirmation with details
- Order summary sidebar

### 5. User Dashboard
- View all bookings
- Booking status (Confirmed, Pending, Cancelled)
- Cancel bookings
- Account information
- Quick links to browse more packages

### 6. Admin Dashboard
- Total bookings analytics
- Revenue tracking
- Status breakdown (Confirmed, Cancelled)
- Search and filter bookings
- Detailed booking information
- Customer contact details

## Design System

### Color Palette
- **Primary Gradient:** Electric Purple (#7C3AED) → Vibrant Pink (#EC4899)
- **Accent Colors:** Tropical Teal (#06B6D4), Sunset Orange (#F97316)
- **Status Colors:** Emerald (success), Amber (warning), Rose (error)
- **Text:** Dark Navy (#0F172A) for headings, Neutral Gray (#374151) for body
- **Background:** Off-white (#F8FAFC) with subtle gradients

### Typography
- **Headings:** Poppins (Bold, 700)
- **Body:** Roboto (Regular, 400-700)

### Animations
- Hover lift effects on cards
- Gradient pulse on CTA buttons
- Smooth color transitions
- Scale transforms on hover
- Backdrop blur on sticky header

## Data Storage

This demo uses **localStorage** for data persistence:
- User authentication state
- Booking records
- User preferences

In production, replace with:
- Database (PostgreSQL, MongoDB, etc.)
- JWT authentication
- Secure payment gateway
- Real-time availability checking

## Customization

### Adding New Packages
Edit `lib/mock-data.ts` and add to the `mockPackages` array:

\`\`\`typescript
{
  id: "pkg-007",
  name: "Your Package Name",
  destination: "Destination",
  duration: "X Days / Y Nights",
  price: 15999,
  // ... other fields
}
\`\`\`

### Changing Colors
Edit `app/globals.css` and modify the CSS variables:

\`\`\`css
:root {
  --gradient-primary-start: oklch(...);
  --gradient-primary-end: oklch(...);
  --brand-teal: oklch(...);
  --brand-orange: oklch(...);
}
\`\`\`

### Adding New Categories
Update the category type in `lib/types.ts` and add filter options in search/holidays pages.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

- Demo payment system (no real transactions)
- localStorage-based data (resets on clear)
- No email notifications
- No real-time availability
- No payment gateway integration

## Future Enhancements

- [ ] Real database integration (Supabase/PostgreSQL)
- [ ] Email notifications for bookings
- [ ] Payment gateway (Stripe/Razorpay)
- [ ] Reviews and ratings system
- [ ] Wishlist functionality
- [ ] Multi-language support
- [ ] Currency converter
- [ ] Real-time chat support
- [ ] Social media integration
- [ ] Advanced analytics dashboard

## License

This is a demo project for educational purposes.

## Support

For issues or questions, please check the code comments or create an issue in the repository.

---
 
**Built with ❤️ using Next.js and Tailwind CSS**
