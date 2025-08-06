export async function GET(req, { params }) {
  await dbConnect();
  const course = await Course.findById(params.id);
  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }
  return NextResponse.json(course);
}
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  const { success, user } = verifyToken(req);
  if (!success || user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await dbConnect();
  const data = await req.json();
  const course = await Course.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(course);
}

export async function DELETE(req, { params }) {
  const { success, user } = verifyToken(req);
  if (!success || user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await dbConnect();
  await Course.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Course deleted.' });
}
