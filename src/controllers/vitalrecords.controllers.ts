// src/controllers/vitalRecordsController.ts
import { Request, Response } from 'express';
import { vitalRecordsService } from '../services/vitalrecords.services';
import { VitalRecord } from '../Types/vitalrecord.types';

export const vitalRecordsController = {
  /**
   * Create a new vital record
   * POST /vital-records
   */
  createVitalRecord: async (req: Request, res: Response) => {
    try {
      const data: Omit<VitalRecord, 'VitalRecordID' | 'RecordedAt' | 'Severity' | 'SeverityColor' | 'Recommendation'> = req.body;

      const recordId = await vitalRecordsService.createVitalRecord(data);
      res.status(201).json({ message: 'Vital record created', VitalRecordID: recordId });
    } catch (error: any) {
      console.error('Error creating vital record:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  },

  /**
   * Get a vital record by ID
   * GET /vital-records/:id
   */
  getVitalRecordById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const record = await vitalRecordsService.getVitalRecordById(id);
      res.status(200).json(record);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  /**
   * Get all vital records
   * GET /vital-records
   */
  getAllVitalRecords: async (_req: Request, res: Response) => {
    try {
      const records = await vitalRecordsService.getAllVitalRecords();
      res.status(200).json(records);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Get all vital records for a specific patient
   * GET /vital-records/patient/:patientId
   */
  getVitalRecordsByPatientId: async (req: Request, res: Response) => {
    try {
      const patientId = Number(req.params.patientId);
      const records = await vitalRecordsService.getVitalRecordsByPatientId(patientId);
      res.status(200).json(records);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Update a vital record
   * PUT /vital-records/:id
   */
  updateVitalRecord: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data: Partial<VitalRecord> = req.body;

      await vitalRecordsService.updateVitalRecord(id, data);
      res.status(200).json({ message: 'Vital record updated successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Delete a vital record
   * DELETE /vital-records/:id
   */
  deleteVitalRecord: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await vitalRecordsService.deleteVitalRecord(id);
      res.status(200).json({ message: 'Vital record deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};
