
import { Router } from 'express';
import { patientConditionsController } from '../controllers/patientconditions.controllers';

const router = Router();

// CRUD routes
router.post('/', patientConditionsController.createPatientCondition);
router.get('/:id', patientConditionsController.getPatientConditionById);
router.put('/:id', patientConditionsController.updatePatientCondition);
router.delete('/:id', patientConditionsController.deletePatientCondition);
router.get('/', patientConditionsController.getAllPatientConditions);

// Get all conditions for a specific patient
router.get('/patient/:patientId', patientConditionsController.getConditionsByPatientId);

export default router;
