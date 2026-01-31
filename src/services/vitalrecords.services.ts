
import { vitalRecordsRepository } from '../repositories/vitalrecords.repository';
import { vitalRangesRepository } from '../repositories/vitalranges.repository';
import { VitalRecord } from '../Types/vitalrecord.types';

export const vitalRecordsService = {
  /**
   * Create a new vital record and automatically compute
   * Severity, SeverityColor, and Recommendation based on ranges.
   */
  createVitalRecord: async (
    data: Omit<VitalRecord, 'VitalRecordID' | 'RecordedAt' | 'Severity' | 'SeverityColor' | 'Recommendation'>
  ): Promise<number> => {
    // Step 1: Insert the record
    const recordId = await vitalRecordsRepository.create(data);

    // Step 2: Get ranges
    const ranges = await vitalRangesRepository.getByVitalTypeId(data.VitalTypeID);

    // Initialize defaults
    let severity = 'Normal';
    let color = 'Green';
    let recommendation = 'All good. Continue monitoring.';

    // Step 3: Only compute if ranges exist
    if (ranges.length > 0) {
      // Use non-null assertion to tell TS this exists
      const r = ranges[0]!;

      if (data.VitalValue >= r.NormalMin && data.VitalValue <= r.NormalMax) {
        severity = 'Normal';
        color = 'Green';
        recommendation = 'All good. Continue monitoring.';
      } else if (
        (r.WarningMin !== null && data.VitalValue >= r.WarningMin && data.VitalValue < r.NormalMin) ||
        (r.WarningMax !== null && data.VitalValue > r.NormalMax && data.VitalValue <= r.WarningMax)
      ) {
        severity = 'Warning';
        color = 'Orange';
        recommendation = 'Monitor closely and consider seeing a doctor.';
      } else {
        severity = 'Critical';
        color = 'Red';
        recommendation = 'Seek medical attention immediately.';
      }
    }

    // Step 4: Update the record with computed values
    await vitalRecordsRepository.update(recordId, {
      Severity: severity,
      SeverityColor: color,
      Recommendation: recommendation
    });

    return recordId;
  },

  getVitalRecordById: async (id: number): Promise<VitalRecord> => {
    const record = await vitalRecordsRepository.getById(id);
    if (!record) throw new Error(`VitalRecord with ID ${id} not found`);
    return record;
  },

  updateVitalRecord: async (id: number, data: Partial<VitalRecord>): Promise<void> => {
    await vitalRecordsRepository.update(id, data);
  },

  deleteVitalRecord: async (id: number): Promise<void> => {
    await vitalRecordsRepository.delete(id);
  },

  getAllVitalRecords: async (): Promise<VitalRecord[]> => {
    return await vitalRecordsRepository.getAll();
  },

  getVitalRecordsByPatientId: async (patientId: number): Promise<VitalRecord[]> => {
    return await vitalRecordsRepository.getByPatientId(patientId);
  }
};
