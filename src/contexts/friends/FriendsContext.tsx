import { LinearProgress } from "@mui/material";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FriendsContextProviderTypes,
  FriendsContextProviderProps,
  RegisteredUser,
} from ".";
import { db } from "../../firebase";
import { useAuth } from "../auth/AuthContext";
import { UserContextProvider } from "../user";

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

  const fetchUsers = () => {
    const unsub = onSnapshot(collection(db, "users"), (doc) => {
      const users = doc.docs.map((d: any) => d.data()) as RegisteredUser[];

      const currentUser = users.filter((u) => firebaseUser.uid === u.uid);
      setRegisteredCurrentUser(currentUser[0]);
    });

    return () => {
      unsub();
    };
  };

  const handleFollow = async (
    userId: string,
    userSubscribers: string[],
    currentUser: RegisteredUser
  ) => {
    const updateUserSubscribers = doc(db, "users", userId);
    const updateMyFollows = doc(db, "users", currentUser.uid);
    if (
      currentUser.subscribed.includes(userId) ||
      userSubscribers.includes(currentUser.uid)
    )
      return "";
    else {
      await updateDoc(updateUserSubscribers, {
        subscribers: [...userSubscribers, currentUser.uid],
      });
      await updateDoc(updateMyFollows, {
        subscribed: [...currentUser.subscribed, userId],
      });
    }
  };

  const handleUnsubscribe = async (
    userId: string,
    userSubscribers: string[],
    currentUser: RegisteredUser
  ) => {
    if (!currentUser) return;
    const updateUserSubscribers = doc(db, "users", userId);
    const updateMyFollows = doc(db, "users", currentUser.uid);

    const filteredUserSubscribers = userSubscribers.filter(
      (subscribersUserId) => subscribersUserId !== currentUser.uid
    );
    const filteredFollows = currentUser.subscribed.filter(
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

type UserMiddlewareProps = {
  children: ReactNode;
};

export const UserMiddleware: FC<UserMiddlewareProps> = ({ children }) => {
  const [user, setUser] = useState<RegisteredUser>();
  const [users, setUsers] = useState<RegisteredUser[]>([] as RegisteredUser[]);

  const { user: firebaseUser, isUserLogined } = useAuth();

  useEffect(() => {
    if (!firebaseUser) return;
    const unsub = onSnapshot(collection(db, "users"), (doc) => {
      const users = doc.docs.map((d: any) => d.data()) as RegisteredUser[];
      const usersWithoutCurrent = users.filter(
        (u) => firebaseUser.uid !== u.uid
      );
      const currentUser = users.filter((u) => firebaseUser.uid === u.uid);
      setUsers(usersWithoutCurrent);
      setUser(currentUser[0]);
    });

    return () => {
      unsub();
    };
  }, [firebaseUser]);

  return (
    <>
      {isUserLogined ? (
        user ? (
          <UserContextProvider users={users} user={user}>
            {children}
          </UserContextProvider>
        ) : (
          <LinearProgress />
        )
      ) : (
        <>{children}</>
      )}
    </>
  );
};
