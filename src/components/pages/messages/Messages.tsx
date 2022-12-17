import { Box, CircularProgress } from "@mui/material";
import React, { FC } from "react";
import { useUserContext } from "../../../contexts/user";
import { SelectDialogItem } from "./select-dialog-item";

export const Messages: FC = () => {
  const { users } = useUserContext();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {users.length ? (
        users.map((user) => <SelectDialogItem user={user} key={user.uid} />)
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
};
