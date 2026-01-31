// src/controllers/patientConditionsController.ts
import { Request, Response } from 'express';
import { patientConditionsService } from '../services/patientconditions.services';

export const patientConditionsController = {
  createPatientCondition: async (req: Request, res: Response) => {
    try {
      const id = await patientConditionsService.createPatientCondition(req.body);
      res.status(201).json({ PatientConditionID: id });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  getPatientConditionById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const pc = await patientConditionsService.getPatientConditionById(id);
      res.status(200).json(pc);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  updatePatientCondition: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await patientConditionsService.updatePatientCondition(id, req.body);
      res.status(200).json({ message: 'PatientCondition updated successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  deletePatientCondition: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await patientConditionsService.deletePatientCondition(id);
      res.status(200).json({ message: 'PatientCondition deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  getAllPatientConditions: async (_req: Request, res: Response) => {
    try {
      const pcs = await patientConditionsService.getAllPatientConditions();
      res.status(200).json(pcs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getConditionsByPatientId: async (req: Request, res: Response) => {
    try {
      const patientId = Number(req.params.patientId);
      const pcs = await patientConditionsService.getConditionsByPatientId(patientId);
      res.status(200).json(pcs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
