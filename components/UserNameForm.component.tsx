import checkUsername, { CheckUsernameProps } from "@libs/checkUsername.util";
import { firestore } from "@libs/firebase.utils";
import UserContext from "@libs/User.contex";
import debounce from "lodash.debounce";
import React, {
  FC,
  FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import UserNameMessage from "./UserNameMessage.component";

const UserNameForm: FC = () => {
  const { user, username } = useContext(UserContext);

  const [formValue, setFormValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const debounceCheckUsername = useCallback(
    (checkUsernameProps: CheckUsernameProps) =>
      debounce(checkUsername, 500)(checkUsernameProps),
    []
  );

  useEffect(() => {
    debounceCheckUsername({ username: formValue, setIsValid, setLoading });
  }, [formValue, debounceCheckUsername]);

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

  const onsubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);
    await firestore
      .batch()
      .set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      })
      .set(usernameDoc, { uid: user.uid })
      .commit();
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

export default UserNameForm;
