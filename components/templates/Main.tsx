import React, { useEffect } from "react";
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
import EditProfile from "../organisms/EditProfile";
import NewPost from "../organisms/NewPost";
import { AppDispatch } from "../../stores";
import { Grid } from "@mui/material";
const Main: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const posts = useSelector(selectPosts);

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT) {
        dispatch(setAuthModal(false));
        const result = await dispatch(fetchAsyncGetMyProf());
        if (fetchAsyncGetMyProf.rejected.match(result)) {
          dispatch(setAuthModal(true));
          return;
        }
        await dispatch(fetchAsyncGetPosts());
        await dispatch(fetchAsyncGetProfs());
        await dispatch(fetchAsyncGetComments());
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div>
      <Auth />
      <EditProfile />
      <NewPost />
      {profile?.nickName && (
        <>
          <Grid container spacing={4}>
            {posts
              .slice(0)
              .reverse()
              .map((post) => (
                <Post
                  key={post.id}
                  postId={post.id}
                  title={post.title}
                  loginId={profile.userProfile}
                  userPost={post.userPost}
                  imageUrl={post.img}
                  liked={post.liked}
                  created_on={post.created_on}
                />
              ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default Main;
