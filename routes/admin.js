import { createAdminWeapon } from '../controllers/adminConrollerCase.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { Router } from 'express';
const router = new Router();
router.post('/createweapon', createAdminWeapon);
export default router;
