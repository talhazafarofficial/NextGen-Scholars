import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { comparePassword, generateToken } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 401 });
  }
  if (!(await comparePassword(password, user.password))) {
    return NextResponse.json({ message: 'Wrong password' }, { status: 401 });
  }

  const token = generateToken({ id: user._id, role: user.role });
  return NextResponse.json({ token, role: user.role });
}
