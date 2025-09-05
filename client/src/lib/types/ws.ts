import { Patient } from "./auth";

export enum WSMessageKind {
  PatientCreated = "patient_created",
  PatientDeleted = "patient_deleted",
  PatientUpdated = "patient_updated",
}

type WSCreatePatient = {
  patient: Patient;
  kind: WSMessageKind.PatientCreated;
};

export type WSEvent = WSCreatePatient;
