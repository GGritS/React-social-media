import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { createContext, FC, useContext, useState } from "react";
import { MessagesContextProviderProps, MessagesContextProviderTypes } from ".";
import { db } from "../../firebase";
import { DialogMessage, RegisteredUser } from "../friends";
import { useUserContext } from "../user";

const MessagesContext = createContext<MessagesContextProviderTypes>(
  {} as MessagesContextProviderTypes
);

export const MessagesContextProvider: FC<MessagesContextProviderProps> = ({
  children,
}) => {
  const { users, user: currentUser } = useUserContext();

  const [dialogCompanion, setDialogCompanion] = useState<RegisteredUser>(
    {} as RegisteredUser
  );
  const [isIHaveDialog, setIsIHaveDialog] = useState<boolean>(false);
  const [messages, setMessages] = useState<DialogMessage[] | null | []>(null);

  function findDialogUser(uid: string) {
    const companion = users.filter((user) => user.uid === uid);

    setDialogCompanion(companion[0]);
  }

  const fetchMessages = async (uid: string) => {
    if (uid && !!currentUser) {
      // findDialogUser(uid);
      const usersIdInDialogs = currentUser.dialogs.map(
        (dialog) => dialog.companionId
      );
      const isIhaveDialogConst = usersIdInDialogs.includes(uid);
      setIsIHaveDialog(usersIdInDialogs.includes(uid));
      if (isIhaveDialogConst) {
        const myDialogs = currentUser.dialogs;
        const currentDialogs = myDialogs.filter(
          (dialog) => dialog.companionId === uid
        );

        setMessages(currentDialogs[0].messages);
      } else setMessages([]);
    }
  };

  const startDialogWithUser = async (uid: string, message: string) => {
    if (!currentUser || !uid || !messages) return;

    const updateUserDialogs = doc(db, "users", uid);
    const updateMyDialogs = doc(db, "users", currentUser.uid);
    const myDialogs = currentUser.dialogs.filter(
      (dialog) => dialog.companionId !== uid
    );
    const userDialogs = dialogCompanion.dialogs.filter(
      (dialog) => dialog.companionId !== currentUser.uid
    );
    const currentTime = await Timestamp.now();

    await updateDoc(updateUserDialogs, {
      dialogs: [
        ...userDialogs,
        {
          companionId: currentUser.uid,
          messages: [
            {
              messageId: "0",
              message,
              senderId: currentUser.uid,
              sendTime: currentTime,
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
              senderId: currentUser.uid,
              sendTime: currentTime,
            } as DialogMessage,
          ],
        },
      ],
    });
  };
  const continueDialogWithUser = async (uid: string, message: string) => {
    if (!currentUser || !uid || !messages) return;
    const updateUserDialogs = doc(db, "users", uid);
    const updateMyDialogs = doc(db, "users", currentUser.uid);

    const usersIdInDialogs = currentUser.dialogs.map(
      (dialog) => dialog.companionId
    );

    const dialogCompanionIndex = usersIdInDialogs.indexOf(uid);

    const myDialogs = currentUser.dialogs.filter(
      (dialog) => dialog.companionId !== uid
    );
    const userDialogs = dialogCompanion.dialogs.filter(
      (dialog) => dialog.companionId !== currentUser.uid
    );

    const currentTime = await Timestamp.now();

    await updateDoc(updateUserDialogs, {
      dialogs: [
        ...userDialogs,
        {
          companionId: currentUser.uid,
          messages: [
            ...messages,
            {
              messageId: messages.length + 1,
              message,
              senderId: currentUser.uid,
              sendTime: currentTime,
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
              senderId: currentUser.uid,
              sendTime: currentTime,
            },
          ],
        },
      ],
    });
  };

  // useLayoutEffect(() => {
  // fetchUsers();
  // eslint-disable-next-line
  // }, []);

  const value: MessagesContextProviderTypes = {
    continueDialogWithUser,
    startDialogWithUser,
    fetchMessages,
    findDialogUser,
    dialogCompanion,
    isIHaveDialog,
    messages,
  };
  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  return useContext(MessagesContext);
};
