import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../stores";
import Modal from "react-modal";
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
import { Button, IconButton, TextField } from "@mui/material";
const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    width: 280,
    height: 220,
    padding: "50px",
    transform: "translate(-50%, -50%)",
  },
};

const EditProfile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openProfile = useSelector(selectOpenProfile);
  const profile = useSelector(selectProfile);
  const [nickName, setNickname] = useState<string>(profile?.nickName);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    setNickname(profile?.nickName);
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
        <form>
          <h1>Irostagram</h1>
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
          <br />
          <IconButton onClick={handlerEditPicture}>
            <MdAddAPhoto />
          </IconButton>
          <br />
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
