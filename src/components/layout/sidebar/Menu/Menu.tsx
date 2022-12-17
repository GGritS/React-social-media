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
import { useAuth } from "../../../../contexts/auth/AuthContext";

export const Menu: FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigate = (path: string) => {
    if (path !== "/profile/") navigate(path);
    else navigate(path + user.uid);
  };
  return (
    <List>
      {menu.map((menuItem) => (
        <ListItemIcon sx={{ width: "100%" }} key={menuItem.pk}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate(menuItem.link)}>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItemButton>
          </ListItem>
        </ListItemIcon>
      ))}
    </List>
  );
};
