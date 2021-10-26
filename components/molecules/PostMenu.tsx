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
import { PROPS_POST } from "../../stores/types";

interface Props {
  checked: boolean;
  onClickGood: () => void;
  post: PROPS_POST;
}

const PostMenu: React.FC<Props> = ({ checked, onClickGood, post }) => {
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

  const isMyPost = profile?.userProfile === post?.userPost;
  return (
    <div>
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
          <MenuItem
            onClick={async () => await onClickDelete(post?.id, dispatch)}
          >
            <MdDelete size={25} />
            <p className={styles.menu_item}>Delete</p>
          </MenuItem>
        )}
        <MenuItem onClick={onClickGood}>
          <GoodButton checked={checked} />
          <p className={styles.menu_item}>Good</p>
        </MenuItem>
        {path == "/" && (
          <MenuItem
            onClick={(e) => {
              onClickPostDetail(e, post?.id, dispatch);
            }}
          >
            <MdOutlineCommentBank size={25} />
            <p className={styles.menu_item}>Detail</p>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default PostMenu;
