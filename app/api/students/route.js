import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/lib/utils';

export async function GET(req) {
  try {
    await dbConnect();

    const authHeader = req.headers.get('authorization');
    console.log('authHeader:', authHeader);

    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    console.log('decoded:', decoded);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const students = await User.find({ role: 'student' })
      .select('-password')
      .populate('enrolledCourses');

    // Format response: [{ _id, name, email, enrolledCourses: [{_id, title}], count }]
    const result = students.map(stu => ({
      _id: stu._id,
      name: stu.name,
      email: stu.email,
      enrolledCourses: stu.enrolledCourses.map(c => ({ _id: c._id, title: c.title })),
      count: stu.enrolledCourses.length
    }));
    return NextResponse.json(result);
  } catch (err) {
    console.error('Students API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
