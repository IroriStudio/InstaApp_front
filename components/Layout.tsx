import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./templates/Header";
import { Provider } from "react-redux";
import { store } from "../stores";
import Auth from "./organisms/Auth";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Irostagram</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Auth />
      {children}
    </>
  );
};

export default Layout;
