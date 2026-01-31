
import { Router } from 'express';
import { medicationLogsController } from '../controllers/medicationlogs.controllers';

const router = Router();

router.post('/', medicationLogsController.createMedicationLog);
router.get('/', medicationLogsController.getAllMedicationLogs);
router.get('/:id', medicationLogsController.getMedicationLogById);
router.get('/patient-medication/:patientMedicationId', medicationLogsController.getLogsByPatientMedicationId);
router.put('/:id', medicationLogsController.updateMedicationLog);
router.delete('/:id', medicationLogsController.deleteMedicationLog);

export default router;

