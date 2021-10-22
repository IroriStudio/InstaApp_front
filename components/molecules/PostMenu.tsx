import MoreVertIcon from "@mui/icons-material/MoreVert";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";
import { MdDelete } from "react-icons/md";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../stores";
import { fetchAsyncPostDelete } from "../../stores/slices/postSlice";
import styles from "./PostMenu.module.css";
import GoodButton from "../atoms/GoodButton";
import router, { NextRouter, useRouter } from "next/router";

interface Props {
  postId: number;
  checked: boolean;
  onClickLiked: () => void;
  isMyPost: boolean;
}

const PostMenu: React.FC<Props> = ({
  postId,
  checked,
  onClickLiked,
  isMyPost,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickDelete = async () => {
    await dispatch(fetchAsyncPostDelete(postId));
    // console.log("object");
  };

  const onClickPostDetail = (e) => {
    e.preventDefault();
    router.push(`/post/${postId}`);
  };
  return (
    <>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {isMyPost && (
          <MenuItem onClick={onClickDelete}>
            <MdDelete size={25} />
            <p className={styles.menu_item}>Delete</p>
          </MenuItem>
        )}
        <MenuItem>
          <GoodButton checked={checked} onClickLiked={onClickLiked} />
          <p className={styles.menu_item}>Good</p>
        </MenuItem>
        <MenuItem>
          <a className={styles.menu_item} onClick={onClickPostDetail}>
            Detail
          </a>
        </MenuItem>
      </Menu>
    </>
  );
};

export default PostMenu;
