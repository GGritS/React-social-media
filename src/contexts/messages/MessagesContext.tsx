import { createContext, FC, useContext } from "react";
import { MessagesContextProviderProps, MessagesContextProviderTypes } from ".";

const MessagesContext = createContext<MessagesContextProviderTypes>(
  {} as MessagesContextProviderTypes
);

export const MessagesContextProvider: FC<MessagesContextProviderProps> = ({
  children,
}) => {
  const value: MessagesContextProviderTypes = {};
  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  return useContext(MessagesContext);
};
