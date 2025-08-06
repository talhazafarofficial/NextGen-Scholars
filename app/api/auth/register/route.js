import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { hashPassword, generateToken } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
  }

  const hashed = await hashPassword(password);
  const user = await User.create({ name, email, password: hashed, role: 'student' });

  const token = generateToken({ id: user._id, role: user.role });
  return NextResponse.json({ token, role: user.role });
}
