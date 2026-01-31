
import { Request, Response } from 'express';
import { vitalTypesService } from '../services/vitaltypes.services';

export const vitalTypesController = {
  createVitalType: async (req: Request, res: Response) => {
    try {
      const id = await vitalTypesService.createVitalType(req.body);
      res.status(201).json({ VitalTypeID: id });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  getVitalTypeById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const vital = await vitalTypesService.getVitalTypeById(id);
      res.status(200).json(vital);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  updateVitalType: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await vitalTypesService.updateVitalType(id, req.body);
      res.status(200).json({ message: 'VitalType updated successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteVitalType: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await vitalTypesService.deleteVitalType(id);
      res.status(200).json({ message: 'VitalType deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  getAllVitalTypes: async (_req: Request, res: Response) => {
    try {
      const vitals = await vitalTypesService.getAllVitalTypes();
      res.status(200).json(vitals);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
