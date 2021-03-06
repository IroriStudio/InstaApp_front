import React from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { selectProfiles } from "../../stores/slices/authSlice";
import { PROPS_COMMENT } from "../../utils/types";
import styles from "./Comments.module.css";

interface Props {
  comments: PROPS_COMMENT[];
}
const Comments: React.FC<Props> = ({ comments }) => {
  const profiles = useSelector(selectProfiles);
  const userComment = (comment) => {
    return profiles.filter(
      (profile) => profile.userProfile == comment?.userComment
    )[0];
  };

  return (
    <div className={styles.comments_container}>
      {comments.map((comment) => (
        <div className={styles.comment_box} key={comment.id}>
          {userComment(comment)?.nickName && (
            <>
              <Avatar
                alt="user"
                src={userComment(comment)?.img}
                style={{
                  height: "2rem",
                  width: "2rem",
                  marginTop: "0.5rem",
                  marginRight: "1rem",
                  zIndex: 0,
                }}
              />

              <p className={styles.comment_nickname}>
                {userComment(comment)?.nickName}
              </p>

              <p>{comment?.text}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
