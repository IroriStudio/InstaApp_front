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
import styles from "./FirstComment.module.css";
const FirstComment: React.FC<any> = ({ comment }) => {
  const dispatch: AppDispatch = useDispatch();

  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);
  const profile = useSelector(selectProfile);
  const [text, setText] = useState("");

  // const commentsOnPost = comments.filter((comment) => {
  //   return comment.post === postId;
  // });
  // const prof = profiles.filter((prof) => {
  //   return prof.userProfile === userPost;å
  // });
  const userComment = profiles.filter(
    (profile) => profile.id == comment?.userComment
  )[0];

  return (
    <div className={styles.first_comment_box}>
      {userComment?.img && (
        <>
          <Avatar
            alt="user"
            src={userComment?.img}
            style={{
              height: "1.2rem",
              width: "1.2rem",
              margin: "0.1rem",
              marginRight: "0.5rem",

              zIndex: 0,
            }}
          />
          <Typography>
            <p className={styles.comment_nickname}>{userComment.nickName}</p>
          </Typography>

          <Typography>
            <p className={styles.comment_text}>{comment?.text}</p>
          </Typography>
        </>
      )}
    </div>
  );
};

export default FirstComment;
