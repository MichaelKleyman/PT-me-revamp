import { Paper, Table, TableContainer, TablePagination } from "@mui/material";
import { PatientsTableHead } from "./PatientsTableHead";
import { PatientsTableToolbar } from "./PatientsTableToolbar";
import { PatientsTableBody } from "./PatientsTableBody";
import { usePatientsTable } from "@client/lib/hooks/table/patients-table/usePatientsTable";
import { Patient } from "@client/lib/types/auth";
import { DialogConfirmation } from "@client/lib/components/dialog/DialogConfirmation";
import { usePatientActions } from "@client/lib/hooks/patient/usePatientActions";

const headCells = [
  {
    id: "select-all",
    numeric: false,
    disablePadding: true,
    label: "Select All",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
];

type TPatientsTableProps = {
  patients?: Patient[];
};

export const PatientsTable = (props: TPatientsTableProps) => {
  const { patients } = props;

  const { openDeleteDialog, handleDeletePatientsDialog, handleDeletePatient } =
    usePatientActions();

  const {
    selected,
    page,
    rowsPerPage,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    emptyRows,
    visibleRows,
  } = usePatientsTable({ patients });

  const renderPatientsTableHead = (
    <PatientsTableHead
      headCells={headCells}
      numSelected={selected.length}
      onSelectAllClick={handleSelectAllClick}
      rowCount={patients?.length ?? 0}
    />
  );

  const renderPatientsToolbar = (
    <PatientsTableToolbar
      selected={selected}
      numSelected={selected.length}
      handleDeletePatientsDialog={handleDeletePatientsDialog}
    />
  );

  const renderTableBody = (
    <PatientsTableBody
      visibleRows={visibleRows}
      selected={selected}
      handleClick={handleClick}
      emptyRows={emptyRows}
    />
  );

  const renderTablePagination = (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      count={patients?.length ?? 0}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  const renderDeletePatientsDialog = (
    <DialogConfirmation
      open={openDeleteDialog}
      title="Delete Patients"
      body="Are you sure you want to delete the selected patient(s)? This action cannot be undone."
      onConfirm={() => handleDeletePatient(selected)}
      onCancel={() => handleDeletePatientsDialog(false)}
    />
  );

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      {renderPatientsToolbar}
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
          {renderPatientsTableHead}
          {renderTableBody}
        </Table>
      </TableContainer>
      {renderTablePagination}
      {renderDeletePatientsDialog}
    </Paper>
  );
};
