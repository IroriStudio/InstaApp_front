import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { Grid } from "@mui/material";
import { AvatarGroup } from "@material-ui/lab";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostById } from "../../utils/post";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncGetMyProf,
  selectProfile,
} from "../../stores/slices/authSlice";

import {
  selectPosts,
  setPost,
  selectPost,
  fetchAsyncPatchLiked,
} from "../../stores/slices/postSlice";
import GoodButton from "../../components/atoms/GoodButton";
import PostMenu from "../../components/molecules/PostMenu";
import { PROPS_POST } from "../../stores/types";
import { AppDispatch } from "../../stores";

const Post = ({ fetchedPost }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const post = useSelector(selectPost);
  useEffect(() => {
    dispatch(setPost(fetchedPost));
    dispatch(fetchAsyncGetMyProf());
    // console.log("fetchedPost", fetchedPost);
    // console.log("post", post);
  }, []);

  const profile = useSelector(selectProfile);
  const { id, title, userPost, created_on, img, liked } = post;
  const loginId = profile.userProfile;
  const onClickLiked = async () => {
    const packet = {
      id: id,
      title: title,
      current: liked,
      new: loginId,
    };
    console.log(packet);
    await dispatch(fetchAsyncPatchLiked(packet));
  };
  return (
    <div>
      <div>{title}</div>
      <GoodButton
        onClickLiked={onClickLiked}
        checked={liked.some((like) => like === loginId)}
      />

      <div>{liked.some((like) => like === loginId) ? "true" : "false"}</div>
    </div>
  );
};
export default Post;
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { post } = await getPostById(params.id);

  return {
    props: { fetchedPost: post },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};
