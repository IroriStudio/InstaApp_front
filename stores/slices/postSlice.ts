import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "..";
import {
  POST_COMMENT,
  PROPS_LIKED,
  PROPS_NEWPOST,
  PROPS_POST_ID,
} from "../types";

export const apiUrlPost = `${process.env.NEXT_PUBLIC_DEV_API_URL}api/post/`;
export const apiUrlComment = `${process.env.NEXT_PUBLIC_DEV_API_URL}api/comment/`;

export const fetchAsyncGetPosts = createAsyncThunk("post/get", async () => {
  const res = await axios.get(apiUrlPost);
  return res.data;
});

export const fetchAsyncNewPost = createAsyncThunk(
  "post/post",
  async (newPost: PROPS_NEWPOST) => {
    const uploadData = new FormData();
    uploadData.append("title", newPost.title);
    newPost.img && uploadData.append("img", newPost.img, newPost.img.name);
    const res = await axios.post(apiUrlPost, uploadData, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);
export const fetchAsyncPostDelete = createAsyncThunk(
  "post/delete",
  async (postId: number) => {
    const res = await axios.delete(`${apiUrlPost}${postId}/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return postId;
  }
);

export const fetchAsyncPatchLiked = createAsyncThunk(
  "post/patch",
  async (liked: PROPS_LIKED) => {
    const currentLiked = liked.current;
    const uploadData = new FormData();

    let isOverlapped = false;
    currentLiked.forEach((current) => {
      if (current === liked.new) {
        isOverlapped = true;
      } else {
        uploadData.append("liked", String(current));
      }
    });

    if (!isOverlapped) {
      uploadData.append("liked", String(liked.new));
    } else if (currentLiked.length === 1) {
      uploadData.append("title", liked.title);
      const res = await axios.put(`${apiUrlPost}${liked.id}/`, uploadData, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });

      return res.data;
    }
    const res = await axios.patch(`${apiUrlPost}${liked.id}/`, uploadData, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });

    return res.data;
  }
);

export const fetchAsyncGetComments = createAsyncThunk(
  "comment/get",
  async () => {
    const res = await axios.get(apiUrlComment, {
      headers: { Authorization: `JWT ${localStorage.localJWT}` },
    });
    return res.data;
  }
);

export const fetchAsyncPostComment = createAsyncThunk(
  "comment/post",
  async (comment: POST_COMMENT) => {
    const res = await axios.post(apiUrlComment, comment, {
      headers: { Authorization: `JWT ${localStorage.localJWT}` },
    });
    return res.data;
  }
);
export const fetchAsyncDeleteComment = createAsyncThunk(
  "comment/delete",
  async (commentId: number) => {
    const res = await axios.delete(`${apiUrlComment}${commentId}/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return commentId;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoadingPage: false,
    isLoadingPost: false,
    openNewPost: false,
    posts: [
      { id: 0, title: "", userPost: 0, created_on: "", img: "", liked: [0] },
    ],
    comments: [{ id: 0, text: "", userComment: 0, post: 0 }],
    post: {
      id: 0,
      title: "",
      userPost: 0,
      created_on: "",
      img: "",
      liked: [0],
    },
  },
  reducers: {
    fetchPageStart(state) {
      state.isLoadingPage = true;
    },
    fetchPageEnd(state) {
      state.isLoadingPage = false;
    },
    fetchPostStart(state) {
      state.isLoadingPost = true;
    },
    fetchPostEnd(state) {
      state.isLoadingPost = false;
    },
    setOpenNewPost(state) {
      state.openNewPost = true;
    },
    resetOpenNewPost(state) {
      state.openNewPost = false;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    resetPost(state) {
      state.post = {
        id: 0,
        title: "",
        userPost: 0,
        created_on: "",
        img: "",
        liked: [0],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    });
    builder.addCase(fetchAsyncNewPost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    });
    builder.addCase(fetchAsyncPostDelete.fulfilled, (state, action) => {
      return {
        ...state,
        posts: state.posts.filter((post) => !(post.id === action.payload)),
      };
    });
    builder.addCase(fetchAsyncGetComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
      };
    });
    builder.addCase(fetchAsyncPostComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    });
    builder.addCase(fetchAsyncDeleteComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => !(comment.id === action.payload)
        ),
      };
    });
    builder.addCase(fetchAsyncPatchLiked.fulfilled, (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
        post: action.payload,
      };
    });
  },
});

export const {
  fetchPageStart,
  fetchPageEnd,
  fetchPostStart,
  fetchPostEnd,
  setOpenNewPost,
  resetOpenNewPost,
  setPost,
  resetPost,
} = postSlice.actions;

export const selectIsLoadingPage = (state: RootState) =>
  state.post.isLoadingPage;
export const selectIsLoadingPost = (state: RootState) =>
  state.post.isLoadingPost;
export const selectOpenNewPost = (state: RootState) => state.post.openNewPost;
export const selectPosts = (state: RootState) => state.post.posts;
export const selectPost = (state: RootState) => state.post.post;
export const selectComments = (state: RootState) => state.post.comments;

export default postSlice.reducer;
