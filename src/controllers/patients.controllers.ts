// src/controllers/patientController.ts
import { Request, Response } from 'express';
import { patientService } from '../services/patients.services';

/**
 * Controller for Patient-related endpoints
 */
export const patientController = {
  // Get a patient by ID
  getPatientById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const patient = await patientService.getPatientById(id);
      res.status(200).json(patient);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  // Create a new patient
  createPatient: async (req: Request, res: Response) => {
    try {
      const patientData = req.body;
      const newPatientId = await patientService.createPatient(patientData);
      res.status(201).json({ PatientID: newPatientId });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update a patient
  updatePatient: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const patientData = req.body;
      await patientService.updatePatient(id, patientData);
      res.status(200).json({ message: 'Patient updated successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a patient
  deletePatient: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await patientService.deletePatient(id);
      res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  // Optional: Admin use - get all patients
  getAllPatients: async (_req: Request, res: Response) => {
    try {
      const patients = await patientService.getAllPatients();
      res.status(200).json(patients);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
