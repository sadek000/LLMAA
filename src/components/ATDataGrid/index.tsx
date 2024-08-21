import React, { useEffect } from "react";
import { Box, Card, createTheme, styled, ThemeProvider, useTheme } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowSelectionModel,
  GridRowsProp,
  GridSlots,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import i18n from "i18n";
import { arSD, enUS } from "@mui/x-data-grid/locales";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEye";

import ATBox from "components/ATBox";
import ATButton from "components/ATButton";
import { ApiService } from "services/api";

type Props = {
  rows: any;
  columns: GridColDef[];
  canAdd?: boolean;
  flag?: string;
  onDelete?: any;
  onEdit?: (data: { [key: string]: any }, originalData: { [key: string]: any }) => Promise<any>;
  onAdd?: (data: { [key: string]: any }) => Promise<any>;
  path?: string;
  menu?: any;
  deleteURL?: string;
  [key: string]: any;
};

const ATDataGrid = (props: Props) => {
  const existingTheme = useTheme();

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [rows, setRows] = React.useState<GridRowModel[]>([]);
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    totalPages: 1,
    nextPageUrl: null,
    prevPageUrl: null,
  });

  const handlePageChange = (newPage: any) => {
    //fetchData(`http://127.0.0.1:8000/api/employee?page=${newPage}`);
  };
  useEffect(() => {
    setRows(props.rows);
  }, [props.rows]);
  const theme = React.useMemo(
    () =>
      createTheme(existingTheme, i18n.language === "ar" ? arSD : enUS, existingTheme, {
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }),
    [existingTheme]
  );

  const handleDelete = (id: GridRowId) => () => {
    ApiService.delete(props.deleteURL + id).then((res) => {
      props.onDelete(true);
    });
  };

  const navigate = useNavigate();

  const showDetails = (id: GridRowId) => () => {
    navigate(`${id}`);
  };
  const handleEdit = (id: GridRowId) => () => {
    navigate(`${id}`);
  };

  const columns: GridColDef[] = [
    ...props.columns,
    {
      field: "actions",
      type: "actions",
      headerName: t("actions"),
      flex: 1,
      sortable: false,
      renderCell: (param) => {
        const viewOneButtons = (
          <>
            <ATBox sx={{ display: "flex", justifyContent: "center" }}>
              <ATButton
                variant="text"
                color="primary"
                onClick={handleEdit(param.id)}
                circular
                iconOnly
              >
                <EditIcon />
              </ATButton>
              {/* <ATButton
                variant="text"
                color="warning"
                onClick={showDetails(param.id)}
                circular
                iconOnly
              >
                <EyeIcon />
              </ATButton> */}
              <ATButton
                variant="text"
                color="error"
                onClick={handleDelete(param.id)}
                circular
                iconOnly
              >
                <DeleteIcon />
              </ATButton>
            </ATBox>
          </>
        );
        const menuComponent = (
          <>
            {props.menu && (
              <ATBox sx={{ display: "flex", justifyContent: "center" }}>
                {props.menu(param.row)}
              </ATBox>
            )}
          </>
        );
        const withoutAction = <></>;

        return (
          <>
            {viewOneButtons}
            {menuComponent}
          </>
        );
      },
    },
  ];

  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

  return (
    <ThemeProvider theme={theme}>
      <Card
        dir={i18n.language === "ar" ? "rtl" : "ltrF"}
        style={{ height: "75.2vh", width: "100%" }}
      >
        <DataGrid
          pagination
          rows={rows}
          columns={props.flag !== "nothing" ? columns : props.columns}
          onRowSelectionModelChange={(newRowSelectionModel: any) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          {...props.rest}
          rowModesModel={rowModesModel}
          slots={{
            toolbar: CustomToolbar(props.canAdd) as GridSlots["toolbar"],
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          paginationMode="server"
          editMode="row"
          // pageSizeOptions={[10, 20, 30, 50, 100]}
          sx={{
            "--DataGrid-overlayHeight": "300px",
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSize={10}
          rowCount={pagination.totalPages}
          onPaginationModelChange={(params: any) => {
            handlePageChange(params.page);
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              setRows,
              setRowModesModel,
              rows,
            },
          }}
        />
      </Card>
    </ThemeProvider>
  );
};

export default ATDataGrid;

interface EditToolbarProps {
  rows: GridRowsProp;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

const CustomToolbar = (canAdd: boolean) => (props: EditToolbarProps) => {
  const { rows, setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 0;
    if (rows.find((e) => e.id === 0)) return;
    setRows((oldRows) => [{ id, isNew: true }, ...oldRows]);
    setRowModesModel((oldModel) => {
      return {
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      };
    });
  };
  return (
    <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
      <GridToolbar
        csvOptions={{
          utf8WithBom: true,
        }}
      />
      <GridToolbarQuickFilter />
      {canAdd && (
        <ATButton variant="text" size="large" color="primary" circular onClick={handleClick}>
          <AddIcon />
          {t("Add")}
        </ATButton>
      )}
    </GridToolbarContainer>
  );
};

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>{t("no_rows")}</Box>
    </StyledGridOverlay>
  );
}
