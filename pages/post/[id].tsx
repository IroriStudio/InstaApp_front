import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { Grid } from "@mui/material";
import { AvatarGroup } from "@material-ui/lab";
import Layout from "../../components/Layout";
import {
  getAllPostIds,
  getPostById,
  onClickPostDetail,
} from "../../utils/post";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  selectProfile,
  selectProfiles,
  setAuthModal,
} from "../../stores/slices/authSlice";
import { AppDispatch } from "../../stores";
import {
  fetchAsyncGetComments,
  fetchAsyncGetPosts,
  fetchAsyncPatchLiked,
  fetchAsyncPostComment,
  fetchPostEnd,
  fetchPostStart,
  selectComments,
  selectPosts,
} from "../../stores/slices/postSlice";
import GoodButton from "../../components/atoms/GoodButton";
import PostMenu from "../../components/molecules/PostMenu";
import { PROPS_POST } from "../../stores/types";

const Post = ({ fetchedPost }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);
  const profile = useSelector(selectProfile);
  const posts = useSelector(selectPosts);

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT) {
        dispatch(setAuthModal(false));
        // const result = await dispatch(fetchAsyncGetMyProf());
        // if (fetchAsyncGetMyProf.rejected.match(result)) {
        //   dispatch(setAuthModal(true));
        //   return;
        // }
        await dispatch(fetchAsyncGetMyProf());
        await dispatch(fetchAsyncGetPosts());
        await dispatch(fetchAsyncGetProfs());
        await dispatch(fetchAsyncGetComments());
        console.log("profiles....", profiles);
        console.log("profile....", profile);
        console.log("posts....", posts);
      }
    };
    fetchBootLoader();
  }, [dispatch]);
  console.log("2profile....", profile);
  const [text, setText] = useState("");

  const { id, userPost, title, img, created_on } = fetchedPost;
  const loginId = profile.userProfile;
  const liked = [2];

  const post: PROPS_POST = posts.map((post) => post)[0];
  const commentsOnPost = comments.filter((comment) => {
    return comment.post === id;
  });

  const prof = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });

  const postComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { text: text, post: id };
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncPostComment(packet));
    await dispatch(fetchPostEnd());
    setText("");
  };

  const onClickLiked = async () => {
    const packet = {
      id: id,
      title: title,
      current: liked,
      new: loginId,
    };
    console.log("packet..", packet);
    await dispatch(fetchAsyncPatchLiked(packet));
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
      }}
    >
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            avatar={<Avatar alt="Ted talk" src={prof[0]?.img} />}
            action={
              <PostMenu
                postId={id}
                checked={liked.some((like) => like === loginId)}
                onClickLiked={onClickLiked}
                isMyPost={profile.userProfile === userPost}
              />
            }
            title={prof[0]?.nickName}
            subheader={created_on}
          />
          <Image
            src={img}
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
                    src={
                      profiles.find((prof) => prof.userProfile === like)?.img
                    }
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

            {/* {commentsOnPost.length > 0 ? (
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
            )} */}
            {/* <Comments
            postId={postId}
            userPost={userPost}
            created_on={created_on}
          /> */}
            {/* <form className={styles.post_commentBox}>
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
            </form> */}
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { post } = await getPostById(params.id);

  return {
    props: { fetchedPost: post },
    revalidate: 1,
  };
};
