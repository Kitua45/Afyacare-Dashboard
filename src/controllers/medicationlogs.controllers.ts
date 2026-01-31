
import { Request, Response } from 'express';
import { medicationLogsService } from '../services/medicationlogs.services';
import { MedicationLog } from '../Types/medicationlogs.types';

export const medicationLogsController = {
  createMedicationLog: async (req: Request, res: Response) => {
    try {
      const data: Omit<MedicationLog, 'MedicationLogID'> = req.body;
      const id = await medicationLogsService.createMedicationLog(data);
      res.status(201).json({ message: 'Medication log created', MedicationLogID: id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getMedicationLogById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const record = await medicationLogsService.getMedicationLogById(id);
      res.status(200).json(record);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  getAllMedicationLogs: async (_req: Request, res: Response) => {
    try {
      const records = await medicationLogsService.getAllMedicationLogs();
      res.status(200).json(records);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getLogsByPatientMedicationId: async (req: Request, res: Response) => {
    try {
      const patientMedicationId = Number(req.params.patientMedicationId);
      const records = await medicationLogsService.getLogsByPatientMedicationId(patientMedicationId);
      res.status(200).json(records);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  updateMedicationLog: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data: Partial<MedicationLog> = req.body;
      await medicationLogsService.updateMedicationLog(id, data);
      res.status(200).json({ message: 'Medication log updated successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteMedicationLog: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await medicationLogsService.deleteMedicationLog(id);
      res.status(200).json({ message: 'Medication log deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};
