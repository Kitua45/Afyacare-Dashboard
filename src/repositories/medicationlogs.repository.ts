// src/repositories/medicationLogsRepository.ts
import { getPool } from '../db/config';
import { MedicationLog } from '../Types/medicationlogs.types';

export const medicationLogsRepository = {
  create: async (data: Omit<MedicationLog, 'MedicationLogID'>): Promise<number> => {
    const pool = await getPool();
    try {
      const result = await pool
        .request()
        .input('PatientMedicationID', data.PatientMedicationID)
        .input('Taken', data.Taken)
        .input('TakenAt', data.TakenAt)
        .query(`
          INSERT INTO MedicationLogs (PatientMedicationID, Taken, TakenAt)
          OUTPUT INSERTED.MedicationLogID
          VALUES (@PatientMedicationID, @Taken, @TakenAt)
        `);
      return result.recordset[0].MedicationLogID;
    } finally {}
  },

  getById: async (id: number): Promise<MedicationLog | null> => {
    const pool = await getPool();
    try {
      const result = await pool
        .request()
        .input('MedicationLogID', id)
        .query(`SELECT * FROM MedicationLogs WHERE MedicationLogID = @MedicationLogID`);
      return result.recordset[0] || null;
    } finally {}
  },

  getAll: async (): Promise<MedicationLog[]> => {
    const pool = await getPool();
    try {
      const result = await pool.request().query(`SELECT * FROM MedicationLogs`);
      return result.recordset;
    } finally {}
  },

  getByPatientMedicationId: async (patientMedicationId: number): Promise<MedicationLog[]> => {
    const pool = await getPool();
    try {
      const result = await pool
        .request()
        .input('PatientMedicationID', patientMedicationId)
        .query(`SELECT * FROM MedicationLogs WHERE PatientMedicationID = @PatientMedicationID`);
      return result.recordset;
    } finally {}
  },

  update: async (id: number, data: Partial<MedicationLog>): Promise<void> => {
    const pool = await getPool();
    try {
      await pool
        .request()
        .input('MedicationLogID', id)
        .input('PatientMedicationID', data.PatientMedicationID)
        .input('Taken', data.Taken)
        .input('TakenAt', data.TakenAt)
        .query(`
          UPDATE MedicationLogs
          SET PatientMedicationID = @PatientMedicationID,
              Taken = @Taken,
              TakenAt = @TakenAt
          WHERE MedicationLogID = @MedicationLogID
        `);
    } finally {}
  },

  delete: async (id: number): Promise<void> => {
    const pool = await getPool();
    try {
      await pool
        .request()
        .input('MedicationLogID', id)
        .query(`DELETE FROM MedicationLogs WHERE MedicationLogID = @MedicationLogID`);
    } finally {}
  }
};
