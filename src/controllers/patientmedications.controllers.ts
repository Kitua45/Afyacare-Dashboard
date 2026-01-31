
import { Request, Response } from 'express';
import { patientMedicationsService } from '../services/patientmedications.services';
import { PatientMedication } from '../Types/patientmedication.types';

export const patientMedicationsController = {
  createPatientMedication: async (req: Request, res: Response) => {
    try {
      const data: Omit<PatientMedication, 'PatientMedicationID'> = req.body;
      const id = await patientMedicationsService.createPatientMedication(data);
      res.status(201).json({ message: 'Patient medication scheduled', PatientMedicationID: id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getPatientMedicationById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const record = await patientMedicationsService.getPatientMedicationById(id);
      res.status(200).json(record);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  getAllPatientMedications: async (_req: Request, res: Response) => {
    try {
      const records = await patientMedicationsService.getAllPatientMedications();
      res.status(200).json(records);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getPatientMedicationsByPatientId: async (req: Request, res: Response) => {
    try {
      const patientId = Number(req.params.patientId);
      const records = await patientMedicationsService.getPatientMedicationsByPatientId(patientId);
      res.status(200).json(records);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePatientMedication: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data: Partial<PatientMedication> = req.body;
      await patientMedicationsService.updatePatientMedication(id, data);
      res.status(200).json({ message: 'Patient medication updated successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePatientMedication: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await patientMedicationsService.deletePatientMedication(id);
      res.status(200).json({ message: 'Patient medication deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};
