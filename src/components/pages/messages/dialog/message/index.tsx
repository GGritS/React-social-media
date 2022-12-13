import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";

type MessageProps = {
  isMyMessage: boolean;
  children: ReactNode;
};

export const Message: FC<MessageProps> = ({ isMyMessage, children }) => {
  return (
    <Box
      sx={{
        marginTop: "0.5rem",
        marginX: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: isMyMessage ? "flex-end" : "flex-start",
      }}
    >
      <Box
        sx={{
          borderRadius: "2rem",
          paddingX: "1rem",
          paddingY: "0.5rem",
          marginLeft: "0.5rem",
          maxWidth: "55%",
          width: "content",
          height: "content",
          backgroundColor: isMyMessage ? "royalBlue" : "gray",
          color: "white",
        }}
      >
        <Box>{children}</Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "0.3rem",
          }}
        >
          6m ago
        </Box>
      </Box>
    </Box>
  );
};
