import { Box } from "@mui/material";
import { FC } from "react";
import { AddPost } from "./AddPost";
import { Posts } from "./Posts";

export const Home: FC = () => {
  return (
    <Box>
      <AddPost />
      <Posts />
    </Box>
  );
};
