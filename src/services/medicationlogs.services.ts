
import { medicationLogsRepository } from '../repositories/medicationlogs.repository';
import { MedicationLog } from '../Types/medicationlogs.types';

export const medicationLogsService = {
  createMedicationLog: async (data: Omit<MedicationLog, 'MedicationLogID'>): Promise<number> => {
    return await medicationLogsRepository.create(data);
  },

  getMedicationLogById: async (id: number): Promise<MedicationLog> => {
    const record = await medicationLogsRepository.getById(id);
    if (!record) throw new Error(`MedicationLog with ID ${id} not found`);
    return record;
  },

  getAllMedicationLogs: async (): Promise<MedicationLog[]> => {
    return await medicationLogsRepository.getAll();
  },

  getLogsByPatientMedicationId: async (patientMedicationId: number): Promise<MedicationLog[]> => {
    return await medicationLogsRepository.getByPatientMedicationId(patientMedicationId);
  },

  updateMedicationLog: async (id: number, data: Partial<MedicationLog>): Promise<void> => {
    await medicationLogsRepository.update(id, data);
  },

  deleteMedicationLog: async (id: number): Promise<void> => {
    await medicationLogsRepository.delete(id);
  }
};
