
import { vitalRangesRepository } from '../repositories/vitalranges.repository';
import { VitalRange } from '../Types/vitalrange.types';

export const vitalRangesService = {
  createVitalRange: async (data: Omit<VitalRange, 'RangeID'>): Promise<number> => {
    return await vitalRangesRepository.create(data);
  },

  getVitalRangeById: async (id: number): Promise<VitalRange> => {
    const range = await vitalRangesRepository.getById(id);
    if (!range) throw new Error(`VitalRange with ID ${id} not found`);
    return range;
  },

  updateVitalRange: async (id: number, data: Omit<VitalRange, 'RangeID'>): Promise<void> => {
    const existing = await vitalRangesRepository.getById(id);
    if (!existing) throw new Error(`VitalRange with ID ${id} not found`);
    await vitalRangesRepository.update(id, data);
  },

  deleteVitalRange: async (id: number): Promise<void> => {
    const existing = await vitalRangesRepository.getById(id);
    if (!existing) throw new Error(`VitalRange with ID ${id} not found`);
    await vitalRangesRepository.delete(id);
  },

  getAllVitalRanges: async (): Promise<VitalRange[]> => {
    return await vitalRangesRepository.getAll();
  },

  getRangesByVitalTypeId: async (vitalTypeId: number): Promise<VitalRange[]> => {
    return await vitalRangesRepository.getByVitalTypeId(vitalTypeId);
  }
};
