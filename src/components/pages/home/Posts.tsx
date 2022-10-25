import {
  Avatar,
  Card,
  CircularProgress,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { collection, onSnapshot } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import { IPost } from "../../../types";

export const Posts: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (doc) => {
      const fechedPosts = [] as IPost[];
      doc.forEach((d: any) => fechedPosts.push(d.data()));
      fechedPosts.sort((a, b) => a.addedTime.seconds - b.addedTime.seconds);

      setPosts(fechedPosts.reverse());
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <Box
      sx={{
        border: "1px solid #e2e2e2",
        borderRadius: "10px",
        padding: 1,
      }}
    >
      {!!posts.length ? (
        posts?.map((post, index) => (
          <Card key={index} sx={{ marginBottom: 1, paddingX: 2 }}>
            <Link
              to={`/profile/${post.author.id}`}
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
                <span style={{ fontSize: 14 }}>{post.author.name}</span>
                <span style={{ fontSize: 14, opacity: "0.6" }}>
                  {post.createdAt}
                </span>
              </Box>
            </Link>

            <p>{post.content}</p>
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
        ))
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
