import { firestore } from "./firebase.utils";

export interface CheckUsernameProps {
  username: string;
  setIsValid: (value: React.SetStateAction<boolean>) => void;
  setLoading: (value: React.SetStateAction<boolean>) => void;
}

const checkUsername = async ({
  setIsValid,
  setLoading,
  username,
}: CheckUsernameProps): Promise<void> => {
  if (username.length >= 3) {
    const ref = firestore.doc(`usernames/${username}`);
    const { exists } = await ref.get();
    // eslint-disable-next-line no-console
    console.log("firesote read!!");
    setIsValid(!exists);
    setLoading(false);
  }
};

export default checkUsername;
