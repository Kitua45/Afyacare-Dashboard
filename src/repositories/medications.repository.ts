// src/repositories/medicationsRepository.ts
import { getPool } from '../db/config';
import { Medication } from '../Types/medications.types';

export const medicationsRepository = {
  create: async (data: Omit<Medication, 'MedicationID'>): Promise<number> => {
    const pool = await getPool();
    try {
      const result = await pool
        .request()
        .input('MedicationName', data.MedicationName)
        .input('Purpose', data.Purpose)
        .query(`
          INSERT INTO Medications (MedicationName, Purpose)
          OUTPUT INSERTED.MedicationID
          VALUES (@MedicationName, @Purpose)
        `);
      return result.recordset[0].MedicationID;
    } finally {
      // No need to close pool if using singleton getPool()
    }
  },

  getById: async (id: number): Promise<Medication | null> => {
    const pool = await getPool();
    try {
      const result = await pool
        .request()
        .input('MedicationID', id)
        .query(`SELECT * FROM Medications WHERE MedicationID = @MedicationID`);
      return result.recordset[0] || null;
    } finally {
      // connection managed by singleton
    }
  },

  getAll: async (): Promise<Medication[]> => {
    const pool = await getPool();
    try {
      const result = await pool.request().query(`SELECT * FROM Medications`);
      return result.recordset;
    } finally {
      // connection managed by singleton
    }
  },

  update: async (id: number, data: Partial<Medication>): Promise<void> => {
    const pool = await getPool();
    try {
      await pool
        .request()
        .input('MedicationID', id)
        .input('MedicationName', data.MedicationName)
        .input('Purpose', data.Purpose)
        .query(`
          UPDATE Medications
          SET MedicationName = @MedicationName,
              Purpose = @Purpose
          WHERE MedicationID = @MedicationID
        `);
    } finally {
      // connection managed by singleton
    }
  },

  delete: async (id: number): Promise<void> => {
    const pool = await getPool();
    try {
      await pool
        .request()
        .input('MedicationID', id)
        .query(`DELETE FROM Medications WHERE MedicationID = @MedicationID`);
    } finally {
      
    }
  }
};
