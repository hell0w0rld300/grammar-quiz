import { cookies } from 'next/headers';
import { createAdminToken, verifyAdminPassword } from '@/lib/auth';

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!verifyAdminPassword(password)) {
      return Response.json({ error: '密码错误' }, { status: 401 });
    }

    const token = await createAdminToken();
    cookies().set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24h
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Login error:', err);
    return Response.json({ error: '服务器错误' }, { status: 500 });
  }
}
