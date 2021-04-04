import { createContext } from "react";

export type User = firebase.default.User & { username: string };
export interface IUserContex {
  user: User;
  username: string;
}

const UserContext = createContext<IUserContex>({
  user: null,
  username: null,
});

export default UserContext;
