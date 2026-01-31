
import { VitalRecord } from '../Types/vitalrecord.types';
import { getPool } from '../db/config';

export const vitalRecordsRepository = {
  create: async (record: Omit<VitalRecord, 'VitalRecordID' | 'RecordedAt' | 'Severity' | 'SeverityColor' | 'Recommendation'>): Promise<number> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('PatientID', record.PatientID)
      .input('VitalTypeID', record.VitalTypeID)
      .input('VitalValue', record.VitalValue)
      .query(`
        INSERT INTO VitalRecords (PatientID, VitalTypeID, VitalValue)
        OUTPUT INSERTED.VitalRecordID
        VALUES (@PatientID, @VitalTypeID, @VitalValue)
      `);
    return result.recordset[0].VitalRecordID;
  },

  getById: async (id: number): Promise<VitalRecord | null> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('VitalRecordID', id)
      .query('SELECT * FROM VitalRecords WHERE VitalRecordID = @VitalRecordID');
    return result.recordset[0] || null;
  },

  update: async (id: number, record: Partial<VitalRecord>): Promise<void> => {
    const pool = await getPool();
    await pool
      .request()
      .input('VitalRecordID', id)
      .input('VitalValue', record.VitalValue)
      .input('Severity', record.Severity)
      .input('SeverityColor', record.SeverityColor)
      .input('Recommendation', record.Recommendation)
      .query(`
        UPDATE VitalRecords
        SET VitalValue = @VitalValue,
            Severity = @Severity,
            SeverityColor = @SeverityColor,
            Recommendation = @Recommendation
        WHERE VitalRecordID = @VitalRecordID
      `);
  },

  delete: async (id: number): Promise<void> => {
    const pool = await getPool();
    await pool
      .request()
      .input('VitalRecordID', id)
      .query('DELETE FROM VitalRecords WHERE VitalRecordID = @VitalRecordID');
  },

  getAll: async (): Promise<VitalRecord[]> => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM VitalRecords');
    return result.recordset;
  },

  getByPatientId: async (patientId: number): Promise<VitalRecord[]> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('PatientID', patientId)
      .query('SELECT * FROM VitalRecords WHERE PatientID = @PatientID');
    return result.recordset;
  }
};
