import { Router } from 'express';
import {
  oneAccountByEmail,
  allAcc,
  updateOneAcc,
  getUserByRule,
  getClient,
  postAdmin,
  deleteAdmin,
  recoverPass
} from './account.controllers';

const router = Router();

router.get('/all', allAcc);
router.get('/', oneAccountByEmail);
router.put('/', updateOneAcc);
router.get('/:rule', getUserByRule);
router.get('/recover', recoverPass);
router.post('/createAdmin', postAdmin);
router.post('/deleteAdmin/:id', deleteAdmin);
export default router;
