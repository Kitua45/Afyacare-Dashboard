
import { Router } from 'express';
import { vitalRecordsController } from '../controllers/vitalrecords.controllers';

const router = Router();

// Create a new vital record
router.post('/', vitalRecordsController.createVitalRecord);

// Get all vital records
router.get('/', vitalRecordsController.getAllVitalRecords);

// Get vital record by ID
router.get('/:id', vitalRecordsController.getVitalRecordById);

// Get all vital records for a specific patient
router.get('/patient/:patientId', vitalRecordsController.getVitalRecordsByPatientId);

// Update a vital record
router.put('/:id', vitalRecordsController.updateVitalRecord);

// Delete a vital record
router.delete('/:id', vitalRecordsController.deleteVitalRecord);

export default router;
