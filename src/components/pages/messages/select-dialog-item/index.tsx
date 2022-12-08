import { Box, Grid } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";

import avatar from "./../../../../img/avatar.png";

export const SelectDialogItem: FC = () => {
  return (
    <Link
      to={`messages/${"uid"}`}
      style={{
        width: "100%",
        backgroundColor: "#F1F7FA",
        height: "4rem",
        textDecoration: "none",
        color: "black",
      }}
    >
      <Grid container sx={{ width: "100%", height: "100%" }} xs={12}>
        <Grid
          item
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          xs={1.5}
        >
          <Box
            component="img"
            sx={{
              height: "90%",
              borderRadius: "50%",
            }}
            alt="."
            src={avatar}
          />
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Box>Name surname</Box>
          <Box>last message</Box>
        </Grid>
        <Grid item xs={1.5} sx={{ height: "100%", textAlign: "center" }}>
          13/13/0001
        </Grid>
      </Grid>
    </Link>
  );
};
