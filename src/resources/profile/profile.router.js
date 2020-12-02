import { Router } from 'express';
import { postProfile, getOneProfile } from './profile.controller';
import auth from '../share/authen';
const router = Router();

router.post('/', auth, postProfile);
router.get('/', auth, getOneProfile);
// router.post('/:user_id',checkObjectId('user_id'), postProfile);
// router.get('/:user_id', getOneProfile);
// router.post('/:user_id', postProfile);
export default router;
