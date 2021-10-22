import React, { useState } from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { Grid } from "@mui/material";
import { AvatarGroup } from "@material-ui/lab";

import { useDispatch, useSelector } from "react-redux";
import { selectProfile, selectProfiles } from "../../stores/slices/authSlice";
import {
  fetchAsyncPatchLiked,
  fetchAsyncPostComment,
  fetchPostEnd,
  fetchPostStart,
  selectComments,
} from "../../stores/slices/postSlice";
import { AppDispatch } from "../../stores";
import { PROPS_POST } from "../../stores/types";
import styles from "./PostCard.module.css";
import PostMenu from "../molecules/PostMenu";
import GoodButton from "../atoms/GoodButton";
import Comments from "../molecules/Comments";
import { onClickPostDetail } from "../../utils/post";

const PostCard: React.FC<PROPS_POST> = ({
  postId,
  loginId,
  userPost,
  title,
  imageUrl,
  liked,
  created_on,
}) => {
  const dispatch: AppDispatch = useDispatch();
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

  const postComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { text: text, post: postId };
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncPostComment(packet));
    await dispatch(fetchPostEnd());
    setText("");
  };

  const onClickLiked = async () => {
    const packet = {
      id: postId,
      title: title,
      current: liked,
      new: loginId,
    };
    console.log(packet);
    await dispatch(fetchAsyncPatchLiked(packet));
  };

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader
          avatar={<Avatar alt="my avatar" src={prof[0]?.img} />}
          action={
            <PostMenu
              postId={postId}
              checked={liked.some((like) => like === loginId)}
              onClickLiked={onClickLiked}
              isMyPost={profile.userProfile === userPost}
            />
          }
          title={prof[0]?.nickName}
          subheader={created_on}
        />
        <Image
          src={imageUrl}
          alt="image"
          width={1000}
          height={600}
          objectFit="contain"
        />
        {/* <img src={imageUrl} alt="image" className={styles.post_image} /> */}
        <CardContent>
          <div style={{ display: "flex" }}>
            <Typography mt={1} mr={1}>
              <strong>{prof[0]?.nickName}</strong>
            </Typography>
            <Typography mt={1}>{title}</Typography>
          </div>
          <div style={{ display: "flex", zIndex: 0 }}>
            <GoodButton
              checked={liked.some((like) => like === loginId)}
              onClickLiked={onClickLiked}
            />
            <AvatarGroup max={3}>
              {liked.map((like) => (
                <Avatar
                  key={like}
                  src={profiles.find((prof) => prof.userProfile === like)?.img}
                  style={{
                    height: "1.8rem",
                    width: "1.8rem",
                    marginTop: "0rem",
                    zIndex: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Typography mt={0.7} mb={0.7} ml={2}>
              {liked.length > 0
                ? `liked by ${liked.length} people`
                : "Be the first to like this"}
            </Typography>
          </div>

          {commentsOnPost.length > 0 ? (
            <Typography>
              <a
                onClick={(e) => onClickPostDetail(e, postId)}
                className={styles.view_detail_btn}
              >
                View all comments
              </a>
            </Typography>
          ) : (
            <Typography>
              <a
                onClick={(e) => onClickPostDetail(e, postId)}
                className={styles.view_detail_btn}
              >
                view the detail
              </a>
            </Typography>
          )}
          {/* <Comments
            postId={postId}
            userPost={userPost}
            created_on={created_on}
          /> */}
          <form className={styles.post_commentBox}>
            <input
              className={styles.post_input}
              type="text"
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
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostCard;
