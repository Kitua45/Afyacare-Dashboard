
export interface MedicationLog {
  MedicationLogID?: number; // optional for new inserts
  PatientMedicationID: number;
  Taken: boolean;
  TakenAt?: string; // ISO string for datetime
}
