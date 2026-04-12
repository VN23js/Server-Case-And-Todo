import { Router } from 'express';
import {
  getAllSession,
  getCase,
  getCaseMain,
  GetCaseUser,
  getInvenory,
  randomRulet,
  randomtItems,
} from '../controllers/caseConrolles.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { optinalAuth } from '../middleware/optinalAuth.js';

const router = new Router();

router.get('/getcase/:id', getCase);
router.get('/getallsession', getAllSession);
router.get('/inventory', authMiddleware, getInvenory);
router.get('/getallcase', getCaseMain);
router.get('/getitems/:id', optinalAuth, randomtItems);
router.post('/random/:id', authMiddleware, randomRulet);
router.get('/profile/:id',GetCaseUser);
export default router;
