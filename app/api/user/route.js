import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { success, user, message } = verifyToken(req);
  if (!success) return NextResponse.json({ message }, { status: 401 });

  await dbConnect();
  const current = await User.findById(user.id).select('-password');
  return NextResponse.json(current);
}
