import { Box, CircularProgress } from "@mui/material";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import React, { FC, useEffect } from "react";
import { useFriends } from "../../../contexts/friends/FriendsContext";
import { Dialog } from "./dialog";
import { SelectDialogItem } from "./select-dialog-item";

export const Messages: FC = () => {
  const { registeredCurrentUser, fetchUsers, users } = useFriends();

  useEffect(() => {
    fetchUsers();

    console.log("Timestamp", Timestamp.now());

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
        users.map((user) => <SelectDialogItem user={user} key={user.uid} />)
      ) : (
        // ))
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
};
