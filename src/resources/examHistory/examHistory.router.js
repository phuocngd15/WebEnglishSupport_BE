import { Router } from 'express';
import { postExamHistory, getAll } from './examHistory.controller';

const router = Router();

router.post('/:accountId/:fullexamId', postExamHistory);
router.get('/:accountId', getAll);

export default router;
