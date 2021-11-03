import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChangeAuthModeText.module.css";
import { AppDispatch } from "../../stores";
import { selectAuthMode, changeAuthMode } from "../../stores/slices/authSlice";

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
