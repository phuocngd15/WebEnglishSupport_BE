import { Router } from 'express';
import { postExam, getAllFiles, getOneExam, updateExam, deleteExam } from './exam.controller';
import { upload } from '../share/uploadFile';

const router = Router();

router.post('/', postExam);
router.get('/', getAllFiles);
router.get('/:id', getOneExam);
router.post('/:id', updateExam);
router.delete('/:id', deleteExam);
export default router;
