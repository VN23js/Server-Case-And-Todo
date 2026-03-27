import { Router } from 'express';
const router = new Router();

import {
  register,
  login,
  getMe,
  logout,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
//http://localhost:3000/api/auth/register
const toggleLimiter = rateLimit({
  windowMs: 5000, // 5 секунд
  max: 5, // 1- запрос за 5 секунд
  handler: (req, res) => {
    return res
      .status(429)
      .json({ message: 'Слишком часто! Подождите немного.' }, req.ip);
  },
});
const getMeLimiter = rateLimit({
  windowMs: 10000, // 10 секунд
  max: 5, // 1 запрос за 5 секунд
  keyGenerator: (req) => {
    return ipKeyGenerator(req.headers['x-real-ip']); //req.ip
  },
  handler: (req, res) => {
    return res
      .status(429)
      .json({ message: 'Слишком часто! Подождите немного.' }, req.ip);
  },
});

//Register
router.post('/register', toggleLimiter, register);
//login
router.post('/login', toggleLimiter, login);
router.post('/logout', toggleLimiter, logout);
//Get me
router.get('/getme', getMeLimiter, authMiddleware, getMe);
export default router;
