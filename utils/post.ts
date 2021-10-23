import axios from "axios";
import {
  apiUrlPost,
  fetchAsyncPatchLiked,
  fetchAsyncPostDelete,
} from "../stores/slices/postSlice";
import router from "next/router";
import { setAuthModal } from "../stores/slices/authSlice";

export const getAllPosts = async () => {
  const posts = await axios.get(apiUrlPost);
  return posts.data;
};

export const getAllPostIds = async () => {
  const res = await getAllPosts();
  return res.map((post) => {
    return {
      params: {
        id: post.id.toString(),
      },
    };
  });
};

export const getPostById = async (id) => {
  const post = await axios.get(`${apiUrlPost}${id}/`);

  return { post: post.data };
};

export const onClickPostDetail = (e, postId) => {
  e.preventDefault();
  router.push(`/post/${postId}`);
};

export const onClickGood = async (packet, profile, dispatch) => {
  if (profile.nickName) {
    await dispatch(fetchAsyncPatchLiked(packet));
  } else {
    dispatch(setAuthModal(true));
  }
};

export const onClickDelete = async (id, dispatch) => {
  await dispatch(fetchAsyncPostDelete(id));
  router.push("/");
};
