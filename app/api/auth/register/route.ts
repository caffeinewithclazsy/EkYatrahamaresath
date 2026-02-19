import { NextResponse } from 'next/server';
import { register } from '@/lib/auth.server';

export async function POST(request: Request) {
  try {
    const { name, email, phone, password } = await request.json();
    const user = await register(name, email, phone, password);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
