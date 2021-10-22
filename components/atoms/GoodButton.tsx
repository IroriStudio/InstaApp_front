import React from "react";
import { Checkbox, Grid, makeStyles } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface Props {
  checked: boolean;
  onClickLiked: () => void;
}
const GoodButton: React.FC<Props> = ({ checked, onClickLiked }) => {
  return (
    <Checkbox
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite />}
      checked={checked}
      onChange={onClickLiked}
      style={{ padding: "0", margin: "0" }}
    />
  );
};

export default GoodButton;
