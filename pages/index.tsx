import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import {
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  setAuthModal,
} from "../stores/slices/authSlice";

import { fetchAsyncGetComments, setPosts } from "../stores/slices/postSlice";

import Post from "../components/templates/Post";
import { AppDispatch } from "../stores";
import { GetStaticProps } from "next";
import { getAllPosts } from "../utils/post";
import { PROPS_POST } from "../stores/types";
import { selectPosts } from "../stores/slices/postSlice";

interface Props {
  posts: PROPS_POST[];
}

const IndexPage: React.FC<Props> = ({ posts }) => {
  const dispatch: AppDispatch = useDispatch();
  const postsState = useSelector(selectPosts);

  useEffect(() => {
    const fetchBootLoader = async () => {
      dispatch(setAuthModal(false));
      await dispatch(fetchAsyncGetMyProf());
      await dispatch(setPosts(posts));
      await dispatch(fetchAsyncGetProfs());
      await dispatch(fetchAsyncGetComments());
    };
    fetchBootLoader();
  }, [dispatch]);
  console.log("posts4", posts[3].liked);
  console.log("postsState4", postsState[3]?.liked);
  return (
    <div>
      <Grid container spacing={4}>
        {postsState
          .slice(0)
          .reverse()
          .map((post) => (
            <Post key={post.id} post={post} />
          ))}
      </Grid>
    </div>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
