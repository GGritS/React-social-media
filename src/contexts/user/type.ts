import { ReactNode } from "react";
import { RegisteredUser } from "../friends";
export type UserContextProviderProps = {
  children: ReactNode;
  user: RegisteredUser;
  users: RegisteredUser[];
};

export type UserContextType = {
  user: RegisteredUser;
  users: RegisteredUser[];
};
