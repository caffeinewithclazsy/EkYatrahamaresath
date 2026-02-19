import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | null = null;

async function initializeDatabase() {
  if (!db) {
    db = await open({
      filename: './mydatabase.sqlite',
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
      );

      CREATE TABLE IF NOT EXISTS packages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        destination TEXT NOT NULL,
        duration TEXT NOT NULL,
        price REAL NOT NULL,
        originalPrice REAL,
        rating REAL,
        reviews INTEGER,
        image TEXT,
        description TEXT,
        highlights TEXT,
        inclusions TEXT,
        exclusions TEXT,
        itinerary TEXT,
        category TEXT,
        availableDates TEXT
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        packageId TEXT NOT NULL,
        userId TEXT NOT NULL,
        travelers INTEGER NOT NULL,
        startDate TEXT NOT NULL,
        totalPrice REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        bookingDate TEXT NOT NULL,
        FOREIGN KEY (packageId) REFERENCES packages (id),
        FOREIGN KEY (userId) REFERENCES users (id)
      );
    `);
  }
  return db;
}

export { initializeDatabase };
