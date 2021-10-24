import React from "react";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectProfile } from "../../stores/slices/authSlice";

interface Props {
  checked: boolean;
  onClickGood: () => void;
}

const GoodButton: React.FC<Props> = ({ checked, onClickGood }) => {
  const profile = useSelector(selectProfile);
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
