import { getPool } from '../db/config';
import { Patient } from '../Types/patient.types';

export const patientsRepository = {
  getById: async (id: number): Promise<Patient | null> => {
    const pool = await getPool();
    const result = await pool.request()
      .input('PatientID', id)
      .query('SELECT * FROM Patients WHERE PatientID = @PatientID');
    return result.recordset[0] || null;
  },

  create: async (patient: Omit<Patient, 'PatientID' | 'CreatedAt' | 'Age'>): Promise<number> => {
    const pool = await getPool();
    const result = await pool.request()
      .input('FirstName', patient.FirstName)
      .input('LastName', patient.LastName)
      .input('Gender', patient.Gender)
      .input('DateOfBirth', patient.DateOfBirth)
      .input('PhoneNumber', patient.PhoneNumber)
      .query(`
        INSERT INTO Patients (FirstName, LastName, Gender, DateOfBirth, PhoneNumber)
        VALUES (@FirstName, @LastName, @Gender, @DateOfBirth, @PhoneNumber);
        SELECT SCOPE_IDENTITY() AS PatientID;
      `);
    return result.recordset[0].PatientID;
  },

  update: async (id: number, patient: Omit<Patient, 'PatientID' | 'CreatedAt' | 'Age'>): Promise<void> => {
    const pool = await getPool();
    await pool.request()
      .input('PatientID', id)
      .input('FirstName', patient.FirstName)
      .input('LastName', patient.LastName)
      .input('Gender', patient.Gender)
      .input('DateOfBirth', patient.DateOfBirth)
      .input('PhoneNumber', patient.PhoneNumber)
      .query(`
        UPDATE Patients
        SET FirstName=@FirstName, LastName=@LastName, Gender=@Gender,
            DateOfBirth=@DateOfBirth, PhoneNumber=@PhoneNumber
        WHERE PatientID=@PatientID
      `);
  },

  delete: async (id: number): Promise<void> => {
    const pool = await getPool();
    await pool.request()
      .input('PatientID', id)
      .query('DELETE FROM Patients WHERE PatientID=@PatientID');
  },

  // Optional admin function — can be used later
  getAll: async (): Promise<Patient[]> => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Patients');
    return result.recordset;
  }
};
