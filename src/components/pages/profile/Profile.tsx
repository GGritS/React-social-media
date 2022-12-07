import { Box } from "@mui/system";
import React, { FC, useEffect } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { useFriends } from "../../../contexts/friends/FriendsContext";

export const Profile: FC = () => {
  const { user } = useAuth();
  const { registeredCurrentUser, fetchUsers } = useFriends();
  useEffect(() => {
    fetchUsers();
  }, []);

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
      {registeredCurrentUser.subscribed && (
        <>
          <Box>Followers: {registeredCurrentUser.subscribers.length}</Box>
          <Box>Following: {registeredCurrentUser.subscribed.length}</Box>
        </>
      )}

      <Box>
        name: {user.displayName ? user.displayName : "user don`t have name"}
      </Box>
      <Box> email: {user.email}</Box>
    </Box>
  );
};
