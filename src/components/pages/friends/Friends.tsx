import { Box, CircularProgress } from "@mui/material";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { RegisteredUser } from "../../../contexts/friends";
import { useFriends } from "../../../contexts/friends/FriendsContext";
import { db } from "../../../firebase";
import { UserCard } from "./UserCard";

export const Friends: FC = () => {
  const { fetchUsers, users, registeredCurrentUser } = useFriends();

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
