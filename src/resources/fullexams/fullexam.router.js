import { Router } from 'express'
import {
  postFullExam,
  updateFullExamWithExam,
  getAll,
  getOne
} from './fullexam.controller'
import { postExamWithFullFirst } from '../exam/exam.controller'
// import { upload } from '../share/uploadFile';

const router = Router()

router.post('/', postFullExam)
router.get('/', getAll)
router.get('/:id', getOne)
router.post('/:id', updateFullExamWithExam)
router.post('/:id/exam', postExamWithFullFirst)
// router.delete('/:id', deleteExam);
export default router
