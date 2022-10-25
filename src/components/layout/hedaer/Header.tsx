import React, { FC } from "react";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const { isUserLogined } = useAuth();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Social-media
          </Typography>
          {isUserLogined ? (
            <Button
              color="inherit"
              onClick={() => {
                signOut(auth);
                navigate("/login");
              }}
            >
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
