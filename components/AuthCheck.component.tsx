import Link from "next/link";
import React, { FC, ReactNode, useContext } from "react";
import UserContext from "../libs/User.contex";

const AuthCheck: FC<{ fallback?: ReactNode }> = ({ fallback, children }) => {
  const { username } = useContext(UserContext);
  return (
    <>
      {username
        ? children
        : fallback || <Link href="/enter">You must be signed in</Link>}{" "}
    </>
  );
};

export default AuthCheck;
