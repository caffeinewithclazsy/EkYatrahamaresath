import type { User } from "./types";

// Simple mock authentication - in production, use proper JWT/session management
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("currentUser");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("currentUser");
}

export function isAdmin(user: User | null): boolean {
  return user?.role === "admin";
}
