import Link from "next/link";
import React, { FC } from "react";
import { IPost } from "./PostFeed.component";

const PostItem: FC<{ post: IPost; admin: boolean }> = ({
  post: { content, heartCount, username, slug, title },
  admin = false,
}) => {
  const wordCount = content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <Link href={`/${username}`}>
        <a>
          <strong>By @{username}</strong>
        </a>
      </Link>
      <Link href={`/${username}/${slug}`}>
        <h2>
          <a>{title}</a>
        </h2>
      </Link>
      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span> 💗 {heartCount} hearts</span>
      </footer>
    </div>
  );
};

export default PostItem;
