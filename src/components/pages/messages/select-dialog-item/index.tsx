import { Box, Grid } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { RegisteredUser } from "../../../../contexts/friends";

import avatar from "./../../../../img/avatar.png";

type SelectDialogItemProps = {
  user: RegisteredUser;
};

export const SelectDialogItem: FC<SelectDialogItemProps> = ({ user }) => {
  const { displayName: name, photoURL: image, uid } = user;
  return (
    <Link
      to={uid}
      style={{
        width: "100%",
        backgroundColor: "#F1F7FA",
        height: "4rem",
        textDecoration: "none",
        color: "black",
      }}
    >
      <Grid container sx={{ width: "100%", height: "100%" }}>
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
            src={image ? image : avatar}
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
          <Box>{name}</Box>
          <Box>last message</Box>
        </Grid>
        <Grid item xs={1.5} sx={{ height: "100%", textAlign: "center" }}>
          13/13/0001
        </Grid>
      </Grid>
    </Link>
  );
};
