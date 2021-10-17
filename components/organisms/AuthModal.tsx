import React from "react";
import styles from "./Auth.module.css";
import Modal from "react-modal";
import { Formik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoadingAuth,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  fetchAsyncLogin,
  fetchAsyncRegister,
  fetchAsyncCreateProf,
  selectIsOpenAuthModal,
  setAuthModal,
  selectAuthMode,
  changeAuthMode,
} from "../../stores/slices/authSlice";
import { AppDispatch } from "../../stores";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import {
  fetchAsyncGetComments,
  fetchAsyncGetPosts,
} from "../../stores/slices/postSlice";
import AuthTextField from "../atoms/AuthTextField";

const customStyles = {
  overlay: {
    // backgroundColor: "#777777",
  },
  content: {
    top: "55%",
    left: "50%",
    width: 280,
    height: 430,
    padding: "50px",
    transform: "translate(-50%, -50%)",
  },
};
const AuthModal: React.FC = () => {
  Modal.setAppElement("#__next");
  const isOpenAuthModal = useSelector(selectIsOpenAuthModal);
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const authMode = useSelector(selectAuthMode);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (values) => {
    dispatch(fetchCredStart());
    if (authMode === "login") {
      const res = await dispatch(fetchAsyncLogin(values));
      if (fetchAsyncLogin.fulfilled.match(res)) {
        await dispatch(fetchAsyncGetProfs());
        await dispatch(fetchAsyncGetPosts());
        await dispatch(fetchAsyncGetComments());
        await dispatch(fetchAsyncGetMyProf());

        dispatch(setAuthModal(false));
      } else if (fetchAsyncLogin.rejected.match(res)) {
        console.log("login failed");
      }
    } else {
      const res = await dispatch(fetchAsyncRegister(values));
      if (fetchAsyncRegister.fulfilled.match(res)) {
        await dispatch(fetchAsyncLogin(values));
        await dispatch(fetchAsyncCreateProf({ nickName: "anonymous" }));
        await dispatch(fetchAsyncGetProfs());
        await dispatch(fetchAsyncGetPosts());
        await dispatch(fetchAsyncGetComments());
        await dispatch(fetchAsyncGetMyProf());

        dispatch(setAuthModal(false));
      } else if (fetchAsyncRegister.rejected.match(res)) {
        console.log("register failed");
      }
    }
    dispatch(fetchCredEnd());
  };

  return (
    <>
      <Modal isOpen={isOpenAuthModal} style={customStyles}>
        <Formik
          initialErrors={{ email: "required" }}
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={object().shape({
            email: string()
              .email("email format is wrong")
              .required("email is must"),
            password: string().required("password is must").min(4),
          })}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <div>
              <form onSubmit={handleSubmit}>
                <div className={styles.auth_signUp}>
                  <h1 className={styles.auth_title}>Irostagram</h1>
                  <br />
                  <div className={styles.auth_progress}>
                    {isLoadingAuth && <CircularProgress />}
                  </div>

                  <TextField
                    placeholder="email"
                    type="input"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />

                  {touched.email && errors.email ? (
                    <div className={styles.auth_error}>{errors.email}</div>
                  ) : null}
                  <br />

                  <TextField
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password && errors.password ? (
                    <div className={styles.auth_error}>{errors.password}</div>
                  ) : null}
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                    type="submit"
                  >
                    {authMode === "login" ? "Log In" : "Sign Up"}
                  </Button>
                  <br />
                  <br />
                  <span
                    className={styles.auth_text}
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
                  </span>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AuthModal;
