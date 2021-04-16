import { GetServerSideProps, NextPage } from "next";
import React from "react";
import PostFeed, { IPost } from "../../components/PostFeed.component";
import UserProfile from "../../components/UserProfile.component";
import getUserByUsername from "../../libs/getUserByUsername.utils";
import postToJson from "../../libs/postToJson.utils";
import { User } from "../../libs/User.contex";

type UserProfilePageProps = { user: User; posts: IPost[] };

export const getServerSideProps: GetServerSideProps<
  UserProfilePageProps,
  { username: string }
> = async ({ params }) => {
  const { username } = params;
  const userDoc = await getUserByUsername(username as string);

  let user: User = null;
  let posts: IPost[] = null;

  if (userDoc) {
    user = userDoc.data();
    const postQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);
    posts = (await postQuery.get()).docs.map(postToJson);
  }

  return {
    props: {
      user,
      posts,
    },
  };
};

const UserProfilePage: NextPage<UserProfilePageProps> = ({ posts, user }) => (
  <main>
    <UserProfile user={user} />
    <PostFeed posts={posts} admin={false} />
  </main>
);

export default UserProfilePage;
