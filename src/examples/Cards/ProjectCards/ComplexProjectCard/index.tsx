/* eslint-disable no-unused-vars */

import { ReactNode } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";
import ATAvatar from "components/ATAvatar";

// Declaring prop types for the ComplexProjectCard
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
  image: string;
  title: string;
  dateTime?: string;
  description: ReactNode;
  members?: string[];
  dropdown?: {
    action?: (...arg: any) => void;
    menu?: ReactNode;
  };
  [key: string]: any;
}

// Custom styles for ComplexProjectCard
function ComplexProjectCard({
  color,
  image,
  title,
  dateTime,
  description,
  members,
  dropdown,
}: Props): JSX.Element {
  const renderMembers = members.map((member, key) => {
    const memberKey = `member-${key}`;

    return (
      <ATAvatar
        key={memberKey}
        src={member}
        alt="member profile"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  return (
    <Card>
      <ATBox p={2}>
        <ATBox display="flex" alignItems="center">
          <ATAvatar
            src={image}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{ p: 1, mt: -6, borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl }}
          />
          <ATBox ml={2} mt={-2} lineHeight={0}>
            <ATTypography variant="h6" textTransform="capitalize" fontWeight="medium">
              {title}
            </ATTypography>
            {members.length > -1 ? <ATBox display="flex">{renderMembers}</ATBox> : null}
          </ATBox>
          {dropdown && (
            <ATTypography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                ml: "auto",
                mt: -1,
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <Icon sx={{ cursor: "pointer", fontWeight: "bold" }}>more_vert</Icon>
            </ATTypography>
          )}
          {dropdown.menu}
        </ATBox>
        <ATBox my={2} lineHeight={1}>
          <ATTypography variant="button" fontWeight="light" color="text">
            {description}
          </ATTypography>
        </ATBox>
        <Divider />
        <ATBox display="flex" justifyContent="space-between" alignItems="center">
          {members.length > -1 ? (
            <ATBox display="flex" flexDirection="column" lineHeight={0}>
              <ATTypography variant="button" fontWeight="medium">
                {members.length}
              </ATTypography>
              <ATTypography variant="button" fontWeight="regular" color="secondary">
                Participants
              </ATTypography>
            </ATBox>
          ) : null}
          {dateTime ? (
            <ATBox display="flex" flexDirection="column" lineHeight={0}>
              <ATTypography variant="button" fontWeight="medium">
                {dateTime}
              </ATTypography>
              <ATTypography variant="button" fontWeight="regular" color="secondary">
                Due date
              </ATTypography>
            </ATBox>
          ) : null}
        </ATBox>
      </ATBox>
    </Card>
  );
}

// Declaring default props for ComplexProjectCard
ComplexProjectCard.defaultProps = {
  color: "dark",
  dateTime: "",
  members: [],
  dropdown: false,
};

export default ComplexProjectCard;
