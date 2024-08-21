import { t } from "i18next";
import { GridColDef } from "@mui/x-data-grid";
import { DefaultCell } from "pages/components";

export default [
  {
    headerName: t("employee_name"),
    field: "name",
    type: "custom",
    flex: 1,
    renderHeader: (params) => {
      return <DefaultCell value={params.colDef.headerName} />;
    },
    renderCell({ row }) {
      return row.name;
    },
  },
  {
    headerName: t("email"),
    field: "email",
    type: "custom",
    flex: 1,
    renderHeader: (params) => {
      return <DefaultCell value={params.colDef.headerName} />;
    },
    renderCell: (params) => params.row.email,
  },
] as GridColDef[];
