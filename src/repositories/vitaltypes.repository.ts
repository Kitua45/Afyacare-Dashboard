
import { VitalType } from '../Types/vitaltype.types';
import { getPool } from '../db/config';

export const vitalTypesRepository = {
  //  new vital type
  create: async (vital: Omit<VitalType, 'VitalTypeID'>): Promise<number> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('VitalName', vital.VitalName)
      .input('Unit', vital.Unit)
      .query(`
        INSERT INTO VitalTypes (VitalName, Unit)
        OUTPUT INSERTED.VitalTypeID
        VALUES (@VitalName, @Unit)
      `);
    return result.recordset[0].VitalTypeID;
  },

  // Get by ID
  getById: async (id: number): Promise<VitalType | null> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('VitalTypeID', id)
      .query('SELECT * FROM VitalTypes WHERE VitalTypeID = @VitalTypeID');
    return result.recordset[0] || null;
  },

  // Update
  update: async (id: number, vital: Omit<VitalType, 'VitalTypeID'>): Promise<void> => {
    const pool = await getPool();
    await pool
      .request()
      .input('VitalTypeID', id)
      .input('VitalName', vital.VitalName)
      .input('Unit', vital.Unit)
      .query(`
        UPDATE VitalTypes 
        SET VitalName = @VitalName, Unit = @Unit 
        WHERE VitalTypeID = @VitalTypeID
      `);
  },

  // Delete
  delete: async (id: number): Promise<void> => {
    const pool = await getPool();
    await pool
      .request()
      .input('VitalTypeID', id)
      .query('DELETE FROM VitalTypes WHERE VitalTypeID = @VitalTypeID');
  },

  // Get all
  getAll: async (): Promise<VitalType[]> => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM VitalTypes');
    return result.recordset;
  }
};
