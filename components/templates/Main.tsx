import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Auth from "../organisms/Auth";
import {
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  selectProfile,
  setAuthModal,
} from "../../stores/slices/authSlice";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncGetComments,
  fetchAsyncGetPosts,
  selectPosts,
} from "../../stores/slices/postSlice";

import Post from "./Post";
import EditProfile from "../organisms/EditProfileModal";
import NewPost from "../organisms/NewPostModal";
import { AppDispatch } from "../../stores";

const Main: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
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
      <>
        <Grid container spacing={4}>
          {posts
            .slice(0)
            .reverse()
            .map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </Grid>
      </>
    </div>
  );
};

export default Main;
