import { DialogMessage } from "./../friends/index";
import { ReactNode } from "react";
import { RegisteredUser } from "../friends";

export type MessagesContextProviderTypes = {
  continueDialogWithUser: (uid: string, message: string) => void;
  startDialogWithUser: (uid: string, message: string) => void;
  fetchMessages: (uid: string) => void;
  findDialogUser: (uid: string) => void;
  dialogCompanion: RegisteredUser;
  isIHaveDialog: boolean;
  messages: DialogMessage[] | null;
};

export type MessagesContextProviderProps = {
  children: ReactNode;
};
