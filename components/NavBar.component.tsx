import React, { FC, useContext } from "react";
import Link from "next/link";
import UserContext from "../libs/User.contex";

const NavBar: FC = () => {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button type="button" className="btn-logo">
              FEED
            </button>
          </Link>
        </li>
        {username ? (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button type="button" className="btn-blue">
                  Write Posts
                </button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} alt="user pfp" />
              </Link>
            </li>
          </>
        ) : (
          <>
            <Link href="/enter">
              <button type="button" className="btn-blue">
                Log in
              </button>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
