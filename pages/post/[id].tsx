import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostById } from "../../utils/post";
import { useSelector } from "react-redux";
import { selectProfile } from "../../stores/slices/authSlice";

const Post = ({ post }: any) => {
  const profile = useSelector(selectProfile);
  console.log(profile);
  return (
    <>
      <div>{post.title}</div>
      <div>{post.created_on}</div>
    </>
  );
};
export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { post } = await getPostById(params.id);

  return {
    props: { post },
    revalidate: 1,
  };
};
