import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AUTH_PASSWORD = process.env.DASHBOARD_PASSWORD || 'ManagerOS2026!';
const AUTH_COOKIE = 'manageros_session';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === AUTH_PASSWORD) {
      const cookieStore = cookies();
      cookieStore.set(AUTH_COOKIE, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_COOKIE);
  return NextResponse.json({ success: true });
}
