import React, { FC } from "react";

import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useFriends } from "../../../contexts/friends/FriendsContext";
import { useStyles } from "./useStyles";
import { RegisteredUser } from "../../../contexts/friends";

type UserCardProps = {
  info: RegisteredUser;
  currentUser: RegisteredUser;
  followed: boolean;
};

export const UserCard: FC<UserCardProps> = ({
  info,
  followed,
  currentUser,
}) => {
  const styles = useStyles({ loading: true });

  const { handleFollow, handleUnsubscribe } = useFriends();

  const { age, displayName, photoURL, navigation, uid, subscribers } = info;

  return (
    <Box className={styles.wrapper}>
      <Link
        to={`/profile/${info.uid}`}
        style={{
          color: "black",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="avatar"
          src={
            photoURL
              ? photoURL
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          sx={{ margin: 1, width: "70px", height: "70px" }}
        />
        <Box sx={{ marginLeft: 2 }}>
          <Box>{displayName}</Box>
          <Box>{age ? age : "the user did not indicate his age"}</Box>
          <Box>
            {navigation.country
              ? navigation.city
                ? `${navigation.country} ${navigation.city}`
                : `${navigation.country}`
              : "the user did not specify his country"}
          </Box>
        </Box>
      </Link>
      {followed ? (
        <Button
          sx={{ background: "grey", width: "100px", height: "50%" }}
          variant="contained"
          onClick={() => {
            handleUnsubscribe(uid, subscribers, currentUser);
          }}
        >
          Unsubscribe
        </Button>
      ) : (
        <Button
          sx={{ width: "100px", height: "50%" }}
          variant="contained"
          onClick={() => {
            handleFollow(uid, subscribers, currentUser);
          }}
        >
          Follow
        </Button>
      )}
    </Box>
  );
};
