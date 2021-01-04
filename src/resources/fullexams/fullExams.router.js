import { Router } from 'express';
import { getListFullExams, getOneFullExams } from './fullExams.controller';

const router = Router();

router.get('/', getListFullExams);
router.get('/info', getOneFullExams);
// router.post('/', postOneFullExams); */

export default router;
