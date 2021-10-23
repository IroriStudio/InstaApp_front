import React, { useEffect, useState } from "react";
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
    height: 500,
    padding: "50px",
    transform: "translate(-50%, -50%)",
    // textAlign: "center",
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
  const handlerEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
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
          <br />
          <TextField
            placeholder="nickname"
            type="text"
            value={nickName}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            type="file"
            id="imageInput"
            hidden={true}
            onChange={(e) => setImage(e.target.files![0])}
          />
          <div className={styles.edit_prof_avatar}>
            <Avatar
              style={{
                height: "10rem",
                width: "10rem",
                zIndex: 0,
                margin: "1rem auto",
              }}
              src={avatarUrl}
            />
            <IconButton onClick={handlerEditPicture}>
              <MdAddAPhoto />
            </IconButton>
          </div>

          <Button
            disabled={!profile?.nickName}
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
