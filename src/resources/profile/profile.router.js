import { Router } from 'express';
import { postProfile, getOneProfile, postPhone, postGender, postName } from './profile.controller';
import auth from '../share/authen';
const router = Router();

router.post('/gender', postGender);
router.post('/phone', postPhone);
router.post('/name', postName);
//router.post('/pass', postPass);
router.get('/', getOneProfile);
// router.post('/:user_id',checkObjectId('user_id'), postProfile);
// router.get('/:user_id', getOneProfile);
// router.post('/:user_id', postProfile);
export default router;
