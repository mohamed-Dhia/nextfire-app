import React, { FC } from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar.component";
import "../styles/globals.css";
import UserContext from "../libs/User.contex";
import useUserData from "../libs/useUserData.hook";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { user, username } = useUserData();

  return (
    <UserContext.Provider value={{ user, username }}>
      <NavBar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
};

export default MyApp;
