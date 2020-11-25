import { Router } from 'express';
import { postExam, getAllExams, getOneExam, updateExam, deleteExam } from './exam.controller';
// import { upload } from '../share/uploadFile';

const router = Router();

router.post('/', postExam);
router.get('/', getAllExams);
router.get('/:id', getOneExam);
router.post('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;
