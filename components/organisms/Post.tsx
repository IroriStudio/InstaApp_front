import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../stores";
import styles from "./Post.module.css";

import { makeStyles } from "@material-ui/core/styles";
import { PROPS_POST } from "../../stores/types";
import { selectProfiles } from "../../stores/slices/authSlice";
import {
  fetchAsyncPatchLiked,
  fetchAsyncPostComment,
  fetchPostEnd,
  fetchPostStart,
  selectComments,
} from "../../stores/slices/postSlice";
import { Avatar, Checkbox } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { AvatarGroup } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));
const Post: React.FC<PROPS_POST> = ({
  postId,
  loginId,
  userPost,
  title,
  imageUrl,
  liked,
}) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);
  const [text, setText] = useState<string>("");

  const commentsOnPost = comments.filter((com) => {
    return com.post === postId;
  });

  const prof = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });

  const postComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { text: text, post: postId };
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncPostComment(packet));
    await dispatch(fetchPostEnd());
    setText("");
  };

  const handlerLiked = async () => {
    const packet = {
      id: postId,
      title: title,
      current: liked,
      new: loginId,
    };
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncPatchLiked(packet));
    await dispatch(fetchPostEnd());
  };

  if (title) {
    return (
      <div className={styles.post}>
        <div className={styles.post_header}>
          <Avatar className={styles.post_avatar} src={prof[0]?.img} />
          <h3>{prof[0]?.nickName}</h3>
        </div>
        <img className={styles.post_image} src={imageUrl} alt="" />
        <h4>
          <Checkbox
            className={styles.post_checkbox}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={liked.some((like) => like === loginId)}
            onChange={handlerLiked}
          />
          <strong>{prof[0]?.nickName}</strong>　{title}
          <AvatarGroup max={7}>
            {liked.map((like) => (
              <Avatar
                key={like}
                src={profiles.find((prof) => prof.userProfile === like)?.img}
              />
            ))}
          </AvatarGroup>
        </h4>
        {commentsOnPost.map((comment) => (
          <div key={comment.id} className={styles.post_comment}>
            <Avatar
              src={
                profiles.find(
                  (prof) => prof.userProfile === comment.userComment
                )?.img
              }
              className={classes.small}
            />
            <p>
              <strong className={styles.strong}>
                {
                  profiles.find(
                    (prof) => prof.userProfile === comment.userComment
                  )?.nickName
                }
              </strong>
            </p>
            {comment.text}
          </div>
        ))}
        <form className={styles.post_commentBox}>
          <input
            className={styles.post_input}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            disabled={!text.length}
            className={styles.post_button}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      </div>
    );
  }
  return null;
};

export default Post;
