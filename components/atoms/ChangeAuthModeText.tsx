import React from "react";
import styles from "./ChangeAuthModeText.module.css";

import { useDispatch, useSelector } from "react-redux";
import { selectAuthMode, changeAuthMode } from "../../stores/slices/authSlice";
import { AppDispatch } from "../../stores";

const ChangeAuthModeText: React.FC = () => {
  const authMode = useSelector(selectAuthMode);
  const dispatch: AppDispatch = useDispatch();
  return (
    <a
      className={styles.change_auth_mode_text}
      onClick={() => {
        if (authMode === "login") {
          dispatch(changeAuthMode("register"));
        } else {
          dispatch(changeAuthMode("login"));
        }
      }}
    >
      {authMode == "login"
        ? "Don't have an account?"
        : "Do you have an account?"}
    </a>
  );
};

export default ChangeAuthModeText;
