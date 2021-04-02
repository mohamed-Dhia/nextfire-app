import { createContext } from "react";

export interface IUserContex {
  user: firebase.default.User;
  username: string;
}

const UserContext = createContext<IUserContex>({
  user: null,
  username: null,
});

export default UserContext;
