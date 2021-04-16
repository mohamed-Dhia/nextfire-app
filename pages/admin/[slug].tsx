import React, { FC } from "react";
import AuthCheck from "../../components/AuthCheck.component";
import PostManager from "../../components/PostManager.component";

const AdminPostEdit: FC = () => (
  <AuthCheck>
    <PostManager />
  </AuthCheck>
);

export default AdminPostEdit;
