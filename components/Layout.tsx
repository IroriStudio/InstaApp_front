import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./templates/Header";
import Auth from "./organisms/Auth";
import EditProfile from "./organisms/EditProfileModal";
import NewPost from "./organisms/NewPostModal";

interface Props {
  children?: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Irostagram</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <EditProfile />
      <NewPost />
      <Auth />
      {children}
    </>
  );
};

export default Layout;
