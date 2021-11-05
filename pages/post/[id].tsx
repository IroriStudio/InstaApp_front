import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { AvatarGroup } from "@material-ui/lab";
import { getAllPostIds, getPostById, onClickGood } from "../../utils/post";
import {
  fetchAsyncGetMyProf,
  selectProfile,
  selectProfiles,
} from "../../stores/slices/authSlice";

import {
  setPost,
  selectPost,
  fetchPageEnd,
  selectComments,
} from "../../stores/slices/postSlice";
import Layout from "../../components/Layout";
import GoodButton from "../../components/atoms/GoodButton";
import PostMenu from "../../components/molecules/PostMenu";
import { AppDispatch } from "../../stores";
import { fetchAsyncGetProfs } from "../../stores/slices/authSlice";
import Comments from "../../components/molecules/Comments";
import CommentInput from "../../components/molecules/CommentInput";
import { PROPS_POST } from "../../stores/types";
import { useRouter } from "next/router";

interface Props {
  fetchedPost: PROPS_POST;
}

const Post: React.FC<Props> = ({ fetchedPost }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(setPost(fetchedPost));
    dispatch(fetchAsyncGetProfs());
    dispatch(fetchAsyncGetMyProf());
    dispatch(fetchPageEnd());
  }, [dispatch, fetchedPost]);

  const postState = useSelector(selectPost);
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);
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
  const commentsOnPost = comments.filter((comment) => {
    return comment.post === id;
  });
  const isLikedChecked = liked.some((like) => like === loginId);

  return (
    <Layout title={title}>
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
                  post={postState}
                  checked={isLikedChecked}
                  onClickGood={async () => {
                    await onClickGood(packet, profile, dispatch);
                  }}
                />
              }
              title={postProfile?.nickName}
              subheader={created_on}
            />
            {router.isFallback ? (
              <div>Loading...</div>
            ) : (
              img && (
                <Image
                  src={img}
                  alt="image"
                  width={1000}
                  height={600}
                  objectFit="contain"
                />
              )
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
              <Comments comments={commentsOnPost} />
              <CommentInput post={postState} />
            </CardContent>
          </Card>
        </Grid>
      </div>
    </Layout>
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
    paths: [],
    fallback: "blocking",
  };
};
