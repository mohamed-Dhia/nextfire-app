import firebase from "firebase/app";
import { firestore } from "./firebase.utils";
import { User } from "./User.contex";

export type UserDoc = User & firebase.firestore.DocumentData;

const getUserByUsername = async (
  username: string
): Promise<firebase.firestore.QueryDocumentSnapshot<UserDoc>> => {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc as firebase.firestore.QueryDocumentSnapshot<UserDoc>;
};

export default getUserByUsername;
