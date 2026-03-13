import { Router } from 'express';
import {
  getAvailabilityHandler,
  createAvailabilityHandler,
  updateAvailabilityHandler,
  deleteAvailabilityHandler,
} from './availability.controller';

const router = Router();

router.get('/', getAvailabilityHandler);
router.post('/', createAvailabilityHandler);
router.put('/:id', updateAvailabilityHandler);
router.delete('/:id', deleteAvailabilityHandler);

export default router;

