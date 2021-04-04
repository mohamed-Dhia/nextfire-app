import firebase from "firebase";
import type { Post } from "components/PostFeed.component";

export type PostDoc = firebase.firestore.DocumentData &
  Post & {
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  };

const postToJson = (
  doc: firebase.firestore.QueryDocumentSnapshot<PostDoc>
): Post => {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
};

export default postToJson;
