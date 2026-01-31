// src/repositories/patientConditionsRepository.ts
import { PatientCondition } from '../Types/patientconditions.types';
import { getPool } from '../db/config';

export const patientConditionsRepository = {
  // Create a new patient-condition link
  create: async (data: Omit<PatientCondition, 'PatientConditionID'>): Promise<number> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('PatientID', data.PatientID)
      .input('ConditionID', data.ConditionID)
      .query(`
        INSERT INTO PatientConditions (PatientID, ConditionID)
        OUTPUT INSERTED.PatientConditionID
        VALUES (@PatientID, @ConditionID)
      `);
    return result.recordset[0].PatientConditionID;
  },

  // Get by ID
  getById: async (id: number): Promise<PatientCondition | null> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('PatientConditionID', id)
      .query('SELECT * FROM PatientConditions WHERE PatientConditionID = @PatientConditionID');
    return result.recordset[0] || null;
  },

  // Update link
  update: async (id: number, data: Omit<PatientCondition, 'PatientConditionID'>): Promise<void> => {
    const pool = await getPool();
    await pool
      .request()
      .input('PatientConditionID', id)
      .input('PatientID', data.PatientID)
      .input('ConditionID', data.ConditionID)
      .query(`
        UPDATE PatientConditions 
        SET PatientID = @PatientID, ConditionID = @ConditionID 
        WHERE PatientConditionID = @PatientConditionID
      `);
  },

  // Delete link
  delete: async (id: number): Promise<void> => {
    const pool = await getPool();
    await pool
      .request()
      .input('PatientConditionID', id)
      .query('DELETE FROM PatientConditions WHERE PatientConditionID = @PatientConditionID');
  },

  // Get all links
  getAll: async (): Promise<PatientCondition[]> => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM PatientConditions');
    return result.recordset;
  },

  // Get all conditions for a patient
  getByPatientId: async (patientId: number): Promise<PatientCondition[]> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('PatientID', patientId)
      .query('SELECT * FROM PatientConditions WHERE PatientID = @PatientID');
    return result.recordset;
  }
};
