import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import IconButton from "@mui/material/IconButton";
import ATBox from "components/ATBox";

const ITEM_HEIGHT = 48;
export default function MenuComponent({ options }: { options: any }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "max-content",
          },
        }}
      >
        {options.map((option: any) => (
          <MenuItem
            key={option.id}
            selected={false}
            onClick={() => {
              setAnchorEl(null);
              option.handleOpen();
            }}
          >
            <ATBox p={1} style={{ color: option?.color }} textAlign={"center"}>
              {option.icon} {option.name}
            </ATBox>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
