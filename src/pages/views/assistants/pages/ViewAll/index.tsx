import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ATBox, ATButton, ATDataGrid } from "components";
import { Loading } from "pages/components";
import { useATTranslation } from "hooks";
import { useAssistantData } from "../../hooks";
import { assisstantsColumns } from "../../utils";

const i18ns = ["add_assistant"];

export default function ViewAllAssistantsPage(): JSX.Element {
  const [addAssistant] = useATTranslation(i18ns);
  const [rerender, setRerender] = useState<boolean>(false);
  const { isLoading, assistants, handleNewAssistantClick } = useAssistantData();
  const [assistantRows, setAssistantRows] = useState<{ [key: string]: any }>(
    assistants?.items ?? []
  );

  useEffect(() => {
    if (assistants) {
      setAssistantRows(assistants.items);
    }
  }, [assistants?.items]);

  return isLoading ? (
    <Loading />
  ) : (
    <ATBox my={3}>
      <ATBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <ATButton variant="gradient" color="primary" onClick={() => handleNewAssistantClick()}>
          {addAssistant}
        </ATButton>
      </ATBox>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <ATDataGrid
            onDelete={setRerender}
            deleteURL="/api/app/assistant/"
            rows={assistantRows}
            columns={assisstantsColumns}
          />
        </Grid>
      </Grid>
    </ATBox>
  );
}
