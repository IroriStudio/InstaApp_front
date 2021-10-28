import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { object, string } from "yup";
import { CircularProgress, TextField } from "@material-ui/core";
import styles from "./AuthForm.module.css";
import {
  fetchAsyncCreateProf,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  fetchAsyncLogin,
  fetchAsyncRegister,
  fetchCredEnd,
  fetchCredStart,
  selectAuthMode,
  selectIsLoadingAuth,
  setAuthModal,
} from "../../stores/slices/authSlice";
import { AppDispatch } from "../../stores";
import {
  fetchAsyncGetComments,
  fetchAsyncGetPosts,
} from "../../stores/slices/postSlice";
import Spacer from "../atoms/Spacer";
import AuthButton from "../atoms/AuthButton";

const AuthForm: React.FC = () => {
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
        alert("login failed");
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
        alert("register failed");
      }
    }
    dispatch(fetchCredEnd());
  };
  return (
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
            <div className={styles.auth_form}>
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

              {touched.email && errors.email && (
                <div className={styles.auth_error}>{errors.email}</div>
              )}
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
              <Spacer />
              <AuthButton disabled={!isValid} />
              <Spacer />
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default AuthForm;
