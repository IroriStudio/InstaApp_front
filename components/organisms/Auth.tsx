import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../stores";
import {
  selectIsOpenAuthModal,
  setAuthModal,
} from "../../stores/slices/authSlice";
import ChangeAuthModeText from "../atoms/ChangeAuthModeText";
import AuthForm from "../molecules/AuthForm";
import styles from "./Auth.module.css";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    width: 280,
    height: 490,
    padding: "50px",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.85)",
  },
};
const AuthModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  Modal.setAppElement("#__next");
  const isOpenAuthModal = useSelector(selectIsOpenAuthModal);

  return (
    <div>
      <Modal
        isOpen={isOpenAuthModal}
        style={customStyles}
        onRequestClose={() => dispatch(setAuthModal(false))}
      >
        <h1 className={styles.auth_title}>Irostagram</h1>
        <AuthForm />
        <ChangeAuthModeText />
      </Modal>
    </div>
  );
};

export default AuthModal;
