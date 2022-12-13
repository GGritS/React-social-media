import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, FC, useContext, useState } from "react";
import {
  FriendsContextProviderTypes,
  FriendsContextProviderProps,
  RegisteredUser,
} from ".";
import { db } from "../../firebase";
import { useAuth } from "../auth/AuthContext";

const FriendsContext = createContext<FriendsContextProviderTypes>(
  {} as FriendsContextProviderTypes
);

export const FriendsContextProvider: FC<FriendsContextProviderProps> = ({
  children,
}) => {
  const { user: firebaseUser } = useAuth();

  const [registeredCurrentUser, setRegisteredCurrentUser] = useState<
    RegisteredUser | undefined
  >(undefined);
  const [users, setUsers] = useState<RegisteredUser[]>([] as RegisteredUser[]);

  const fetchUsers = () => {
    const unsub = onSnapshot(collection(db, "users"), (doc) => {
      const users = doc.docs.map((d: any) => d.data()) as RegisteredUser[];
      const usersWithoutCurrent = users.filter(
        (u) => firebaseUser.uid !== u.uid
      );
      const currentUser = users.filter((u) => firebaseUser.uid === u.uid);
      setUsers(usersWithoutCurrent);
      setRegisteredCurrentUser(currentUser[0]);
    });

    return () => {
      unsub();
    };
  };

  const handleFollow = async (userId: string, userSubscribers: string[]) => {
    if (!registeredCurrentUser) return;
    const updateUserSubscribers = doc(db, "users", userId);
    const updateMyFollows = doc(db, "users", registeredCurrentUser.uid);
    if (
      registeredCurrentUser.subscribed.includes(userId) ||
      userSubscribers.includes(registeredCurrentUser.uid)
    ) {
      return "";
    }

    await updateDoc(updateUserSubscribers, {
      subscribers: [...userSubscribers, registeredCurrentUser.uid],
    });
    await updateDoc(updateMyFollows, {
      subscribed: [...registeredCurrentUser.subscribed, userId],
    });
  };

  const handleUnsubscribe = async (
    userId: string,
    userSubscribers: string[]
  ) => {
    if (!registeredCurrentUser) return;
    const updateUserSubscribers = doc(db, "users", userId);
    const updateMyFollows = doc(db, "users", registeredCurrentUser.uid);

    const filteredUserSubscribers = userSubscribers.filter(
      (subscribersUserId) => subscribersUserId !== registeredCurrentUser.uid
    );
    const filteredFollows = registeredCurrentUser.subscribed.filter(
      (followsUsersId) => followsUsersId !== userId
    );

    await updateDoc(updateUserSubscribers, {
      subscribers: filteredUserSubscribers,
    });
    await updateDoc(updateMyFollows, {
      subscribed: filteredFollows,
    });
  };

  const value: FriendsContextProviderTypes = {
    fetchUsers,
    users,
    registeredCurrentUser,
    handleFollow,
    handleUnsubscribe,
  };
  return (
    <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>
  );
};

// TODO: name it useFriendsContext

export const useFriends = () => {
  return useContext(FriendsContext);
};
