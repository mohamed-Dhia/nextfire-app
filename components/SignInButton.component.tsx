import React, { FC } from "react";
import { auth, googleAuthProvider } from "../libs/firebase.utils";

const SignInButton: FC = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <button type="button" className="btn-google" onClick={signInWithGoogle}>
      <img src="/google_PNG.png" alt="google" />
      Sign In With Google
    </button>
  );
};

export default SignInButton;
