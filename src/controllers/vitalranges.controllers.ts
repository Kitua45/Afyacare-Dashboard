
import { Request, Response } from 'express';
import { vitalRangesService } from '../services/vitalranges.services';

export const vitalRangesController = {
  createVitalRange: async (req: Request, res: Response) => {
    try {
      const id = await vitalRangesService.createVitalRange(req.body);
      res.status(201).json({ RangeID: id });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  getVitalRangeById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const range = await vitalRangesService.getVitalRangeById(id);
      res.status(200).json(range);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  updateVitalRange: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await vitalRangesService.updateVitalRange(id, req.body);
      res.status(200).json({ message: 'VitalRange updated successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteVitalRange: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await vitalRangesService.deleteVitalRange(id);
      res.status(200).json({ message: 'VitalRange deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  getAllVitalRanges: async (_req: Request, res: Response) => {
    try {
      const ranges = await vitalRangesService.getAllVitalRanges();
      res.status(200).json(ranges);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getRangesByVitalTypeId: async (req: Request, res: Response) => {
    try {
      const vitalTypeId = Number(req.params.vitalTypeId);
      const ranges = await vitalRangesService.getRangesByVitalTypeId(vitalTypeId);
      res.status(200).json(ranges);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
