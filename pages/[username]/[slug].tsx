import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import styles from "@styles/Post.module.css";
import { IPost } from "@components/PostFeed.component";
import Link from "next/link";
import {
  firestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "../../libs/firebase.utils";
import getUserByUsername from "../../libs/getUserByUsername.utils";
import postToJson, { PostDoc } from "../../libs/postToJson.utils";
import PostContent from "../../components/PostContent.component";
import AuthCheck from "../../components/AuthCheck.component";
import HeartButton from "../../components/HeartButton.component";

type PostProps = { post: IPost; path: string };

export const getStaticProps: GetStaticProps<
  PostProps,
  { username: string; slug: string }
> = async ({ params: { slug, username } }) => {
  const userDoc = await getUserByUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let post: IPost = null;
  let path: string = null;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJson((await postRef.get()) as QueryDocumentSnapshot<PostDoc>);
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = (await firestore
    .collectionGroup("posts")
    .get()) as QuerySnapshot<PostDoc>;

  const paths = snapshot.docs.map((doc) => {
    const { username, slug } = doc.data();
    return { params: { slug, username } };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

const Post: NextPage<PostProps> = ({ path, post: serverPost }) => {
  const postRef = firestore.doc(path);
  const [realtimePost] = useDocumentData<PostDoc>(postRef);

  const post = realtimePost || serverPost;

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>
      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 💗</strong>
        </p>
        <AuthCheck
          fallback={
            <Link href="/enter">
              <button type="button">💖 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
      </aside>
    </main>
  );
};

export default Post;
