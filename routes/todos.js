import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  completedTodo,
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from '../controllers/todoController.js';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

const toggleLimiter = rateLimit({
  windowMs: 5000, //  секунды
  max: 5, // 1- запрос за 2 секундыS
  keyGenerator: (req) => {
    return ipKeyGenerator(req.ip);
  },
  handler: (req, res) => {
 return   res
      .status(429)
      .json({ message: 'Слишком часто! Подождите немного.' }, req.ip);
  },
});
const getMeLimiter = rateLimit({
  windowMs: 10000, // 10 секунды
  max: 5, // 1 запрос за 5 секунды
  keyGenerator: (req) => {
    return ipKeyGenerator(req.ip);
  },
  handler: (req, res) => {

   return res
     .status(429)
     .json({ message: 'Слишком часто! Подождите немного.' }, req.ip);
  },
});
const router = new Router();
//http://localhost:3000/api/todo/postodo
router.post('/postodo', toggleLimiter, authMiddleware, createTodo);

router.get('/getodo', getMeLimiter, authMiddleware, getTodo);
router.put('/updatetodo', toggleLimiter, authMiddleware, updateTodo);
router.patch('/completed', toggleLimiter, authMiddleware, completedTodo);
router.delete('/deletetodo', toggleLimiter, authMiddleware, deleteTodo);
export default router;
