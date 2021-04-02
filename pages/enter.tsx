import React, { FC, useContext } from "react";
import SignInButton from "../components/SignInButton.component";
import SignOutButton from "../components/SignOutButton.component";
import UserNameForm from "../components/UserNameForm.component";
import UserContext from "../libs/User.contex";

const EnterPage: FC = () => {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {
        // eslint-disable-next-line no-nested-ternary
        user ? (
          !username ? (
            <UserNameForm />
          ) : (
            <SignOutButton />
          )
        ) : (
          <SignInButton />
        )
      }
    </main>
  );
};

export default EnterPage;
