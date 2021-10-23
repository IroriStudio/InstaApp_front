import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { MdDelete, MdOutlineCommentBank } from "react-icons/md";
import { AppDispatch } from "../../stores";
import styles from "./PostMenu.module.css";
import GoodButton from "../atoms/GoodButton";
import { onClickDelete, onClickPostDetail } from "../../utils/post";
import { selectProfile } from "../../stores/slices/authSlice";
import { useRouter } from "next/router";

interface Props {
  id: number;
  checked: boolean;
  onClickGood: () => void;
  isMyPost: boolean;
}

const PostMenu: React.FC<Props> = ({ id, checked, onClickGood, isMyPost }) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const router = useRouter();
  const path = router.pathname;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton aria-label="settings" onClick={handleClickMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        {isMyPost && profile.nickName && (
          <MenuItem onClick={async () => await onClickDelete(id, dispatch)}>
            <MdDelete size={25} />
            <p className={styles.menu_item}>Delete</p>
          </MenuItem>
        )}
        <MenuItem>
          <GoodButton checked={checked} onClickGood={onClickGood} />
          <p className={styles.menu_item}>Good</p>
        </MenuItem>
        {path == "/" && (
          <MenuItem
            onClick={(e) => {
              onClickPostDetail(e, id);
            }}
          >
            <MdOutlineCommentBank size={25} />
            <p className={styles.menu_item}>Detail</p>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default PostMenu;
