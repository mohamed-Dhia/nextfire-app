import React, { FC } from "react";

const UserNameMessage: FC<{
  username: string;
  isValid: boolean;
  loading: boolean;
}> = ({ isValid, loading, username }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  }
  if (username && !isValid) {
    return <p className="text-danger">That username is taken!!</p>;
  }
  return <p />;
};

export default UserNameMessage;
