export interface SessionManager {
  getSessionItem<T = string>(key: string): Promise<T | null>;
  setSessionItem<T>(key: string, value: T): Promise<void>;
  removeSessionItem(key: string): Promise<void>;
  destroySession(): Promise<void>;
}

export enum UserType {
  Patient = "patient",
  Practitioner = "practitioner",
}

export enum WSMessageKind {
  PatientCreated = "patient_created",
  PatientDeleted = "patient_deleted",
  PatientsBulkDeleted = "patients_bulk_deleted",
  PatientUpdated = "patient_updated",
}
