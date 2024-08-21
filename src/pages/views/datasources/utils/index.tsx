import { GridColDef } from "@mui/x-data-grid";
const dataSourceType: string[] = ["Attachment", "GitHub", "Drive"];

export const dataSourceColumns = [
  { field: "title", headerName: "Name", flex: 1 },
  { field: "description", headerName: "Description", flex: 1 },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    renderCell({ row }) {
      return (dataSourceType as any)[row.type];
    },
  },
  // Add more columns as necessary
] as GridColDef[];
