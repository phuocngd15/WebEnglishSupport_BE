import { Router } from 'express';
import {
  getOneProfile,
  postPhone,
  postGender,
  postName,
  getName
} from './profile.controller';
import middleWere from './profileMiddle';
import middleWere2 from './profileMiddle2';
import { postPass } from '../account/account.controllers';
const router = Router();

router.post('/gender', middleWere, postGender);
router.post('/phone', middleWere, postPhone);
router.post('/name', middleWere, postName);
router.post('/pass', postPass);
router.get('/', middleWere2, getOneProfile);
// router.post('/:user_id',checkObjectId('user_id'), postProfile);
// router.get('/:user_id', getOneProfile);
// router.post('/:user_id', postProfile);
export default router;
