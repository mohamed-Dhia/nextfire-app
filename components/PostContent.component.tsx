import { PostDoc } from "@libs/postToJson.utils";
import Link from "next/link";
import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import { IPost } from "./PostFeed.component";

const PostContent: FC<{ post: PostDoc | IPost }> = ({
  post: { content, username, title, createdAt: oldCreatedAt },
}) => {
  const createdAt =
    typeof oldCreatedAt === "number"
      ? new Date(oldCreatedAt)
      : oldCreatedAt.toDate();

  return (
    <div className="card">
      <h1>{title}</h1>
      <span className="text-sm">
        Written by
        <Link href={`/${username}`}>
          <a className="text-info">@{username}</a>
        </Link>
        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default PostContent;
