import { Box, CircularProgress } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useFriends } from "../../../contexts/friends/FriendsContext";
import { UserCard } from "./UserCard";

export const Friends: FC = () => {
  const { fetchUsers, users } = useFriends();
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "86vh",
        overflow: "auto",
      }}
    >
      {users.length ? (
        users.map((user) => <UserCard key={user.uid} userInfo={user} />)
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
};
