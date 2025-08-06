import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import { verifyToken } from '@/lib/utils'; // Make sure path is correct
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      // No auth: return all courses (for public/main page)
      const courses = await Course.find({});
      return NextResponse.json(courses);
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    // Get all enrollments for this user
    const enrollments = await import('@/models/Enrollment').then(m => m.default.find({ student: decoded.id }));
    const enrolledCourseIds = enrollments.map(e => String(e.course));
    // Only return courses not already enrolled
    const courses = await Course.find({ _id: { $nin: enrolledCourseIds } });
    return NextResponse.json(courses);
  } catch (err) {
    console.error('Courses API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const data = await req.json();
    const course = await Course.create(data);
    return NextResponse.json(course);
  } catch (err) {
    console.error('Course POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
