
import { Condition } from '../Types/condition.types';
import { getPool } from '../db/config';

export const conditionsRepository = {
  // Create a new condition
  create: async (condition: Omit<Condition, 'ConditionID'>): Promise<number> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('ConditionName', condition.ConditionName)
      .query(`
        INSERT INTO Conditions (ConditionName)
        OUTPUT INSERTED.ConditionID
        VALUES (@ConditionName)
      `);
    return result.recordset[0].ConditionID;
  },

  // Get condition by ID
  getById: async (id: number): Promise<Condition | null> => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('ConditionID', id)
      .query('SELECT * FROM Conditions WHERE ConditionID = @ConditionID');
    return result.recordset[0] || null;
  },

  // Update condition
  update: async (id: number, condition: Omit<Condition, 'ConditionID'>): Promise<void> => {
    const pool = await getPool();
    await pool
      .request()
      .input('ConditionID', id)
      .input('ConditionName', condition.ConditionName)
      .query('UPDATE Conditions SET ConditionName = @ConditionName WHERE ConditionID = @ConditionID');
  },

  // Delete condition
  delete: async (id: number): Promise<void> => {
    const pool = await getPool();
    await pool
      .request()
      .input('ConditionID', id)
      .query('DELETE FROM Conditions WHERE ConditionID = @ConditionID');
  },

  // Get all conditions
  getAll: async (): Promise<Condition[]> => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Conditions');
    return result.recordset;
  }
};
