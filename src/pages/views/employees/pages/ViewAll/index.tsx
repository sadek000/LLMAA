import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ATBox, ATButton, ATDataGrid } from "components";
import { Loading } from "pages/components";
import { useATTranslation } from "hooks";
import { useEmployeeData } from "../../hooks";
import { columns } from "../../utils";

const i18ns = ["add_employee"];

export default function ViewAllPage(): JSX.Element {
  const [addEmployee] = useATTranslation(i18ns);
  const [rerender, setRerender] = useState<boolean>(false);
  const { isLoading, employees, handleNewEmployeeClick } = useEmployeeData();
  const [employeeRows, setEmployeeRows] = useState<{ [key: string]: any }>(employees?.items ?? []);
  useEffect(() => {
    if (employees) {
      setEmployeeRows(employees.items);
    }
  }, [employees?.items]);

  return isLoading ? (
    <Loading />
  ) : (
    <ATBox my={3}>
      <ATBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <ATButton variant="gradient" color="primary" onClick={() => handleNewEmployeeClick()}>
          {addEmployee}
        </ATButton>
      </ATBox>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <ATDataGrid
            onDelete={setRerender}
            deleteURL="/api/identity/users/"
            rows={employeeRows}
            columns={columns}
          />
        </Grid>
      </Grid>
    </ATBox>
  );
}
