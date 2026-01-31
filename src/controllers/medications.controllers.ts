// src/controllers/medicationsController.ts
import { Request, Response } from 'express';
import { medicationsService } from '../services/medications.services';
import { Medication } from '../Types/medications.types';

export const medicationsController = {
  createMedication: async (req: Request, res: Response) => {
    try {
      const data: Omit<Medication, 'MedicationID'> = req.body;
      const id = await medicationsService.createMedication(data);
      res.status(201).json({ message: 'Medication created', MedicationID: id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getMedicationById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const med = await medicationsService.getMedicationById(id);
      res.status(200).json(med);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  getAllMedications: async (_req: Request, res: Response) => {
    try {
      const meds = await medicationsService.getAllMedications();
      res.status(200).json(meds);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  updateMedication: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data: Partial<Medication> = req.body;
      await medicationsService.updateMedication(id, data);
      res.status(200).json({ message: 'Medication updated successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteMedication: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await medicationsService.deleteMedication(id);
      res.status(200).json({ message: 'Medication deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};
