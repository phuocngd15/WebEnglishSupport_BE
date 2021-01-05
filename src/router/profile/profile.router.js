import { Router } from 'express';
import {
  getOneProfile,
  postPhone,
  postGender,
  postName,
  postPass
} from '../../controller/profile.controller';
import middleWere from './profileMiddle';
import middleWere2 from './profileMiddle2';
const router = Router();

router.post('/gender', middleWere, postGender);
router.post('/phone', middleWere, postPhone);
router.post('/name', middleWere, postName);
router.post('/pass', postPass);
router.get('/', middleWere2, getOneProfile);

export default router;
