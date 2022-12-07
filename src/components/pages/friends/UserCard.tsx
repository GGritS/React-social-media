import React, { FC } from "react";

import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useFriends } from "../../../contexts/friends/FriendsContext";
import { useStyles } from "./useStyles";
import { RegisteredUser } from "../../../contexts/friends";

type UserCardProps = {
  userInfo: RegisteredUser;
};

export const UserCard: FC<UserCardProps> = ({ userInfo }) => {
  const styles = useStyles({ loading: true });

  const { handleFollow, handleUnsubscribe, registeredCurrentUser } =
    useFriends();

  const { age, displayName, photoURL, navigation, uid, subscribers } = userInfo;

  return (
    <Box className={styles.wrapper}>
      <Link
        to="/profile/uid"
        style={{
          color: "black",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="avatar"
          src={photoURL ? photoURL : ""}
          sx={{ margin: 1, width: "70px", height: "70px" }}
        />
        <Box sx={{ marginLeft: 2 }}>
          <Box>{displayName}</Box>
          <Box>{age ? age : "the user did not indicate his age"}</Box>
          <Box>
            {navigation.country
              ? `${navigation.country}, ${navigation.city}`
              : " the user did not specify his country"}
          </Box>
        </Box>
      </Link>
      {registeredCurrentUser.subscribed.includes(uid) ? (
        <Button
          sx={{ background: "grey", width: "100px", height: "50%" }}
          variant="contained"
          onClick={() => {
            handleUnsubscribe(uid, subscribers);
          }}
        >
          Unsubscribe
        </Button>
      ) : (
        <Button
          sx={{ width: "100px", height: "50%" }}
          variant="contained"
          onClick={() => {
            handleFollow(uid, subscribers);
          }}
        >
          Follow
        </Button>
      )}
    </Box>
  );
};
