import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import styles from "@styles/Admin.module.css";
import Link from "next/link";
import { auth, firestore } from "../libs/firebase.utils";
import { PostDoc } from "../libs/postToJson.utils";
import PostForm from "./PostForm.component";

const PostManager: FC = () => {
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts")
    .doc(slug as string);
  const [post] = useDocumentData<PostDoc>(postRef);
  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>
            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>
          <aside>
            <h3>Tools</h3>
            <button type="button" onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button type="button" className="btn-blue">
                Live View
              </button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
};

export default PostManager;
