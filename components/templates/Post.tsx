import React from "react";
import { PROPS_POST } from "../../stores/types";
import LoadingPostCard from "../organisms/LoadingPostCard";
import PostCard from "../organisms/PostCard";

interface Props {
  post: PROPS_POST;
}

const Post: React.FC<Props> = ({ post }) => {
  if (post?.img) {
    return <PostCard post={post} />;
  }
  
return <LoadingPostCard />;
};

export default Post;
