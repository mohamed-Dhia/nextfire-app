import type { IPost } from "@components/PostFeed.component";
import type {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "./firebase.utils";

export type PostDoc = DocumentData &
  IPost & {
    createdAt: Timestamp;
    updatedAt: Timestamp;
  };

const postToJson = (doc: QueryDocumentSnapshot<PostDoc>): IPost => {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
};

export default postToJson;
