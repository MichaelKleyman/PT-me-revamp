import { Patient } from "./auth";

export enum WSMessageKind {
  PatientCreated = "patient_created",
  PatientDeleted = "patient_deleted",
  PatientsBulkDeleted = "patients_bulk_deleted",
  PatientUpdated = "patient_updated",
}

type WSCreatePatient = {
  patient: Patient;
  kind: WSMessageKind.PatientCreated;
};

type WSBulkDeletePatients = {
  patientIds: number[];
  kind: WSMessageKind.PatientsBulkDeleted;
};

export type WSEvent = WSCreatePatient | WSBulkDeletePatients;
