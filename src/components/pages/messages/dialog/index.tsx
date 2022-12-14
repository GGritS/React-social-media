import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DialogHeader } from "./dialogHeader";
import { Message } from "./message";
import { useMessages } from "../../../../contexts/messages/MessagesContext";
import { useUserContext } from "../../../../contexts/user";

export const Dialog: FC = () => {
  const [message, setMessage] = useState<string>("");
  const { id: uid } = useParams();

  const { user: currentUser } = useUserContext();
  const {
    continueDialogWithUser,
    dialogCompanion,
    fetchMessages,
    findDialogUser,
    startDialogWithUser,
    isIHaveDialog,
    messages,
  } = useMessages();
  const { users } = useUserContext();

  const handleSandMessage = () => {
    if (message === "" || !uid) return;
    if (isIHaveDialog) continueDialogWithUser(uid, message);
    else startDialogWithUser(uid, message);

    setMessage("");
  };

  useEffect(() => {
    if (uid === undefined) return;
    findDialogUser(uid);
    fetchMessages(uid);

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
              {messages && !!currentUser ? (
                messages.map((message, index) => (
                  <Message
                    key={`${message.messageId}_${index}`}
                    isMyMessage={message.senderId === currentUser.uid}
                    sendedAt={message.sendTime}
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
