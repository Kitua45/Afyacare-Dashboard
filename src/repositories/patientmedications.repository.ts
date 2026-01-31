
import { getPool } from '../db/config';
import { PatientMedication } from '../Types/patientmedication.types';

export const patientMedicationsRepository = {
  create: async (data: Omit<PatientMedication, 'PatientMedicationID'>): Promise<number> => {
    const pool = await getPool();
    try {
      const result = await pool
        .request()
        .input('PatientID', data.PatientID)
        .input('MedicationID', data.MedicationID)
        .input('Dosage', data.Dosage)
        .input('TimeToTake', data.TimeToTake)
        .query(`
          INSERT INTO PatientMedications (PatientID, MedicationID, Dosage, TimeToTake)
          OUTPUT INSERTED.PatientMedicationID
          VALUES (@PatientID, @MedicationID, @Dosage, @TimeToTake)
        `);
      return result.recordset[0].PatientMedicationID;
    } finally {
      // singleton connection managed
    }
  },

  getById: async (id: number): Promise<PatientMedication | null> => {
    const pool = await getPool();
    try {
      const result = await pool
        .request()
        .input('PatientMedicationID', id)
        .query(`
          SELECT * FROM PatientMedications
          WHERE PatientMedicationID = @PatientMedicationID
        `);
      return result.recordset[0] || null;
    } finally {}
  },

  getAll: async (): Promise<PatientMedication[]> => {
    const pool = await getPool();
    try {
      const result = await pool.request().query(`SELECT * FROM PatientMedications`);
      return result.recordset;
    } finally {}
  },

  getByPatientId: async (patientId: number): Promise<PatientMedication[]> => {
    const pool = await getPool();
    try {
      const result = await pool
        .request()
        .input('PatientID', patientId)
        .query(`SELECT * FROM PatientMedications WHERE PatientID = @PatientID`);
      return result.recordset;
    } finally {}
  },

  update: async (id: number, data: Partial<PatientMedication>): Promise<void> => {
    const pool = await getPool();
    try {
      await pool
        .request()
        .input('PatientMedicationID', id)
        .input('PatientID', data.PatientID)
        .input('MedicationID', data.MedicationID)
        .input('Dosage', data.Dosage)
        .input('TimeToTake', data.TimeToTake)
        .query(`
          UPDATE PatientMedications
          SET PatientID = @PatientID,
              MedicationID = @MedicationID,
              Dosage = @Dosage,
              TimeToTake = @TimeToTake
          WHERE PatientMedicationID = @PatientMedicationID
        `);
    } finally {}
  },

  delete: async (id: number): Promise<void> => {
    const pool = await getPool();
    try {
      await pool
        .request()
        .input('PatientMedicationID', id)
        .query(`DELETE FROM PatientMedications WHERE PatientMedicationID = @PatientMedicationID`);
    } finally {}
  }
};
