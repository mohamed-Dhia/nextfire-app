import React, { ChangeEventHandler, useState } from "react";
import { auth, STATE_CHANGED, storage } from "../libs/firebase.utils";
import Loader from "./Loder.component";

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("0");
  const [downloadURL, setDownloadURL] = useState<string>(null);

  const uploadFile: ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    const file = Array.from(files)[0];
    const extention = file.type.split("/")[1];
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extention}`
    );
    setUploading(true);
    const task = ref.put(file);
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);
      task
        .then(() => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url);
          setUploading(false);
        });
    });
  };

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}
      {!uploading && (
        <>
          <label className="btn">
            📸 Upload Img
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}
      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
};

export default ImageUploader;
