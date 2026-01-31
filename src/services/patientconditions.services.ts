
import { patientConditionsRepository } from '../repositories/patientconditions.repository';
import { PatientCondition } from '../Types/patientconditions.types';

export const patientConditionsService = {
  createPatientCondition: async (data: Omit<PatientCondition, 'PatientConditionID'>): Promise<number> => {
    // Optional: you can check if this pair already exists to give a friendly error
    return await patientConditionsRepository.create(data);
  },

  getPatientConditionById: async (id: number): Promise<PatientCondition> => {
    const pc = await patientConditionsRepository.getById(id);
    if (!pc) throw new Error(`PatientCondition with ID ${id} not found`);
    return pc;
  },

  updatePatientCondition: async (id: number, data: Omit<PatientCondition, 'PatientConditionID'>): Promise<void> => {
    const existing = await patientConditionsRepository.getById(id);
    if (!existing) throw new Error(`PatientCondition with ID ${id} not found`);
    await patientConditionsRepository.update(id, data);
  },

  deletePatientCondition: async (id: number): Promise<void> => {
    const existing = await patientConditionsRepository.getById(id);
    if (!existing) throw new Error(`PatientCondition with ID ${id} not found`);
    await patientConditionsRepository.delete(id);
  },

  getAllPatientConditions: async (): Promise<PatientCondition[]> => {
    return await patientConditionsRepository.getAll();
  },

  getConditionsByPatientId: async (patientId: number): Promise<PatientCondition[]> => {
    return await patientConditionsRepository.getByPatientId(patientId);
  }
};
