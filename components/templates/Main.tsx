import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import {
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  selectProfile,
  setAuthModal,
} from "../../stores/slices/authSlice";

import {
  fetchAsyncGetComments,
  fetchAsyncGetPosts,
  selectPosts,
} from "../../stores/slices/postSlice";

import Post from "./Post";
import { AppDispatch } from "../../stores";

const Main: React.FC = () => {
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

export default Main;
