
import { Router } from 'express';
import { medicationsController } from '../controllers/medications.controllers';

const router = Router();

router.post('/', medicationsController.createMedication);
router.get('/', medicationsController.getAllMedications);
router.get('/:id', medicationsController.getMedicationById);
router.put('/:id', medicationsController.updateMedication);
router.delete('/:id', medicationsController.deleteMedication);

export default router;
