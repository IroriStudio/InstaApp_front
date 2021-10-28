import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "./Comment.module.css";
import { selectProfiles } from "../../stores/slices/authSlice";
import { PROPS_COMMENT } from "../../utils/types";

interface Props {
  comments: PROPS_COMMENT[];
}
const Comment: React.FC<Props> = ({ comments }) => {
  const profiles = useSelector(selectProfiles);
  const firstComment = comments[0];
  const userComment = profiles.filter(
    (profile) => profile.userProfile == firstComment?.userComment
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
              marginRight: "0.8rem",
              zIndex: 0,
            }}
          />

          <p className={styles.comment_nickname}>{userComment.nickName}</p>

          <p className={styles.comment_text}>{firstComment?.text}</p>
        </>
      )}
    </div>
  );
};

export default Comment;
