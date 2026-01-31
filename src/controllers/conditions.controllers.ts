
import { Request, Response } from 'express';
import { conditionsService } from '../services/conditions.services';

export const conditionsController = {
  createCondition: async (req: Request, res: Response) => {
    try {
      const id = await conditionsService.createCondition(req.body);
      res.status(201).json({ ConditionID: id });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  getConditionById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const condition = await conditionsService.getConditionById(id);
      res.status(200).json(condition);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  updateCondition: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await conditionsService.updateCondition(id, req.body);
      res.status(200).json({ message: 'Condition updated successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteCondition: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await conditionsService.deleteCondition(id);
      res.status(200).json({ message: 'Condition deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  getAllConditions: async (_req: Request, res: Response) => {
    try {
      const conditions = await conditionsService.getAllConditions();
      res.status(200).json(conditions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
