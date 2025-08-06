import dbConnect from '@/lib/dbConnect';
import Enrollment from '@/models/Enrollment';
import Course from '@/models/Course';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { success, user } = verifyToken(req);
  if (!success || user.role !== 'student') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await dbConnect();
  const { courseId } = await req.json();

  const courseExists = await Course.findById(courseId);
  if (!courseExists) {
    return NextResponse.json({ message: 'Course not found.' }, { status: 404 });
  }

  const alreadyEnrolled = await Enrollment.findOne({ student: user.id, course: courseId });
  if (alreadyEnrolled) {
    return NextResponse.json({ message: 'Already enrolled.' }, { status: 400 });
  }

  const enrollment = await Enrollment.create({ student: user.id, course: courseId, status: 'pending' });
  return NextResponse.json(enrollment);
}

export async function GET(req) {
  const { success, user } = verifyToken(req);
  if (!success || user.role !== 'student') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await dbConnect();
  const enrollments = await Enrollment.find({ student: user.id }).populate('course');
  return NextResponse.json(enrollments);
}
