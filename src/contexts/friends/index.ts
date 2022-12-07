import { UserMetadata } from "firebase/auth";
import { ReactNode } from "react";

export type FriendsContextProviderTypes = {
  fetchUsers: () => void;
  registeredCurrentUser: RegisteredUser;
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
  dialogs: any;
};
