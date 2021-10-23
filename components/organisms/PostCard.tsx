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
import { onClickGood, onClickPostDetail } from "../../utils/post";

interface Props {
  post: PROPS_POST;
}

const PostCard: React.FC<Props> = ({ post }) => {
  const dispatch: AppDispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);
  const profile = useSelector(selectProfile);
  const loginId = profile.userProfile;

  const [text, setText] = useState("");

  const { id, userPost, title, img, liked, created_on } = post;

  const commentsOnPost = comments.filter((comment) => {
    return comment.post === id;
  });

  const postProfile = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  })[0];

  const postComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { text: text, post: id };
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncPostComment(packet));
    await dispatch(fetchPostEnd());
    setText("");
  };
  const checked = profile.nickName
    ? liked.some((like) => like === loginId)
    : false;

  const packet = {
    id: id,
    title: title,
    current: liked,
    new: loginId,
  };
  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader
          avatar={<Avatar alt="my avatar" src={postProfile?.img} />}
          action={
            <PostMenu
              id={id}
              checked={checked}
              onClickGood={async () => {
                await onClickGood(packet, profile, dispatch);
              }}
              isMyPost={profile.userProfile === userPost}
            />
          }
          title={postProfile?.nickName}
          subheader={created_on}
        />
        <Image
          src={img}
          alt="image"
          width={1000}
          height={600}
          objectFit="contain"
        />

        <CardContent>
          <div style={{ display: "flex" }}>
            <Typography mt={1} mr={1}>
              <strong>{postProfile?.nickName}</strong>
            </Typography>
            <Typography mt={1}>{title}</Typography>
          </div>
          <div style={{ display: "flex", zIndex: 0 }}>
            <GoodButton
              checked={liked.some((like) => like === loginId)}
              onClickGood={async () => {
                await onClickGood(packet, profile, dispatch);
              }}
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
                onClick={(e) => onClickPostDetail(e, id)}
                className={styles.view_detail_btn}
              >
                View all comments
              </a>
            </Typography>
          ) : (
            <Typography>
              <a
                onClick={(e) => onClickPostDetail(e, id)}
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
