import { Router } from 'express';
import { postExam, getAllFiles, getOneExam, updateExam, deleteExam } from './exam.controller';
import { upload } from '../share/uploadFile';

const router = Router();

router.post('/', upload.single('file'), postExam);
router.get('/', getAllFiles);
router.get('/:id', getOneExam);
router.post('/:id', upload.single('file'), updateExam);
router.delete('/:id', deleteExam);
export default router;
