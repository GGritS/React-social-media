import { Box, CircularProgress } from "@mui/material";
import React, { FC } from "react";
import { Dialog } from "./dialog";
import { SelectDialogItem } from "./select-dialog-item";

export const Messages: FC = () => {
  const yourDialogs = [1, 2, 3];
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {yourDialogs.length ? (
        // <Dialog />
        <>
          <SelectDialogItem />
          <SelectDialogItem />
          <SelectDialogItem />
          <SelectDialogItem />
        </>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
};
