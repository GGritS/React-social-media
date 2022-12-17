import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/auth/AuthContext";

export const SidebarUserItem: FC = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ backgroundColor: "#F1F7FA" }}>
      <Link
        to={`/profile/${user.uid}`}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "black",
        }}
      >
        <Box
          sx={{
            position: "relative",
            marginRight: 2,
            borderRadius: "50%",
            width: 46,
            height: 46,
          }}
        >
          <Avatar
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="avatar"
            sx={{ width: 46, height: 46 }}
          />
          <Box
            sx={{
              backgroundColor: "#4FB14F",
              border: "2px solid #F1F7FA",
              width: 10,
              height: 10,
              position: "absolute",
              bottom: 0,
              right: 2,
              borderRadius: "50%",
            }}
          />
        </Box>
        <span>{user.displayName ? user.displayName : "Name not found"}</span>
      </Link>
    </Box>
  );
};
