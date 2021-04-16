import { NextPage } from "next";
import React from "react";
import AuthCheck from "../../components/AuthCheck.component";
import CreateNewPost from "../../components/CreateNewPost.component";
import Metatags from "../../components/Metatags.component";
import PostList from "../../components/PostList.component";

const AdminPage: NextPage = () => (
  <main>
    <AuthCheck>
      <Metatags title="admin page" />
      <PostList />
      <CreateNewPost />
    </AuthCheck>
  </main>
);

export default AdminPage;
