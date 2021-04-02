import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase.utils";
import { IUserContex } from "./User.contex";

const useUserData = (): IUserContex => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<string>(null);

  useEffect(() => {
    let unsubscribe: () => void;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => setUsername(doc.data()?.username));
    } else setUsername(null);

    return unsubscribe;
  }, [user]);
  return { user, username };
};

export default useUserData;
