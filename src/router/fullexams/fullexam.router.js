import { Router } from 'express';
import {
  postFullExam,
  getAll,
  getOne,
  deleteFullExam
} from '../../controller/fullexam.controller';
import { postSingleSkill } from '../../controller/singleSkill.controller';
// import { upload } from '../share/uploadFile';

const router = Router();

router.post('/', postFullExam);
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/:id/exam', postSingleSkill);
router.post('/delete/:id', deleteFullExam);
export default router;