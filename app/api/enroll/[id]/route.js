import dbConnect from '@/lib/dbConnect';
import Enrollment from '@/models/Enrollment';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  const { success, user } = verifyToken(req);
  if (!success || user.role !== 'student') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await dbConnect();
  await Enrollment.findOneAndDelete({ student: user.id, course: params.id });
  return NextResponse.json({ message: 'Unenrolled successfully' });
}
