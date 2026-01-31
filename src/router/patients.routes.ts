
import { Router } from 'express';
import { patientController } from '../controllers/patients.controllers';

const router = Router();


//   Patient Routes
   

// Get patient by ID (for patient themselves)
router.get('/:id', patientController.getPatientById);

//registration
router.post('/', patientController.createPatient);

// Update patient
router.put('/:id', patientController.updatePatient);

// Delete patient
router.delete('/:id', patientController.deletePatient);

/* ============================
   Admin Route
   ============================ */
// Get all patients (admin only)
router.get('/', patientController.getAllPatients);

export default router;
