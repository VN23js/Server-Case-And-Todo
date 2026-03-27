import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Нет доступа 3' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Нет доступа.',
    });
  }
};
