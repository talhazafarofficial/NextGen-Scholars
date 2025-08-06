import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

async function isAdmin(req) {
  const auth = verifyToken(req);
  return auth.success && auth.user.role === 'admin' ? auth.user : null;
}

export async function PUT(req, { params }) {
  const admin = await isAdmin(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized.' }, { status: 403 });

  await dbConnect();
  const data = await req.json();
  const user = await User.findByIdAndUpdate(params.id, data, { new: true }).select('-password');
  return NextResponse.json(user);
}

export async function DELETE(req, { params }) {
  const admin = await isAdmin(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized.' }, { status: 403 });

  await dbConnect();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'User deleted.' });
}
