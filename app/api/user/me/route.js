import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  const { success, user } = verifyToken(req);

  if (!success) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const dbUser = await User.findById(user.id).select('-password'); // exclude password

  if (!dbUser) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role,
  });
}
