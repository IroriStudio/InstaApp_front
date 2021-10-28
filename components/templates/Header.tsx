import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { CircularProgress, IconButton } from "@mui/material";
import { MdLogin } from "react-icons/md";
import { selectIsLoadingPage } from "../../stores/slices/postSlice";
import { selectProfile, setAuthModal } from "../../stores/slices/authSlice";
import { AppDispatch } from "../../stores";
import MyMenu from "../molecules/MyMenu";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);

  return (
    <header>
      <nav className={styles.header_nav}>
        <Link href="/">
          <a className={styles.header_title}>
            <h1>Irostagram</h1>
          </a>
        </Link>

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
