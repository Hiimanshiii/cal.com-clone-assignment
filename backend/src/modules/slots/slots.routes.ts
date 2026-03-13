import { Router } from 'express';
import { getSlotsHandler } from './slots.controller';

const router = Router();

router.get('/:slug', getSlotsHandler);

export default router;

