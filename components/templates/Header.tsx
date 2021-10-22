import React, { ReactNode } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { AppDispatch } from "../../stores";
import { useDispatch, useSelector } from "react-redux";
import {
  editNickname,
  resetOpenProfile,
  selectIsLoadingAuth,
  selectProfile,
  setAuthModal,
} from "../../stores/slices/authSlice";
import {
  resetOpenNewPost,
  setOpenNewPost,
  selectIsLoadingPost,
} from "../../stores/slices/postSlice";
import { MdAddAPhoto } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";

import { Button, CircularProgress, Badge, Avatar } from "@mui/material";
import MyAvatarButton from "../molecules/MyAvatarButton";
import PostMenu from "../molecules/PostMenu";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const isLoadingPost = useSelector(selectIsLoadingPost);
  const isLoadingAuth = useSelector(selectIsLoadingAuth);

  const onClickLogout = () => {
    localStorage.removeItem("localJWT");
    dispatch(editNickname(""));
    dispatch(resetOpenProfile());
    dispatch(resetOpenNewPost());
    React.memo;
    dispatch(setAuthModal(true));
  };

  const onClickAddPost = () => {
    dispatch(setOpenNewPost());
    dispatch(resetOpenProfile());
  };
  return (
    <header>
      <nav className={styles.header_nav}>
        <Link href="/">
          <a className={styles.header_title}>
            <h1>Irostagram</h1>
          </a>
        </Link>

        {profile?.nickName && (
          <>
            <button onClick={onClickAddPost} className={styles.header_btn}>
              <MdAddAPhoto />
            </button>
            {isLoadingAuth && <CircularProgress />}
            <button onClick={onClickLogout} className={styles.header_btn}>
              <MdExitToApp />
            </button>

            <MyAvatarButton />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
