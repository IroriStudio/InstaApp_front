import { AsyncThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrlPost, fetchAsyncGetPosts } from "../stores/slices/postSlice";

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
