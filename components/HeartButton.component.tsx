import React, { FC } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  auth,
  DocumentData,
  DocumentReference,
  firestore,
  increment,
} from "../libs/firebase.utils";

const HeartButton: FC<{ postRef: DocumentReference<DocumentData> }> = ({
  postRef,
}) => {
  const heartRef = postRef.collection("hearts").doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    const { uid } = auth.currentUser;
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  const removeHeart = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return heartDoc?.exists ? (
    <button type="button" onClick={removeHeart}>
      💔 unheart
    </button>
  ) : (
    <button type="button" onClick={addHeart}>
      💖 heart
    </button>
  );
};

export default HeartButton;
