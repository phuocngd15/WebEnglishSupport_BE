import { Router } from 'express';
import {
  postExam,
  getAllExams,
  getOneExam,
  updateExam,
  deleteExam,
  getFile
} from '../../controller/singleSkill.controller';

const router = Router();

router.post('/', postExam);
router.get('/', getAllExams);
router.get('/:id', getOneExam);
router.post('/:id', updateExam);
router.delete('/:id', deleteExam);
router.get('/:id/pdf', getFile);
router.get('/:id/audio', getFile);

export default router;

