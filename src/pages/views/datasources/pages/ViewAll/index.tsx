import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ATBox, ATButton, ATDataGrid } from "components";
import { Loading } from "pages/components";
import { useATTranslation } from "hooks";
import { useDataSourceData } from "../../hooks";
import { dataSourceColumns } from "../../utils";

const i18ns = ["add_data_source"];

export default function ViewAllDataSourcesPage(): JSX.Element {
  const [addDataSource] = useATTranslation(i18ns);
  const [rerender, setRerender] = useState<boolean>(false);
  const { isLoading, dataSources, handleNewDataSourceClick } = useDataSourceData();
  const [dataSourceRows, setDataSourceRows] = useState<{ [key: string]: any }>(
    dataSources?.items ?? []
  );

  useEffect(() => {
    if (dataSources) {
      setDataSourceRows(dataSources.items);
    }
  }, [dataSources?.items]);

  return isLoading ? (
    <Loading />
  ) : (
    <ATBox my={4} mx={2} p={3} bgcolor="#f9f9f9" borderRadius="2" boxShadow={2}>
      <ATBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <ATButton
          variant="gradient"
          color="primary"
          onClick={() => handleNewDataSourceClick()}
          size="large"
          sx={{ borderRadius: "12px", boxShadow: 3 }}
        >
          {addDataSource}
        </ATButton>
      </ATBox>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ATDataGrid
            onDelete={setRerender}
            deleteURL="/api/app/data-source/"
            rows={dataSourceRows}
            columns={dataSourceColumns}
            sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: "#ffffff" }}
          />
        </Grid>
      </Grid>
    </ATBox>
  );
}
