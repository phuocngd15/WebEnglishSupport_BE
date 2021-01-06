import { Router } from 'express';
import {
  postExamHistory,
  getAll
} from '../../controller/examHistory.controller';

const router = Router();

router.post('/:accountId/:fullexamId', postExamHistory);
router.get('/:accountId', getAll);

export default router;
