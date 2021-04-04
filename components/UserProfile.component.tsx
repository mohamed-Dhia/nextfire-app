import React, { FC } from "react";
import { User } from "../libs/User.contex";

const UserProfile: FC<{ user: User }> = ({ user }) => (
  <div className="box-center">
    <img className="card-img-center" src={user.photoURL} alt="pfp" />
    <p>
      <i>@{user.username}</i>
    </p>
    <h1>{user.displayName}</h1>
  </div>
);

export default UserProfile;
