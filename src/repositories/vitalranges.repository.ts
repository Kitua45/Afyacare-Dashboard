
import { VitalRange } from '../Types/vitalrange.types';
import { getPool } from '../db/config';

export const vitalRangesRepository = {
  // Create a new range
  create: async (range: Omit<VitalRange, 'RangeID'>): Promise<number> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('VitalTypeID', range.VitalTypeID)
      .input('NormalMin', range.NormalMin)
      .input('NormalMax', range.NormalMax)
      .input('WarningMin', range.WarningMin)
      .input('WarningMax', range.WarningMax)
      .query(`
        INSERT INTO VitalRanges (VitalTypeID, NormalMin, NormalMax, WarningMin, WarningMax)
        OUTPUT INSERTED.RangeID
        VALUES (@VitalTypeID, @NormalMin, @NormalMax, @WarningMin, @WarningMax)
      `);
    return result.recordset[0].RangeID;
  },

  getById: async (id: number): Promise<VitalRange | null> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('RangeID', id)
      .query('SELECT * FROM VitalRanges WHERE RangeID = @RangeID');
    return result.recordset[0] || null;
  },

  update: async (id: number, range: Omit<VitalRange, 'RangeID'>): Promise<void> => {
    const pool = await getPool();
    await pool
      .request()
      .input('RangeID', id)
      .input('VitalTypeID', range.VitalTypeID)
      .input('NormalMin', range.NormalMin)
      .input('NormalMax', range.NormalMax)
      .input('WarningMin', range.WarningMin)
      .input('WarningMax', range.WarningMax)
      .query(`
        UPDATE VitalRanges
        SET VitalTypeID = @VitalTypeID, NormalMin = @NormalMin, NormalMax = @NormalMax,
            WarningMin = @WarningMin, WarningMax = @WarningMax
        WHERE RangeID = @RangeID
      `);
  },

  delete: async (id: number): Promise<void> => {
    const pool = await getPool();
    await pool
      .request()
      .input('RangeID', id)
      .query('DELETE FROM VitalRanges WHERE RangeID = @RangeID');
  },

  getAll: async (): Promise<VitalRange[]> => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM VitalRanges');
    return result.recordset;
  },

  getByVitalTypeId: async (vitalTypeId: number): Promise<VitalRange[]> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('VitalTypeID', vitalTypeId)
      .query('SELECT * FROM VitalRanges WHERE VitalTypeID = @VitalTypeID');
    return result.recordset;
  }
};
