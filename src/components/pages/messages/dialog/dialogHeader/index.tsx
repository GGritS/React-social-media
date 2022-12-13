import React, { FC } from "react";

import { Box } from "@mui/system";
import avatar from "./../../../../../img/avatar.png";

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
        gap: "1rem",
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
    </Box>
  );
};
