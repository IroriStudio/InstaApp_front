import { GetStaticProps } from "next";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import Main from "../components/templates/Main";

import { store } from "../stores";
import { getAllPosts } from "../utils/post";

const IndexPage = () => {
  return <Main />;
};

export default IndexPage;
