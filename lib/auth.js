import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(req) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return { success: false, message: 'No token provided' };
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return { success: true, user: decoded }; // decoded contains id and role
  } catch (error) {
    return { success: false, message: 'Invalid or expired token' };
  }
}
