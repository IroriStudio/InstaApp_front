import React, { useEffect } from "react";
import Auth from "../organisms/Auth";
import { Grid } from "@material-ui/core";
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

import Post from "../organisms/Post";
import EditProfile from "../organisms/EditProfile";
import NewPost from "../organisms/NewPost";
import { AppDispatch } from "../../stores";
import LoadingPost from "../organisms/LoadingPost";

const Core: React.FC = () => {
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
          <div>
            {/* <Grid container spacing={4}>
              {posts
                .slice(0)
                .reverse()
                .map((post) => (
                  <Grid key={post.id} item xs={12} md={4}>
                    <Post
             
                    />
                  </Grid>
                ))}
            </Grid> */}
            <Grid container spacing={4}>
              {posts
                .slice(0)
                .reverse()
                .map((post) => (
                  <LoadingPost
                    postId={post.id}
                    title={post.title}
                    loginId={profile.userProfile}
                    userPost={post.userPost}
                    imageUrl={post.img}
                    liked={post.liked}
                  />
                ))}
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default Core;
