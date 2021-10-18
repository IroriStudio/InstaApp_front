import React from "react";
import styles from "./Auth.module.css";
import Modal from "react-modal";

import { useSelector } from "react-redux";
import { selectIsOpenAuthModal } from "../../stores/slices/authSlice";

import ChangeAuthModeText from "../atoms/ChangeAuthModeText";
import AuthForm from "../molecules/AuthForm";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    width: 280,
    height: 490,
    padding: "50px",
    transform: "translate(-50%, -50%)",
  },
};
const AuthModal: React.FC = () => {
  Modal.setAppElement("#__next");
  const isOpenAuthModal = useSelector(selectIsOpenAuthModal);

  return (
    <>
      <Modal isOpen={isOpenAuthModal} style={customStyles}>
        <h1 className={styles.auth_title}>Irostagram</h1>
        <AuthForm />
        <ChangeAuthModeText />
      </Modal>
    </>
  );
};

export default AuthModal;
