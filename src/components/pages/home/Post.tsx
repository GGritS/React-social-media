import { Avatar, Card } from "@mui/material";
import { Box } from "@mui/system";
import { Timestamp } from "firebase/firestore";
import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useGetDate } from "../../../hooks/time/useGetDate";
import { useGetTime } from "../../../hooks/time/useGetTime";

type PostProps = {
  children: ReactNode;
  id: string;
  name: string;
  img?: string;
  createdAt: Timestamp;
};

export const Post: FC<PostProps> = ({ children, id, name, img, createdAt }) => {
  const createdDate = useGetDate(createdAt.seconds);
  const createdTime = useGetTime(createdAt.seconds);
  return (
    <Card sx={{ marginBottom: 1, paddingX: 2 }}>
      <Link
        to={`/profile/${id}`}
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
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 14 }}>{name}</span>
          <span
            style={{ fontSize: 14, opacity: "0.6" }}
          >{`${createdDate} at ${createdTime}`}</span>
        </Box>
      </Link>

      <p>{children}</p>
      {/* {post.images?.length && (
  <ImageList variant="masonry" cols={2} gap={8}>
    {post.images.map((image) => (
      <ImageListItem key={image}>
        <img src={image} alt={""} loading="lazy" />
      </ImageListItem>
    ))}
  </ImageList>
)} */}
    </Card>
  );
};
