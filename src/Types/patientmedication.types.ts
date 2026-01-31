
export interface PatientMedication {
  PatientMedicationID?: number; // optional for new inserts
  PatientID: number;
  MedicationID: number;
  Dosage: string;
  TimeToTake: string; // format "HH:MM:SS"
}
