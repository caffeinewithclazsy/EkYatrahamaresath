import { initializeDatabase } from './database';
import { mockUsers, mockPackages, mockBookings } from './mock-data';
import bcrypt from 'bcrypt';

async function seedDatabase() {
  const db = await initializeDatabase();

  // Seed users
  for (const user of mockUsers) {
    const hashedPassword = await bcrypt.hash('password', 10); // Using a default password for all mock users
    await db.run(
      'INSERT OR IGNORE INTO users (id, name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      user.id,
      user.name,
      user.email,
      user.phone,
      hashedPassword,
      user.role
    );
  }

  // Seed packages
  for (const pkg of mockPackages) {
    await db.run(
      'INSERT OR IGNORE INTO packages (id, name, destination, duration, price, originalPrice, rating, reviews, image, description, highlights, inclusions, exclusions, itinerary, category, availableDates) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      pkg.id,
      pkg.name,
      pkg.destination,
      pkg.duration,
      pkg.price,
      pkg.originalPrice,
      pkg.rating,
      pkg.reviews,
      pkg.image,
      pkg.description,
      JSON.stringify(pkg.highlights),
      JSON.stringify(pkg.inclusions),
      JSON.stringify(pkg.exclusions),
      JSON.stringify(pkg.itinerary),
      pkg.category,
      JSON.stringify(pkg.availableDates)
    );
  }

  // Seed bookings
  for (const booking of mockBookings) {
    await db.run(
      'INSERT OR IGNORE INTO bookings (id, packageId, userId, travelers, startDate, totalPrice, status, bookingDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      booking.id,
      booking.packageId,
      booking.userId,
      booking.travelers,
      booking.startDate,
      booking.totalPrice,
      booking.status,
      booking.bookingDate
    );
  }

  console.log('Database seeded successfully!');
  await db.close();
}

seedDatabase().catch(error => {
  console.error('Failed to seed database:', error);
});
