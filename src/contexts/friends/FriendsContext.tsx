import { doc, getDoc } from "firebase/firestore";
import { createContext, FC, useContext, useEffect, useState } from "react";
import {
  FriendsContextProviderTypes,
  FriendsContextProviderProps,
  RegisteredUser,
} from ".";
import { db } from "../../firebase";

const FriendsContext = createContext<FriendsContextProviderTypes>(
  {} as FriendsContextProviderTypes
);

export const FriendsContextProvider: FC<FriendsContextProviderProps> = ({
  children,
}) => {
  const [friends, setFriends] = useState();
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser[]>(
    [] as RegisteredUser[]
  );

  const fetchUsers = async () => {
    const docSnap = await getDoc(doc(db, "users", "SF"));
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const value: FriendsContextProviderTypes = {
    fetchUsers,
  };
  return (
    <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>
  );
};

export const useFriends = () => {
  return useContext(FriendsContext);
};
