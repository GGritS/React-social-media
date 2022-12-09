import { Box, CircularProgress } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useFriends } from "../../../contexts/friends/FriendsContext";
import { Dialog } from "./dialog";
import { SelectDialogItem } from "./select-dialog-item";

export const Messages: FC = () => {
  const { registeredCurrentUser, fetchUsers, users } = useFriends();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);
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
        users.map((user) => (
          <SelectDialogItem name={user.displayName} image={user.photoURL} />
        ))
      ) : (
        // ))
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
};
