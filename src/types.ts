import { Timestamp } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface IUser {
  id: string;
  avatar: string | null;
  name: string | null;
}

export interface IPost {
  author: IUser;
  createdAt: string;
  content: string;
  addedTime: Timestamp;
}
