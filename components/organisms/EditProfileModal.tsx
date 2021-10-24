import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton, TextField, Avatar } from "@mui/material";
import Modal from "react-modal";
import styles from "./EditProfileModal.module.css";
import { AppDispatch } from "../../stores";
import {
  fetchAsyncUpdateProf,
  fetchCredEnd,
  fetchCredStart,
  resetOpenProfile,
  selectOpenProfile,
  selectProfile,
} from "../../stores/slices/authSlice";
import { File } from "../../stores/types";
import { MdAddAPhoto } from "react-icons/md";
const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    width: 280,
    height: 450,
    padding: "5rem",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.85)",
  },
};

const EditProfile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openProfile = useSelector(selectOpenProfile);
  const profile = useSelector(selectProfile);
  const [nickName, setNickname] = useState<string>(profile?.nickName);
  const [image, setImage] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(profile?.img);

  useEffect(() => {
    setNickname(profile?.nickName);
    setAvatarUrl(profile?.img);
  }, [profile]);

  const updateProfile = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { id: profile.id, nickName: nickName, img: image };
    dispatch(fetchCredStart());
    await dispatch(fetchAsyncUpdateProf(packet));
    dispatch(fetchCredEnd());
    dispatch(resetOpenProfile());
  };
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

  return (
    <>
      <Modal
        isOpen={openProfile}
        onRequestClose={() => dispatch(resetOpenProfile())}
        style={customStyles}
      >
        <form style={{ textAlign: "center" }}>
          <h1 className={styles.modal_title}>Irostagram</h1>
          <TextField
            placeholder="nickname"
            type="text"
            value={nickName}
            onChange={(e) => setNickname(e.target.value)}
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
          <div className={styles.edit_prof_avatar}>
            <img
              id="preview"
              src={avatarUrl}
              style={{
                width: "10rem",
                height: "10rem",
                borderRadius: "5rem",
                objectFit: "cover",
              }}
            ></img>
            <div style={{ width: "100%" }}>
              <IconButton onClick={onClickButton}>
                <MdAddAPhoto />
              </IconButton>
            </div>
          </div>
          <br />
          <Button
            disabled={!nickName || !image}
            variant="contained"
            color="primary"
            type="submit"
            onClick={updateProfile}
          >
            Update
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditProfile;