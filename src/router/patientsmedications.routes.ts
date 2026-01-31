
import { Router } from 'express';
import { patientMedicationsController } from '../controllers/patientmedications.controllers';

const router = Router();

router.post('/', patientMedicationsController.createPatientMedication);
router.get('/', patientMedicationsController.getAllPatientMedications);
router.get('/:id', patientMedicationsController.getPatientMedicationById);
router.get('/patient/:patientId', patientMedicationsController.getPatientMedicationsByPatientId);
router.put('/:id', patientMedicationsController.updatePatientMedication);
router.delete('/:id', patientMedicationsController.deletePatientMedication);

export default router;
