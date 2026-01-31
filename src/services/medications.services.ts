
import { medicationsRepository } from '../repositories/medications.repository';
import { Medication } from '../Types/medications.types';

export const medicationsService = {
  createMedication: async (data: Omit<Medication, 'MedicationID'>): Promise<number> => {
    return await medicationsRepository.create(data);
  },

  getMedicationById: async (id: number): Promise<Medication> => {
    const med = await medicationsRepository.getById(id);
    if (!med) throw new Error(`Medication with ID ${id} not found`);
    return med;
  },

  getAllMedications: async (): Promise<Medication[]> => {
    return await medicationsRepository.getAll();
  },

  updateMedication: async (id: number, data: Partial<Medication>): Promise<void> => {
    await medicationsRepository.update(id, data);
  },

  deleteMedication: async (id: number): Promise<void> => {
    await medicationsRepository.delete(id);
  }
};
