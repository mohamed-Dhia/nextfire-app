import { firestore } from "./firebase.utils";

const checkUsername = async (
  username: string,
  setIsValid: (value: React.SetStateAction<boolean>) => void,
  setLoading: (value: React.SetStateAction<boolean>) => void
): Promise<void> => {
  if (username.length >= 3) {
    const ref = firestore.doc(`username/${username}`);
    const { exists } = await ref.get();
    // eslint-disable-next-line no-console
    console.log("firesote read!!");
    setIsValid(!exists);
    setLoading(false);
  }
};

export default checkUsername;
