import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./templates/Header";
import Auth from "./organisms/Auth";
import EditProfile from "./organisms/EditProfileModal";
import NewPost from "./organisms/NewPostModal";

interface Props {
  children?: ReactNode;
  title: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
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
