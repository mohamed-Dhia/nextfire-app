import React, { FC } from "react";
import { auth } from "../libs/firebase.utils";

const SignOutButton: FC = () => (
  <button onClick={() => auth.signOut()} type="button">
    Sign Out
  </button>
);

export default SignOutButton;
