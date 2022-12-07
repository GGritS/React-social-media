import { Grid } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { useAuth } from "../../contexts/auth/AuthContext";

import { Header } from "./hedaer/Header";
import { Sidebar } from "./sidebar/Sidebar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { isUserLogined } = useAuth();

  return (
    <>
      <Header />
      <Grid container spacing={2} paddingX={20} paddingTop={2}>
        {isUserLogined && (
          <Grid item md={2}>
            <Sidebar />
          </Grid>
        )}

        <Grid item md={isUserLogined ? 10 : 12} width="100%">
          {children}
        </Grid>
      </Grid>
    </>
  );
};
