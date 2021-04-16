import React, { FC } from "react";
import { FieldValue } from "../libs/firebase.utils";
import PostItem from "./PostItem.component";

export interface IPost {
  content: string;
  slug: string;
  uid: string;
  username: string;
  createdAt: number | FieldValue;
  updatedAt: number | FieldValue;
  heartCount: number;
  published: boolean;
  title: string;
}

const PostFeed: FC<{ posts: IPost[]; admin?: boolean }> = ({
  admin = false,
  posts,
}) => (
  <>
    {posts &&
      posts.map((post) => (
        <PostItem key={post.slug} post={post} admin={admin} />
      ))}
  </>
);

export default PostFeed;
