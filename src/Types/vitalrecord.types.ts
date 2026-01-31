export interface VitalRecord {
  VitalRecordID?: number;   // auto-generated
  PatientID: number;
  VitalTypeID: number;
  VitalValue: number;
  RecordedAt?: string;       // auto-filled by DB
  Severity?: string;
  SeverityColor?: string;
  Recommendation?: string;
}
