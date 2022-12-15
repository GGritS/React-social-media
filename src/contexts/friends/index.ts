import { UserMetadata } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

export type FriendsContextProviderTypes = {
  fetchUsers: () => void;
  registeredCurrentUser: RegisteredUser | undefined;
  users: RegisteredUser[];
  handleFollow: (userId: string, userSubscribers: string[]) => void;
  handleUnsubscribe: (userId: string, userSubscribers: string[]) => void;
};

export type FriendsContextProviderProps = {
  children: ReactNode;
};

export type RegisteredUser = {
  uid: string;
  displayName: string;
  age: number | null;
  status: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: string | null;
  metadata: UserMetadata;
  providerId: string | null;
  navigation: {
    country: string | null;
    city: string | null;
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
