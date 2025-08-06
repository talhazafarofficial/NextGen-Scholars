import dbConnect from '@/lib/dbConnect';
import Enrollment from '@/models/Enrollment';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Get all approved enrollments (admin only)
export async function GET(req) {
  const { success, user } = verifyToken(req);
  if (!success || user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }
  await dbConnect();
  const enrollments = await Enrollment.find({ status: 'approved' }).populate('student').populate('course');
  return NextResponse.json(enrollments);
}
