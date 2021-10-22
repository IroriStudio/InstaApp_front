import React, { useEffect } from "react";
import { PROPS_POST } from "../../stores/types";
import { getAllPosts } from "../../utils/post";
import LoadingPostCard from "../organisms/LoadingPostCard";
import PostCard from "../organisms/PostCard";

const Post: React.FC<PROPS_POST> = ({
  postId,
  loginId,
  userPost,
  title,
  imageUrl,
  liked,
  created_on,
}) => {
  if (title) {
    return (
      <PostCard
        postId={postId}
        loginId={loginId}
        userPost={userPost}
        title={title}
        imageUrl={imageUrl}
        liked={liked}
        created_on={created_on}
      />
    );
  }
  return <LoadingPostCard />;
};

export default Post;
