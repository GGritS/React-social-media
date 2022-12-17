import { UserMetadata } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

export type FriendsContextProviderTypes = {
  fetchUsers: () => void;
  registeredCurrentUser: RegisteredUser | undefined;
  handleFollow: (
    userId: string,
    userSubscribers: string[],
    currentUser: RegisteredUser
  ) => void;
  handleUnsubscribe: (
    userId: string,
    userSubscribers: string[],
    currentUser: RegisteredUser
  ) => void;
};

export type FriendsContextProviderProps = {
  children: ReactNode;
};

type Nullable<T> = T | null;

export type RegisteredUser = {
  uid: string;
  displayName: string;
  age: Nullable<number>;
  status: Nullable<string>;
  phoneNumber: Nullable<string>;
  photoURL: Nullable<string>;
  email: Nullable<string>;
  emailVerified: boolean;
  isAnonymous: Nullable<string>;
  metadata: UserMetadata;
  providerId: Nullable<string>;
  navigation: {
    country: Nullable<string>;
    city: Nullable<string>;
  };
  subscribers: string[];
  subscribed: string[];
  dialogs: UserDialogs[];
};

export type UserDialogs = {
  companionId: string;
  messages: DialogMessage[];
};

export type DialogMessage = {
  messageId: string;
  senderId: string;
  message: string;
  sendTime: Timestamp;
};
