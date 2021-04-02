import React, {
  FC,
  FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import debounce from "lodash.debounce";
import { auth, firestore, googleAuthProvider } from "@libs/firebase.utils";
import UserContext from "../libs/User.contex";

const UserNameMessage: FC<{
  username: string;
  isValid: boolean;
  loading: boolean;
}> = ({ isValid, loading, username }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  }
  if (username && !isValid) {
    return <p className="text-danger">That username is taken!!</p>;
  }
  return <p />;
};

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

const SignOutButton: FC = () => (
  <button onClick={auth.signOut} type="button">
    Sign Out
  </button>
);

const UserNameForm: FC = () => {
  const [formValue, setFormValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const { user, username } = useContext(UserContext);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    const val = value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`username/${username}`);
        const { exists } = await ref.get();
        // eslint-disable-next-line no-console
        console.log("firesote read!!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue, checkUsername]);

  const onsubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onsubmit}>
          <input
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UserNameMessage
            isValid={isValid}
            username={formValue}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>
        </form>
        <h3>Debug</h3>
        <div>
          Username : {formValue}
          <br />
          Loading : {loading.toString()}
          <br />
          Username Valid : {isValid.toString()}
        </div>
      </section>
    )
  );
};

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
