import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import {
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  setAuthModal,
} from "../stores/slices/authSlice";

import {
  fetchAsyncGetComments,
  fetchAsyncGetPosts,
  selectPosts,
} from "../stores/slices/postSlice";

import Post from "../components/templates/Post";
import { AppDispatch } from "../stores";

const IndexPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    const fetchBootLoader = async () => {
      dispatch(setAuthModal(false));
      await dispatch(fetchAsyncGetMyProf());
      await dispatch(fetchAsyncGetPosts());
      await dispatch(fetchAsyncGetProfs());
      await dispatch(fetchAsyncGetComments());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div>
      <Grid container spacing={4}>
        {posts
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
