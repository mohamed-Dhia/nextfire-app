/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { SubmitHandler, use } from "react-hook-";
import ReactMarkdown from "react-markdown";
import styles from "@styles/Admin.module.css";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  DocumentData,
  DocumentReference,
  serverTimestamp,
} from "../libs/firebase.utils";
import { PostDoc } from "../libs/postToJson.utils";
import ImageUploader from "./ImageUploader.component";

type Values = {
  content: string;
  published: boolean;
};

const Post: FC<{
  defaultValues: PostDoc;
  postRef: DocumentReference<DocumentData>;
  preview: boolean;
}> = ({ defaultValues, postRef, preview }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm<Values>({
    defaultValues,
    mode: "onChange",
  });

  const updatePost: SubmitHandler<Values> = async ({ content, published }) => {
    await postRef.update({ content, published, updatedAt: serverTimestamp() });
    reset({ content, published });
    toast.success("Post Updated Successfully");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      <ImageUploader />
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}
      <div className={preview ? styles.hidden : styles.controls}>
        <textarea
          {...register("content", {
            maxLength: { value: 20000, message: "content is too long" },
            minLength: { value: 10, message: "content is too short" },
            required: { value: true, message: "content is required" },
          })}
        />
        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}
        <fieldset>
          <input
            className={styles.checkbox}
            type="checkbox"
            {...register("published")}
          />
          <label>Published</label>
        </fieldset>
        <button
          type="submit"
          className="btn-green"
          disabled={!(isValid && isDirty)}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Post;
