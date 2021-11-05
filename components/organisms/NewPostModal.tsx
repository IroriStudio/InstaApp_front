/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Button, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
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
import { File } from "../../stores/types";
import styles from "./NewPostModal.module.css";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    width: "450px",
    height: "500px",

    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.85)",
  },
};

const NewPost: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openNewPost = useSelector(selectOpenNewPost);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");

  const onClickButton = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const imageHander = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files![0];
    setImage(file);
    if (file === null) {
      return;
    }
    let imgTag = document.getElementById("preview") as HTMLImageElement;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result: string = reader.result as string;
      imgTag.src = result;
    };
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

  const ModalClose = () => {
    setTitle("");
    setImage(null);
    dispatch(resetOpenNewPost());
  };

  return (
    <>
      <Modal
        isOpen={openNewPost}
        onRequestClose={ModalClose}
        style={customStyles}
      >
        <form style={{ textAlign: "center" }}>
          <h1 className={styles.modal_title}>Irostagram</h1>
          <br />
          <TextField
            placeholder="Set a title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            onChange={imageHander}
            id="imageInput"
            hidden={true}
          />

          <div>
            <img
              id="preview"
              style={{
                objectFit: "contain",
                border: "none",
              }}
            />
            <div style={{ width: "100%" }}>
              <IconButton onClick={onClickButton}>
                <MdAddAPhoto />
              </IconButton>
            </div>
          </div>
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
