import {
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "@tanstack/react-router";

interface EnhancedTableToolbarProps {
  selected: number[];
  numSelected: number;
  handleDeletePatientsDialog: (open: boolean) => void;
}

type TPatientsTableToolbarProps = EnhancedTableToolbarProps & {};

export const PatientsTableToolbar = (props: TPatientsTableToolbarProps) => {
  const { selected, numSelected, handleDeletePatientsDialog } = props;
  const navigate = useNavigate();

  const handleViewPatient = () => {
    navigate({
      to: "/practice/patients/$patientId",
      params: { patientId: selected[0].toString() },
    });
  };

  const renderViewPatientButton = (
    <Button variant="contained" onClick={handleViewPatient}>
      View
    </Button>
  );

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle">
          All Patients
        </Typography>
      )}
      {numSelected === 1 ? renderViewPatientButton : null}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDeletePatientsDialog(true)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
