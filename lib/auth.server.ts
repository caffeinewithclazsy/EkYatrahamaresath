import 'server-only';
import type { User } from "./types";
import { initializeDatabase, readDatabase, writeDatabase } from "./database";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function login(email: string, password: string): Promise<Omit<User, 'password'> | null> {
  await initializeDatabase(); // Ensure database is initialized
  const db = await readDatabase();
  
  const user = db.users.find(u => u.email === email);
  
  if (user && user.password && await bcrypt.compare(password, user.password)) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}

export async function register(name: string, email: string, phone: string, password: string): Promise<Omit<User, 'password'>> {
  await initializeDatabase(); // Ensure database is initialized
  const db = await readDatabase();
  
  // Check if user already exists
  const existingUser = db.users.find(u => u.email === email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    phone,
    password: hashedPassword,
    role: 'user'
  };
  
  db.users.push(newUser);
  await writeDatabase(db);

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}
