import { initializeDatabase, readDatabase, writeDatabase } from './database';
import { mockUsers, mockPackages, mockBookings } from './mock-data';
import bcrypt from 'bcrypt';

async function seedDatabase() {
  await initializeDatabase();
  const db = await readDatabase();

  // Seed users
  for (const user of mockUsers) {
    const existingUser = db.users.find(u => u.email === user.email);
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('password', 10); // Using a default password for all mock users
      db.users.push({
        ...user,
        password: hashedPassword
      });
    }
  }

  // Seed packages
  for (const pkg of mockPackages) {
    const existingPackage = db.packages.find(p => p.id === pkg.id);
    if (!existingPackage) {
      db.packages.push(pkg);
    }
  }

  // Seed bookings
  for (const booking of mockBookings) {
    const existingBooking = db.bookings.find(b => b.id === booking.id);
    if (!existingBooking) {
      db.bookings.push(booking);
    }
  }

  await writeDatabase(db);
  console.log('Database seeded successfully!');
}

seedDatabase().catch(error => {
  console.error('Failed to seed database:', error);
});
