import { TextField } from "@mui/material";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { FC, KeyboardEvent, useState } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { db } from "../../../firebase";

export const AddPost: FC = () => {
  const [content, setContent] = useState<string>("");
  const { user } = useAuth();

  const AddPostHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (content === "") return null;
      try {
        await addDoc(collection(db, "posts"), {
          author: {
            id: user.uid,
            avatar: "ss",
            name: user.displayName,
          },
          content,
          addedTime: await Timestamp.now(),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setContent("");
    }
  };

  return (
    // <Box sx={{ border: "1px solid #ccc", paddingX: 2 }}>
    <TextField
      id="add-post"
      label="Add post"
      variant="outlined"
      margin="normal"
      onKeyPress={AddPostHandler}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      //   sx={{ padding: 0 }}
      fullWidth
    />
    // </Box>
  );
};
