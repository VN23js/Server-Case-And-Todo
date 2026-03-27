import jwt from 'jsonwebtoken';
export const optinalAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next();
    }
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.id;
  } catch (error) {
    req.userId = null;
  }
  next();
};
