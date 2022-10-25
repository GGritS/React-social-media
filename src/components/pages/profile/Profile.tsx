import { Box } from "@mui/system";
import React, { FC } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";

export const Profile: FC = () => {
  const { user } = useAuth();
  return (
    <Box>
      <Box>
        {user.photoURL ? (
          user.photoURL
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="avatar"
            width="100px"
            height="100px"
          />
        )}
      </Box>
      <Box>
        name: {user.displayName ? user.displayName : "user don`t have name"}
      </Box>
      <Box> email: {user.email}</Box>
    </Box>
  );
};
