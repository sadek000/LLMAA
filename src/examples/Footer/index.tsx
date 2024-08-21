// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

//  ALDR Tech Dashboard Base Styles
import typography from "assets/theme/base/typography";
import { useTranslation } from "react-i18next";

// Declaring props types for Footer
interface Props {
  company?: {
    href: string;
    name: string;
  };
  links?: {
    href: string;
    name: string;
  }[];
  [key: string]: any;
}

function Footer({ company, links }: Props): JSX.Element {
  const { href, name } = company;
  const { size } = typography;
  const { t } = useTranslation();
  const renderLinks = () =>
    links.map((link) => (
      <ATBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <ATTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </ATTypography>
        </Link>
      </ATBox>
    ));

  return (
    <ATBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <ATBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, {t("powered_by")}
        <Link href={href} target="_blank">
          <ATTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </ATTypography>
        </Link>
      </ATBox>
      <ATBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </ATBox>
    </ATBox>
  );
}

// Declaring default props for Footer
Footer.defaultProps = {
  company: { href: process.env.REACT_APP_CREATOR_URL, name: process.env.REACT_APP_CREATOR_NAME },
  links: [
    // { href: "", name: "" },
    // { href: " presentation", name: "About Us" },
    // { href: " blog", name: "Blog" },
    // { href: " license", name: "License" },
  ],
};

export default Footer;
