import { List } from "@mui/material";
import React, { FC } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { menu } from "./dataMenu";
import { useNavigate } from "react-router-dom";

export const Menu: FC = () => {
  const navigate = useNavigate();

  return (
    <List>
      {menu.map((menuItem) => (
        <ListItemIcon sx={{ width: "100%" }} key={menuItem.pk}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(menuItem.link)}>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItemButton>
          </ListItem>
        </ListItemIcon>
      ))}
    </List>
  );
};
