import React, { FC } from "react";

import { Box } from "@mui/system";
import avatar from "./../../../../../img/avatar.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

type DialogHeaderProps = {
  name: string;
  id: string;
  image: string | null;
};

export const DialogHeader: FC<DialogHeaderProps> = ({ name, id, image }) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "royalblue",
        height: "6vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Link
        to="/messages"
        style={{
          color: "black",
          textDecoration: "none",
          position: "absolute",
          left: "3%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowBackIcon />
      </Link>
      <Link
        to={`/profile/${id}`}
        style={{
          gap: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          textDecoration: "none",
        }}
      >
        <Box
          component="img"
          sx={{
            height: "5vh",
            width: "5v",
            borderRadius: "50%",
          }}
          alt="avatar"
          src={image ? image : avatar}
        />
        <Box sx={{ fontSize: "1.2rem" }}> {name}</Box>
      </Link>
    </Box>
  );
};
