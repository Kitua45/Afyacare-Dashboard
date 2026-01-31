
import { patientMedicationsRepository } from '../repositories/patientmedications.repository';
import { PatientMedication } from '../Types/patientmedication.types';

export const patientMedicationsService = {
  createPatientMedication: async (data: Omit<PatientMedication, 'PatientMedicationID'>): Promise<number> => {
    return await patientMedicationsRepository.create(data);
  },

  getPatientMedicationById: async (id: number): Promise<PatientMedication> => {
    const record = await patientMedicationsRepository.getById(id);
    if (!record) throw new Error(`PatientMedication with ID ${id} not found`);
    return record;
  },

  getAllPatientMedications: async (): Promise<PatientMedication[]> => {
    return await patientMedicationsRepository.getAll();
  },

  getPatientMedicationsByPatientId: async (patientId: number): Promise<PatientMedication[]> => {
    return await patientMedicationsRepository.getByPatientId(patientId);
  },

  updatePatientMedication: async (id: number, data: Partial<PatientMedication>): Promise<void> => {
    await patientMedicationsRepository.update(id, data);
  },

  deletePatientMedication: async (id: number): Promise<void> => {
    await patientMedicationsRepository.delete(id);
  }
};
