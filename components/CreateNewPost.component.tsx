import styles from "@styles/Admin.module.css";
import kebabCase from "lodash.kebabcase";
import { useRouter } from "next/router";
import React, { FC, FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import { auth, firestore, serverTimestamp } from "../libs/firebase.utils";
import UserContext from "../libs/User.contex";
import { IPost } from "./PostFeed.component";

const CreateNewPost: FC = () => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);

    const data: IPost = {
      uid,
      title,
      slug,
      username,
      published: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      content: "Hello World",
      heartCount: 0,
    };

    await ref.set(data);

    toast.success("Post Created");

    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
        placeholder="My Awesome Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug :</strong> {slug}
        <button type="submit" disabled={!isValid} className="btn-green">
          Create New Post
        </button>
      </p>
    </form>
  );
};

export default CreateNewPost;
