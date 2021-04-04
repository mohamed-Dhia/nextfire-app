import React, { FC } from "react";
import PostItem from "./PostItem.component";

export interface Post {
  content: string;
  slug: string;
  uid: string;
  username: string;
  createdAt: number;
  updatedAt: number;
  heartCount: number;
  published: boolean;
  title: string;
}

const PostFeed: FC<{ posts: Post[]; admin: boolean }> = ({ admin, posts }) => (
  <>
    {posts &&
      posts.map((post) => (
        <PostItem key={post.slug} post={post} admin={admin} />
      ))}
  </>
);

export default PostFeed;
