import { Box, CircularProgress } from "@mui/material";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { RegisteredUser } from "../../../contexts/friends";
import { db } from "../../../firebase";
import { UserCard } from "./UserCard";

export const Friends: FC = () => {
  const [users, setUsers] = useState<RegisteredUser[]>([] as RegisteredUser[]);
  // const [regUser, setRegUser] = useState<RegisteredUser>();
  const { user } = useAuth();

  // const uppdateUserInfo = async () => {
  //   const washingtonRef = doc(db, "users", user.uid);

  //   await updateDoc(washingtonRef, {
  //     ...regUser,
  //     navigation: {
  //       country: "Ukraine",
  //       city: null,
  //     },
  //   } as RegisteredUser);
  //   console.log("info was uppdated");
  // };

  const fetchUsers = () => {
    const unsub = onSnapshot(collection(db, "users"), (doc) => {
      doc.forEach((d) => console.log(d.data()));
      const users = doc.docs.map((d: any) => d.data()) as RegisteredUser[];
      const filteredUsers = users.filter((u) => user.uid !== u.uid);
      // const indexOfCurrentRegUser = users.findIndex((u) => u.uid === user.uid);
      setUsers(filteredUsers);
      // setRegUser(users[indexOfCurrentRegUser]);
    });

    return () => {
      unsub();
    };
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "86vh",
        overflow: "auto",
      }}
    >
      {users.length ? (
        users.map((user) => <UserCard key={user.uid} userInfo={user} />)
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
        </Box>
      )}
      {}
    </Box>
  );
};
