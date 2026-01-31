
import { vitalTypesRepository } from '../repositories/vitaltypes.repository';
import { VitalType } from '../Types/vitaltype.types';

export const vitalTypesService = {
  createVitalType: async (data: Omit<VitalType, 'VitalTypeID'>): Promise<number> => {
    return await vitalTypesRepository.create(data);
  },

  getVitalTypeById: async (id: number): Promise<VitalType> => {
    const vital = await vitalTypesRepository.getById(id);
    if (!vital) throw new Error(`VitalType with ID ${id} not found`);
    return vital;
  },

  updateVitalType: async (id: number, data: Omit<VitalType, 'VitalTypeID'>): Promise<void> => {
    const existing = await vitalTypesRepository.getById(id);
    if (!existing) throw new Error(`VitalType with ID ${id} not found`);
    await vitalTypesRepository.update(id, data);
  },

  deleteVitalType: async (id: number): Promise<void> => {
    const existing = await vitalTypesRepository.getById(id);
    if (!existing) throw new Error(`VitalType with ID ${id} not found`);
    await vitalTypesRepository.delete(id);
  },

  getAllVitalTypes: async (): Promise<VitalType[]> => {
    return await vitalTypesRepository.getAll();
  }
};
