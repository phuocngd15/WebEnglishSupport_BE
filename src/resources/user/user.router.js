import { Router } from 'express';
import {
  oneUserByEmail,
  allUser,
  updateOneUser,
  getUserByRule,
  getClient,
  postAdmin,
  deleteAdmin
} from './user.controllers';

const router = Router();

router.get('/all', allUser);
router.get('/', oneUserByEmail);
router.put('/', updateOneUser);
router.get('/:rule', getUserByRule);
router.get('/clients', getClient);
router.post('/createAdmin', postAdmin);
router.delete('/deleteAdmin/:id', deleteAdmin);
export default router;
