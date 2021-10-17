import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../stores";
import {
  fetchAsyncNewPost,
  fetchPostEnd,
  fetchPostStart,
  resetOpenNewPost,
  selectOpenNewPost,
} from "../../stores/slices/postSlice";
import { File } from "../types";
import styles from "./Core.module.css";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    width: 280,
    height: 220,
    padding: "50px",
    transform: "translate(-50%,-50%)",
  },
};
const NewPost: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openNewPost = useSelector(selectOpenNewPost);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const newPost = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { title: title, img: image };
    dispatch(fetchPostStart());
    await dispatch(fetchAsyncNewPost(packet));
    dispatch(fetchPostEnd());
    setTitle("");
    setImage(null);
    dispatch(resetOpenNewPost());
  };

  return (
    <>
      <Modal
        isOpen={openNewPost}
        onRequestClose={() => dispatch(resetOpenNewPost())}
        style={customStyles}
      >
        <form className={styles.core_signUp}>
          <h1 className={styles.core_title}>Irostagram</h1>
          <br />
          <TextField
            placeholder="Please enter caption"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="file"
            id="imageInput"
            hidden={true}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <IconButton onClick={handleEditPicture}>
            <MdAddAPhoto />
          </IconButton>
          <br />

          <Button
            disabled={!title || !image}
            variant="contained"
            color="primary"
            onClick={newPost}
          >
            New Post
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default NewPost;