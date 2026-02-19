import { NextResponse } from 'next/server';
import { login } from '@/lib/auth.server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await login(email, password);

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
