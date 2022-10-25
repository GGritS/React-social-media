import React, { FC } from "react";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

export const Header: FC = () => {
  const { isUserLogined } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Social-media
          </Typography>
          {isUserLogined ? (
            <Button color="inherit" onClick={() => signOut(auth)}>
              Logout
            </Button>
          ) : (
            // <Button color="inherit">Login</Button>
            ""
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
