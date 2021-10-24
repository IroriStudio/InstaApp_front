import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { AppDispatch } from "../../stores";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoadingAuth,
  selectProfile,
  setAuthModal,
} from "../../stores/slices/authSlice";

import { MdLogin } from "react-icons/md";

import { CircularProgress, IconButton } from "@mui/material";
import MyMenu from "../molecules/MyMenu";
import { selectIsLoadingPage } from "../../stores/slices/postSlice";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const isLoadingPage = useSelector(selectIsLoadingPage);

  return (
    <header>
      <nav className={styles.header_nav}>
        <Link href="/">
          <a className={styles.header_title}>
            <h1>Irostagram</h1>
          </a>
        </Link>

        {isLoadingPage && (
          <div className={styles.header_progress}>
            <CircularProgress />
          </div>
        )}

        {profile?.nickName ? (
          <MyMenu />
        ) : (
          <IconButton
            onClick={() => {
              dispatch(setAuthModal(true));
            }}
            className={styles.header_btn}
          >
            <MdLogin />
          </IconButton>
        )}
      </nav>
    </header>
  );
};

export default Header;
