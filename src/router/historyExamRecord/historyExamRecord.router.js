import { Router } from 'express';
import profileMiddle from '../profile/profileMiddle';
import profileMiddle2 from '../profile/profileMiddle2';
import {
  submitExam,
  getAnalyzeByEmail
} from '../../controller/historyExamRecord.controller';

const router = Router();

router.get('/analyze', profileMiddle2, getAnalyzeByEmail);
router.post('/submit', profileMiddle, submitExam);

export default router;
