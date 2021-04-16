import {
  DocumentData,
  firestore,
  QueryDocumentSnapshot,
} from "./firebase.utils";
import { User } from "./User.contex";

export type UserDoc = User & DocumentData;

const getUserByUsername = async (
  username: string
): Promise<QueryDocumentSnapshot<UserDoc>> => {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc as QueryDocumentSnapshot<UserDoc>;
};

export default getUserByUsername;
