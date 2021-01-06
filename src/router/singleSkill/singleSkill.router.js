import { Router } from 'express';
import {
  postExam,
  getAllExams,
  getOneExam,
  updateExam,
  deleteExam,
  getPdfRC,
  getPdfLC,
  getAudio
} from '../../controller/singleSkill.controller';

const router = Router();

router.post('/', postExam);
router.get('/', getAllExams);
router.get('/:id', getOneExam);
router.post('/:id', updateExam);
router.delete('/:id', deleteExam);
router.get('/:id/pdf/RC', getPdfRC);
router.get('/:id/pdf/LC', getPdfLC);
router.get('/:id/audio', getAudio);

export default router;
