import { User } from "firebase/auth";
import { ReactNode, SyntheticEvent } from "react";

export type AuthContextProviderTypes = {
  user: User;
  setIsRegForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  regOrLoginError: any;
  isUserLogined: boolean;
};

export type IAuthContextProviderProps = {
  children: ReactNode;
};

export type UserData = {
  email: string;
  password: string;
  name: string;
};
