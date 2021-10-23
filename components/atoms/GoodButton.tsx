import React from "react";
import { Checkbox, Grid, makeStyles } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectProfile } from "../../stores/slices/authSlice";
import { PROPS_POST } from "../../stores/types";

interface Props {
  checked: boolean;
  onClickGood: () => void;
}

const GoodButton: React.FC<Props> = ({ checked, onClickGood }) => {
  const profile = useSelector(selectProfile);
  // const { id, title, liked } = post;
  // const packet = {
  //   id: id,
  //   title: title,
  //   current: liked,
  //   new: profile.userProfile,
  // };

  const isChecked = profile.nickName == "" ? false : checked;
  return (
    <Checkbox
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite />}
      checked={isChecked}
      onChange={onClickGood}
      style={{ padding: "0", margin: "0" }}
    />
  );
};

export default GoodButton;
