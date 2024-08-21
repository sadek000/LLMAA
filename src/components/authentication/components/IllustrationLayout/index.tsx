import { ReactNode } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

//  ALDR Tech Dashboard examples components
import DefaultNavbar from "components/ATNavbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// ALDR Tech Dashboard context
import { useDarkMode } from "state/hooks";

// Declaring props types for IllustrationLayout
interface Props {
  header?: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  illustration?: string;
}

function IllustrationLayout({
  header,
  title,
  description,
  illustration,
  children,
}: Props): JSX.Element {
  const [darkMode] = useDarkMode();

  return (
    <PageLayout background="white">
      <Grid
        container
        sx={{
          backgroundColor: ({ palette: { background, white } }) =>
            darkMode ? background.default : white.main,
        }}
      >
        <Grid item xs={12} lg={6}>
          <ATBox
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${illustration})` }}
          />
        </Grid>
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }}>
          <ATBox display="flex" flexDirection="column" justifyContent="center" height="100vh">
            <ATBox py={3} px={3} textAlign="center">
              {!header ? (
                <>
                  <ATBox mb={1} textAlign="center">
                    <ATTypography variant="h4" fontWeight="bold">
                      {title}
                    </ATTypography>
                  </ATBox>
                  <ATTypography variant="body2" color="text">
                    {description}
                  </ATTypography>
                </>
              ) : (
                header
              )}
            </ATBox>
            <ATBox p={3}>{children}</ATBox>
          </ATBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Declaring default props for IllustrationLayout
IllustrationLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  illustration: "",
};

export default IllustrationLayout;
