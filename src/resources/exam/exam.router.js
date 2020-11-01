import { Router } from 'express';
import { postExam, upload, getAllFiles, getOneExam, updateExam, deleteExam } from './exam.controller';

const router = Router();

router.post('/', upload.single('file'), postExam);
router.get('/', getAllFiles);
router.get('/:id', getOneExam);
router.post('/:id',upload.single('file'), updateExam);
router.delete('/:id', deleteExam);
export default router;
