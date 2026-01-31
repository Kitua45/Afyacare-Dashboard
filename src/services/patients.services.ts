// src/services/patientService.ts
import { patientsRepository } from '../repositories/patients.repository';
import { Patient } from '../Types/patient.types';

export const patientService = {
  /**
   * Get a patient by ID
   */
  getPatientById: async (id: number): Promise<Patient> => {
    const patient = await patientsRepository.getById(id);
    if (!patient) {
      throw new Error(`Patient with ID ${id} not found`);
    }
    return patient;
  },

  /**
   * Create a new patient
   */
  createPatient: async (patientData: Omit<Patient, 'PatientID' | 'CreatedAt' | 'Age'>): Promise<number> => {
    // You can add additional validations here, e.g., DOB not in the future
    if (new Date(patientData.DateOfBirth) > new Date()) {
      throw new Error('DateOfBirth cannot be in the future');
    }

    // Call repository to insert patient
    const newPatientId = await patientsRepository.create(patientData);
    return newPatientId;
  },

  /**
   * Update an existing patient
   */
  updatePatient: async (
    id: number,
    patientData: Omit<Patient, 'PatientID' | 'CreatedAt' | 'Age'>
  ): Promise<void> => {
    // Optional: check if patient exists before updating
    const existingPatient = await patientsRepository.getById(id);
    if (!existingPatient) {
      throw new Error(`Patient with ID ${id} not found`);
    }

    await patientsRepository.update(id, patientData);
  },

  /**
   * Delete a patient
   */
  deletePatient: async (id: number): Promise<void> => {
    const existingPatient = await patientsRepository.getById(id);
    if (!existingPatient) {
      throw new Error(`Patient with ID ${id} not found`);
    }

    await patientsRepository.delete(id);
  },

  /**
   * Optional: for admin use, get all patients
   */
  getAllPatients: async (): Promise<Patient[]> => {
    return await patientsRepository.getAll();
  }
};
