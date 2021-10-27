import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, setAuthModal } from "../../stores/slices/authSlice";
import {
  fetchAsyncPostComment,
  fetchPostEnd,
  fetchPostStart,
} from "../../stores/slices/postSlice";
import { AppDispatch } from "../../stores";
import styles from "./CommentInput.module.css";
import { PROPS_POST } from "../../stores/types";

interface Props {
  post: PROPS_POST;
}

const CommentInput: React.FC<Props> = ({ post }) => {
  const dispatch: AppDispatch = useDispatch();

  const profile = useSelector(selectProfile);

  const [text, setText] = useState("");

  const postComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { text: text, post: post.id };
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncPostComment(packet));
    await dispatch(fetchPostEnd());
    setText("");
  };

  return (
    <>
      {profile.nickName ? (
        <form className={styles.comment_input_box}>
          <input
            className={styles.comment_input}
            type="text"
            placeholder="comment to this post"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <IconButton
            disabled={!text.length}
            type="submit"
            onClick={postComment}
          >
            <SendIcon />
          </IconButton>
        </form>
      ) : (
        <div className={styles.comment_input_box}>
          <div className={styles.comment_input}>
            <a
              onClick={() => {
                dispatch(setAuthModal(true));
              }}
              className={styles.comment_sign_in}
            >
              Sign In
            </a>
            {"  "}
            to good or comment
          </div>
          <IconButton disabled={true}>
            <SendIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default CommentInput;
