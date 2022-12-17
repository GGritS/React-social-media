import { createContext, FC, useContext, useMemo, useState } from "react";
import { RegisteredUser } from "../friends";
import { UserContextProviderProps, UserContextType } from "./type";

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
  user,
  users,
}) => {
  // const [user] = useState<RegisteredUser>(initialUser);
  // const [users] = useState<RegisteredUser[]>(initialUsers);
  const value = useMemo(() => {
    return { user, users };
  }, [user, users]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
