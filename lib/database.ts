import fs from 'fs/promises';
import path from 'path';
import type { User, Package as PackageType, Booking as BookingType } from './types';

interface DatabaseSchema {
  users: User[];
  packages: PackageType[];
  bookings: BookingType[];
}

// Initialize the database file if it doesn't exist
async function initializeDatabase(): Promise<void> {
  const dbPath = path.join(process.cwd(), 'mydatabase.json');
  try {
    await fs.access(dbPath);
  } catch {
    // File doesn't exist, create it with empty tables
    const initialData: DatabaseSchema = {
      users: [],
      packages: [],
      bookings: []
    };
    await fs.writeFile(dbPath, JSON.stringify(initialData, null, 2));
  }
}

// Helper function to read the database
async function readDatabase(): Promise<DatabaseSchema> {
  const dbPath = path.join(process.cwd(), 'mydatabase.json');
  const data = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(data);
}

// Helper function to write to the database
async function writeDatabase(data: DatabaseSchema): Promise<void> {
  const dbPath = path.join(process.cwd(), 'mydatabase.json');
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

// Export helper functions
export { initializeDatabase, readDatabase, writeDatabase };
export type { User, PackageType as Package, BookingType as Booking };
