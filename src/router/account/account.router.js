import { Router } from 'express';
import {
  getUserByRule,
  postAdmin,
  deleteAdmin,
  recoverPass
} from '../../controller/account.controller';

const router = Router();

router.get('/:rule', getUserByRule);
router.get('/recover', recoverPass);
router.post('/createAdmin', postAdmin);
router.post('/deleteAdmin/:id', deleteAdmin);
export default router;
