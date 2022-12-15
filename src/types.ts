import { Timestamp } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface IUser {
  id: string;
  avatar: string | null;
  name: string;
}

export interface IPost {
  author: IUser;
  content: string;
  addedTime: Timestamp;
}
