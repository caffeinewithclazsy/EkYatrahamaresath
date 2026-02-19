import 'server-only';
import type { User } from "./types";
import { initializeDatabase } from "./database";
import bcrypt from 'bcrypt';

export async function login(email: string, password: string): Promise<Omit<User, 'password'> | null> {
  const db = await initializeDatabase();
  const user = await db.get<User>('SELECT * FROM users WHERE email = ?', email);

  if (user && user.password && await bcrypt.compare(password, user.password)) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}

export async function register(name: string, email: string, phone: string, password: string): Promise<Omit<User, 'password'>> {
  const db = await initializeDatabase();
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await db.run(
    'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
    name,
    email,
    phone,
    hashedPassword,
    'user'
  );

  const createdUser = await db.get<User>('SELECT * FROM users WHERE id = ?', result.lastID);

  if (!createdUser) {
    throw new Error("Failed to create user");
  }

  const { password: _, ...userWithoutPassword } = createdUser;
  return userWithoutPassword;
}
