import { Router } from 'express';
import {
  oneAccountByEmail,
  allAcc,
  updateOneAcc,
  getUserByRule,
  getClient,
  postAdmin,
  deleteAdmin
} from './account.controllers';

const router = Router();

router.get('/all', allAcc);
router.get('/', oneAccountByEmail);
router.put('/', updateOneAcc);
router.get('/:rule', getUserByRule);
router.get('/clients', getClient);
router.post('/createAdmin', postAdmin);
router.delete('/deleteAdmin/:id', deleteAdmin);
export default router;
