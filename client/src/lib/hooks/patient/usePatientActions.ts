import { useBulkDeletePatients } from "@client/lib/api/practitioner/query";
import { useState } from "react";

export const usePatientActions = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { mutateAsync: deletePatients } = useBulkDeletePatients();

  const handleDeletePatientsDialog = (open: boolean) => {
    setOpenDeleteDialog(open);
  };

  const handleDeletePatient = (patientIds: number[]) => {
    // Logic to delete patient
    deletePatients(patientIds);
    // TODO: Add error or success logic as well as snack bar notifications
    setOpenDeleteDialog(false);
  };

  return {
    openDeleteDialog,
    handleDeletePatientsDialog,
    handleDeletePatient,
  };
};
