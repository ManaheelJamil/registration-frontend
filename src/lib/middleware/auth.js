import jwt from 'jsonwebtoken';

export function authenticate(req) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    return decoded;
  } catch (err) {
    return null;
  }
}

export function authorizeRoles(user, ...roles) {
  if (!user || !roles.includes(user.role)) {
    return false;
  }
  return true;
}
