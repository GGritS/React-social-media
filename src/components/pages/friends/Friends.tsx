import { Box, CircularProgress } from "@mui/material";
import React, { FC } from "react";
import { useUserContext } from "../../../contexts/user";
import { UserCard } from "./UserCard";

export const Friends: FC = () => {
  const { users, user: currentUser } = useUserContext();

  return (
    <Box
      sx={{
        width: "100%",
        height: "86vh",
        overflow: "auto",
      }}
    >
      {users.length && currentUser ? (
        users.map((user) => (
          <UserCard
            key={user.uid}
            info={user}
            followed={currentUser.subscribed.includes(user.uid)}
            currentUser={currentUser}
          />
        ))
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
};
