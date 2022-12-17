import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useParams } from "react-router-dom";
import { RegisteredUser } from "../../../contexts/friends";
import { useUserContext } from "../../../contexts/user";

export const Profile: FC = () => {
  const { user, isUserLogined } = useAuth();
  const { users, user: currentUser } = useUserContext();

  const [profileInfo, setProfileInfo] = useState<RegisteredUser>();

  const { id } = useParams();

  useEffect(() => {
    if (!users || !id) return;
    if (id === user.uid) setProfileInfo(currentUser);
    else {
      const profileUser = users.filter((user) => user.uid === id);

      setProfileInfo(profileUser[0]);
    }
    // eslint-disable-next-line
  }, [profileInfo]);

  return (
    <>
      {profileInfo ? (
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            width: "100%",

            justifyContent: isUserLogined ? "" : "center",
          }}
        >
          <Box>
            <Box
              className="img warp"
              sx={{ width: "100%", textAlign: "center" }}
            >
              <img
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="avatar"
                width="100px"
                height="100px"
              />
            </Box>

            <Box
              sx={{
                marginTop: "1rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "2rem",
              }}
            >
              <Box>Followers: {profileInfo.subscribers.length}</Box>
              <Box>Following: {profileInfo.subscribed.length}</Box>
            </Box>
          </Box>
          <Box className="userInfo">
            <h1 style={{ margin: 0 }}>
              {profileInfo.displayName
                ? profileInfo.displayName
                : "user don`t have name"}
            </h1>
            <h3>status:{profileInfo?.status}</h3>
            <h3> email:{user.email}</h3>
            <h3>age: {profileInfo?.age === 0 ? "" : profileInfo?.age}</h3>
            <h3>
              country/city:
              {profileInfo?.navigation.country}-{profileInfo?.navigation.city}
            </h3>
          </Box>
          {user.uid === profileInfo.uid && (
            <Link to="/settings" style={{ color: "black" }}>
              <SettingsIcon />
            </Link>
          )}
        </Box>
      ) : (
        "loading 1"
      )}
    </>
  );
};
