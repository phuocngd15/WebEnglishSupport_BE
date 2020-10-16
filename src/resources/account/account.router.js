import { Router } from 'express';
import controllers from './account.controller';
const router = Router();

// /api/card

router.route('/').get(controllers.getMany);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .post(controllers.createOne)
  .delete(controllers.removeOne);

export default router;
