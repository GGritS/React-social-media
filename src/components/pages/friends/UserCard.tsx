import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { RegisteredUser } from "../../../contexts/friends";

type UserCardProps = {
  userInfo: RegisteredUser;
};

export const UserCard: FC<UserCardProps> = ({ userInfo }) => {
  const [isFollow, setIsFollow] = useState(false);
  const { age, displayName, photoURL, navigation } = userInfo;

  return (
    <Box
      sx={{
        margin: 2,
        paddingX: "30px",
        backgroundColor: "#F1F7FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
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
      {!isFollow ? (
        <Button
          sx={{ background: "grey", width: "100px", height: "50%" }}
          variant="contained"
          onClick={() => {
            setIsFollow(true);
          }}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          sx={{ background: "red", width: "100px", height: "50%" }}
          variant="contained"
          onClick={() => {
            setIsFollow(false);
          }}
        >
          Follow
        </Button>
      )}
    </Box>
  );
};
