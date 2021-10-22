import { Avatar, Typography, Button, CardHeader, Divider } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../stores";
import { selectProfiles, selectProfile } from "../../stores/slices/authSlice";
import {
  fetchAsyncDeleteComment,
  selectComments,
} from "../../stores/slices/postSlice";
import PostMenu from "./PostMenu";
import styles from "./Comments.module.css";
const Comments: React.FC<any> = ({ postId, userPost, created_on }) => {
  const dispatch: AppDispatch = useDispatch();
  // const classes = useStyles();
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);
  const profile = useSelector(selectProfile);
  const [text, setText] = useState("");

  const commentsOnPost = comments.filter((comment) => {
    return comment.post === postId;
  });
  const prof = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });
  return (
    <div className={styles.comments_box}>
      {commentsOnPost.map((comment) => (
        <div className={styles.comment_box} key={comment.id}>
          <Avatar alt="my avatar" src={prof[0]?.img} />
          <p className={styles.comment_nickname}>
            <strong>{prof[0]?.nickName}</strong>
          </p>
          <p className={styles.comment_text}>{comment.text}</p>

          {/* {profile.userProfile === userPost && <PostMenu postId={postId} />} */}
        </div>
      ))}
    </div>
  );
};

export default Comments;
