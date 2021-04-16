import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import Loader from "../components/Loder.component";
import PostFeed, { IPost } from "../components/PostFeed.component";
import { firestore, fromMillis } from "../libs/firebase.utils";
import postToJson from "../libs/postToJson.utils";

const LIMIT = 1;

type HomeProps = {
  posts: IPost[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJson);

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<HomeProps> = ({ posts: serverPosts }) => {
  const [posts, setPosts] = useState(serverPosts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);

    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map(postToJson);

    setPosts((oldPosts) => [...oldPosts, ...newPosts]);
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} admin={false} />

      {!loading && !postsEnd && (
        <button type="button" onClick={getMorePosts}>
          Load More
        </button>
      )}

      <Loader show={loading} />

      {postsEnd && "You Have Reached The End"}
    </main>
  );
};

export default Home;
