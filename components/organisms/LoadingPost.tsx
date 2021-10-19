import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { selectProfiles } from "../../stores/slices/authSlice";
import {
  fetchAsyncPatchLiked,
  fetchAsyncPostComment,
  fetchPostEnd,
  fetchPostStart,
  selectComments,
  selectIsLoadingPost,
} from "../../stores/slices/postSlice";
import { Checkbox, Grid } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { AppDispatch } from "../../stores";
import { PROPS_POST } from "../../stores/types";
import styles from "./Post.module.css";

const LoadingPost: React.FC<PROPS_POST> = ({
  postId,
  loginId,
  userPost,
  title,
  imageUrl,
  liked,
}) => {
  // const isLoadingPost = false;
  const isLoadingPost = useSelector(selectIsLoadingPost);

  const dispatch: AppDispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);
  const [text, setText] = useState("");

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

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader
          avatar={
            isLoadingPost ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : (
              <Avatar alt="Ted talk" src={prof[0]?.img} />
            )
          }
          action={
            isLoadingPost ? null : (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            isLoadingPost ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              prof[0]?.nickName
            )
          }
          subheader={
            isLoadingPost ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              "5 hours ago"
            )
          }
        />
        {isLoadingPost ? (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <img className={styles.post_image} src={imageUrl} alt="" />
        )}
        <CardContent>
          {isLoadingPost ? (
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6, width: 500 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          ) : (
            <>
              <Checkbox
                className={styles.post_checkbox}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={liked.some((like) => like === loginId)}
                onChange={handlerLiked}
              />
              <Typography variant="body2" color="text.secondary" component="p">
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  "Why First Minister of Scotland Nicola Sturgeon thinks GDP is
                  the wrong measure of a country's success:Why First Minister of
                  Scotland Nicola Sturgeon thinks GDP is the wrong measure of a
                  country's success:Why First Minister of Scotland Nicola
                  Sturgeon thinks GDP is the wrong measure of a country's
                  success:"
                </p>
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LoadingPost;
