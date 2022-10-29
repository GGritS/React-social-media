import { UserMetadata } from "firebase/auth";
import { ReactNode } from "react";

export type FriendsContextProviderTypes = {
  fetchUsers: () => void;
  registeredUser?: RegisteredUser;
};

export type FriendsContextProviderProps = {
  children: ReactNode;
};

export type RegisteredUser = {
  uid: string;
  displayName: string;
  phoneNumber: string | null;
  photoURL: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: string | null;
  metadata: UserMetadata;
  providerId: string | null;
  friends: any;
  dialogs: any;
  age: number | null;
  navigation: {
    country: string | null;
    city: string | null;
  };
  status: string | null;
};
