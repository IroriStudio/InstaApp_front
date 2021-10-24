import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";

import Image from "next/image";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { AvatarGroup } from "@material-ui/lab";
import { getAllPostIds, getPostById, onClickGood } from "../../utils/post";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncGetMyProf,
  selectProfile,
  selectProfiles,
} from "../../stores/slices/authSlice";

import {
  setPost,
  selectPost,
  fetchPageEnd,
} from "../../stores/slices/postSlice";
import GoodButton from "../../components/atoms/GoodButton";
import PostMenu from "../../components/molecules/PostMenu";
import { AppDispatch } from "../../stores";
import { fetchAsyncGetProfs } from "../../stores/slices/authSlice";

const Post = ({ fetchedPost }: any) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setPost(fetchedPost));
    dispatch(fetchAsyncGetProfs());
    dispatch(fetchAsyncGetMyProf());
    dispatch(fetchPageEnd());
  }, [dispatch]);

  const postState = useSelector(selectPost);
  const profiles = useSelector(selectProfiles);
  const profile = useSelector(selectProfile);
  const loginId = profile.userProfile;

  const { id, title, userPost, created_on, img, liked } = postState;

  const postProfile = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  })[0];

  const packet = {
    id: id,
    title: title,
    current: liked,
    new: loginId,
  };

  const isLikedChecked = liked.some((like) => like === loginId);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid item md={6}>
        <Card>
          <CardHeader
            avatar={<Avatar alt="my avatar" src={postProfile?.img} />}
            action={
              <PostMenu
                id={id}
                checked={isLikedChecked}
                onClickGood={async () => {
                  await onClickGood(packet, profile, dispatch);
                }}
                isMyPost={profile.userProfile === userPost}
              />
            }
            title={postProfile?.nickName}
            subheader={created_on}
          />
          {img && (
            <Image
              src={img}
              alt="image"
              width={1000}
              height={600}
              objectFit="contain"
            />
          )}
          <CardContent>
            <div style={{ display: "flex" }}>
              <Typography mt={1} mr={1}>
                <strong>{postProfile?.nickName}</strong>
              </Typography>
              <Typography mt={1}>{title}</Typography>
            </div>
            <div style={{ display: "flex", zIndex: 0 }}>
              <GoodButton
                checked={isLikedChecked}
                onClickGood={async () => {
                  await onClickGood(packet, profile, dispatch);
                }}
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

            {/* <Comments
            postId={postId}
            userPost={userPost}
            created_on={created_on}
          /> */}
            {/* <form className={styles.post_input_box}>
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
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { post } = await getPostById(params.id);

  return {
    props: { fetchedPost: post },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};
