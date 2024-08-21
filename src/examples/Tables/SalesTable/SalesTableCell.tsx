// @mui material components
import TableCell from "@mui/material/TableCell";

//  ALDR Tech Dashboard components
import ATTypography from "components/ATTypography";
import ATBox from "components/ATBox";

// Declaring prop types for SalesTableCell
interface Props {
  title: string;
  content?: string | number;
  image?: string;
  noBorder?: boolean;
  [key: string]: any;
}

function SalesTableCell({ title, content, image, noBorder, ...rest }: Props): JSX.Element {
  let template;

  if (image) {
    template = (
      <TableCell {...rest} align="left" width="30%" sx={{ border: noBorder && 0 }}>
        <ATBox display="flex" alignItems="center" width="max-content">
          <ATBox
            component="img"
            src={image}
            alt={content.toString()}
            width="1.5rem"
            height="auto"
          />
          <ATBox display="flex" flexDirection="column" ml={3}>
            <ATTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}:
            </ATTypography>
            <ATTypography variant="button" fontWeight="regular" textTransform="capitalize">
              {content}
            </ATTypography>
          </ATBox>
        </ATBox>
      </TableCell>
    );
  } else {
    template = (
      <TableCell {...rest} align="center" sx={{ border: noBorder && 0 }}>
        <ATBox display="flex" flexDirection="column">
          <ATTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {title}:
          </ATTypography>
          <ATTypography variant="button" fontWeight="regular" textTransform="capitalize">
            {content}
          </ATTypography>
        </ATBox>
      </TableCell>
    );
  }

  return template;
}

// Declaring default props for SalesTableCell
SalesTableCell.defaultProps = {
  image: "",
  noBorder: false,
};

export default SalesTableCell;
