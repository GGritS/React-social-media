import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { collection, onSnapshot } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { db } from "../../../firebase";
import { IPost } from "../../../types";
import { Post } from "./Post";

export const Posts: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (doc) => {
      const fechedPosts = doc.docs.map((d) => d.data()) as IPost[];
      fechedPosts.sort((a, b) => a?.addedTime?.seconds - b?.addedTime?.seconds);
      console.log(fechedPosts);

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
      {posts.length ? (
        posts?.map((post, index) => (
          <Post
            key={`${post.author.id}_${index}`}
            id={post.author.id}
            name={post.author.name}
            createdAt={post.addedTime}
          >
            {post.content}
          </Post>
        ))
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
};
