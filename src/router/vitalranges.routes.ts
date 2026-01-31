
import { Router } from 'express';
import { vitalRangesController } from '../controllers/vitalranges.controllers';

const router = Router();

// CRUD
router.post('/', vitalRangesController.createVitalRange);
router.get('/:id', vitalRangesController.getVitalRangeById);
router.put('/:id', vitalRangesController.updateVitalRange);
router.delete('/:id', vitalRangesController.deleteVitalRange);
router.get('/', vitalRangesController.getAllVitalRanges);

// Get all ranges for a specific vital type
router.get('/vital/:vitalTypeId', vitalRangesController.getRangesByVitalTypeId);

export default router;
