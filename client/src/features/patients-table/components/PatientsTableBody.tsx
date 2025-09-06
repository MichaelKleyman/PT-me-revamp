import { Patient } from "@client/lib/types/auth";
import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";

type TPatientsTableBodyProps = {
  visibleRows: Patient[];
  selected: number[];
  handleClick: (id?: number) => void;
  dense: boolean;
  emptyRows: number;
};

export const PatientsTableBody = (props: TPatientsTableBodyProps) => {
  const { visibleRows, selected, handleClick, dense, emptyRows } = props;

  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        if (!row.id) return null;
        const isItemSelected = selected.includes(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            onClick={() => handleClick(row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
            sx={{ cursor: "pointer" }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  "aria-labelledby": labelId,
                }}
              />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.email}</TableCell>
            <TableCell align="right">{row.address}</TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};
