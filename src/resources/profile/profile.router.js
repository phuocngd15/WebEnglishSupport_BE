import { Router } from 'express';
import { postProfile, getOneProfile } from './profile.controller';
import checkObjectId from '../share/checkObjectId';
// bắt buộc phải trả về token mới sử dụng được user_id
const router = Router();

// router.post('/', postProfile);
// router.get('/:user_id',checkObjectId('user_id'), getOneProfile);
// router.post('/:user_id',checkObjectId('user_id'), postProfile);
router.get('/:user_id', getOneProfile);
router.post('/:user_id', postProfile);
export default router;
