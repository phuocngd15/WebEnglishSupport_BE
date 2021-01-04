import { Router } from 'express';
import controllers from './card.controller';
const router = Router();

router.route('/').get(controllers.getMany);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .post(controllers.createOne)
  .delete(controllers.removeOne);

export default router;
