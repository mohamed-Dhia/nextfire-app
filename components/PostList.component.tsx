import React, { FC } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../libs/firebase.utils";
import PostFeed, { IPost } from "./PostFeed.component";

const PostList: FC = () => {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  const query = ref.orderBy("createdAt");
  const [querySnapShot] = useCollection<IPost>(query);

  const posts = querySnapShot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
};

export default PostList;
