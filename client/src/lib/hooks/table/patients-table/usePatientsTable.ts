import { Patient } from "@client/lib/types/auth";
import { useMemo, useState } from "react";

type TPatientsTableProps = {
  patients?: Patient[];
};

export const usePatientsTable = (props: TPatientsTableProps) => {
  const { patients } = props;

  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected =
        patients?.flatMap((n) => (n.id !== undefined ? [n.id] : [])) ?? [];
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id?: number) => {
    if (id === undefined) return;

    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 && patients
      ? Math.max(0, (1 + page) * rowsPerPage - patients.length)
      : 0;

  const visibleRows = useMemo(
    () =>
      patients
        ? [...patients]
            .sort()
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : [],
    [page, patients, rowsPerPage]
  );

  return {
    selected,
    page,
    rowsPerPage,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    emptyRows,
    visibleRows,
  };
};
