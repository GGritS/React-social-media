import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFriends } from "../../../../contexts/friends/FriendsContext";
import { DialogHeader } from "./dialogHeader";
import { Message } from "./message";
import { DialogMessage, RegisteredUser } from "../../../../contexts/friends";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

export const Dialog: FC = () => {
  const [dialogCompanion, setDialogCompanion] = useState<RegisteredUser>(
    {} as RegisteredUser
  );
  const [isIHaveDialog, setIsIHaveDialog] = useState<boolean>(false);
  const [messages, setMessages] = useState<DialogMessage[] | null | []>(null);

  const [message, setMessage] = useState<string>("");

  const { id: uid } = useParams();

  const { users, registeredCurrentUser, fetchUsers } = useFriends();

  const findDialogUser = async () => {
    const companion = users.filter((user) => user.uid === uid);

    return setDialogCompanion(companion[0]);
  };

  const fetchMessages = async () => {
    if (uid && !!registeredCurrentUser) {
      // SET [] in dialogs

      // await updateDoc(doc(db, "users", registeredCurrentUser.uid), {
      //   dialogs: [],
      // });

      findDialogUser();
      const usersIdInDialogs = registeredCurrentUser.dialogs.map(
        (dialog) => dialog.companionId
      );
      const isIhaveDialogConst = usersIdInDialogs.includes(uid);
      setIsIHaveDialog(usersIdInDialogs.includes(uid));
      if (isIhaveDialogConst) {
        const myDialogs = registeredCurrentUser.dialogs;
        const currentDialogs = myDialogs.filter(
          (dialog) => dialog.companionId === uid
        );

        setMessages(currentDialogs[0].messages);
      } else setMessages([]);
    }
  };

  const startDialogWithUser = async () => {
    if (!registeredCurrentUser || !uid || !messages) return;

    const updateUserDialogs = doc(db, "users", uid);
    const updateMyDialogs = doc(db, "users", registeredCurrentUser.uid);
    const myDialogs = registeredCurrentUser.dialogs.filter(
      (dialog) => dialog.companionId !== uid
    );
    const userDialogs = dialogCompanion.dialogs.filter(
      (dialog) => dialog.companionId !== registeredCurrentUser.uid
    );

    await updateDoc(updateUserDialogs, {
      dialogs: [
        ...userDialogs,
        {
          companionId: registeredCurrentUser.uid,
          messages: [
            {
              messageId: "0",
              message,
              senderId: registeredCurrentUser.uid,
              sendTime: "5m ago",
            } as DialogMessage,
          ],
        },
      ],
    });
    await updateDoc(updateMyDialogs, {
      dialogs: [
        ...myDialogs,
        {
          companionId: uid,
          messages: [
            {
              messageId: "0",
              message,
              senderId: registeredCurrentUser.uid,
              sendTime: "5m ago",
            } as DialogMessage,
          ],
        },
      ],
    });
  };

  const continueDialogWithUser = async () => {
    if (!registeredCurrentUser || !uid || !messages) return;
    const updateUserDialogs = doc(db, "users", uid);
    const updateMyDialogs = doc(db, "users", registeredCurrentUser.uid);

    const usersIdInDialogs = registeredCurrentUser.dialogs.map(
      (dialog) => dialog.companionId
    );

    const dialogCompanionIndex = usersIdInDialogs.indexOf(uid);

    const myDialogs = registeredCurrentUser.dialogs.filter(
      (dialog) => dialog.companionId !== uid
    );
    const userDialogs = dialogCompanion.dialogs.filter(
      (dialog) => dialog.companionId !== registeredCurrentUser.uid
    );

    await updateDoc(updateUserDialogs, {
      dialogs: [
        ...userDialogs,
        {
          companionId: registeredCurrentUser.uid,
          messages: [
            ...messages,
            {
              messageId: messages.length + 1,
              message,
              senderId: registeredCurrentUser.uid,
              sendTime: "5m ago",
            },
          ],
        },
      ],
    });
    await updateDoc(updateMyDialogs, {
      dialogs: [
        ...myDialogs,
        {
          companionId: usersIdInDialogs[dialogCompanionIndex],
          messages: [
            ...messages,
            {
              messageId: messages.length + 1,
              message,
              senderId: registeredCurrentUser.uid,
              sendTime: "5m ago",
            },
          ],
        },
      ],
    });
  };

  const handleSandMessage = () => {
    if (message === "") return;
    if (isIHaveDialog) continueDialogWithUser();
    else startDialogWithUser();

    setMessage("");
  };

  useLayoutEffect(() => {
    fetchUsers();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    findDialogUser();

    fetchMessages();
    //eslint-disable-next-line
  }, [users]);

  return (
    <>
      {dialogCompanion ? (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            backgroundColor: "#F1F7FA",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <DialogHeader
            name={dialogCompanion.displayName}
            id={dialogCompanion.uid}
            image={dialogCompanion.photoURL}
          />

          <Box
            sx={{
              width: "98%",
              marginX: "auto",
              height: "71vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "62vh",
                border: "1px solid black",
                borderRadius: "1rem",
                overflow: "auto",
              }}
            >
              {/* Messages */}
              {messages && !!registeredCurrentUser ? (
                messages.map((message, index) => (
                  <Message
                    key={`${message.messageId}_${index}`}
                    isMyMessage={message.senderId === registeredCurrentUser.uid}
                  >
                    {message.message}
                  </Message>
                ))
              ) : (
                <Box sx={{ textAlign: "center" }}>
                  <CircularProgress size={60} color="error" />
                </Box>
              )}

              {/* Messages */}
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "8vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <textarea
                style={{ resize: "none", width: "70%", height: "100%" }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <Button
                variant="contained"
                sx={{ width: "25%", height: "100%" }}
                onClick={() => handleSandMessage()}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
        </Box>
      )}
    </>
  );
};
