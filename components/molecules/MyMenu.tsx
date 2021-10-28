import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { MdExitToApp, MdAddAPhoto, MdEdit } from "react-icons/md";
import { Badge, Avatar, withStyles } from "@material-ui/core";
import { AppDispatch } from "../../stores";
import {
  editNickname,
  resetOpenProfile,
  selectProfile,
  setOpenProfile,
} from "../../stores/slices/authSlice";
import {
  resetOpenNewPost,
  setOpenNewPost,
} from "../../stores/slices/postSlice";
import styles from "./PostMenu.module.css";

interface Props {
  id: number;
  checked: boolean;
  onClickGood: () => void;
  isMyPost: boolean;
}

const MyMenu: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }))(Badge);

  const onClickLogout = () => {
    localStorage.removeItem("localJWT");
    dispatch(editNickname(""));
    dispatch(resetOpenProfile());
    dispatch(resetOpenNewPost());
  };

  const onClickAddPost = () => {
    dispatch(setOpenNewPost());
    dispatch(resetOpenProfile());
  };
  const onClickProfile = () => {
    dispatch(setOpenProfile());
    dispatch(resetOpenNewPost());
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-label="settings"
        onClick={handleClickMenu}
        style={{
          color: "red",
          backgroundColor: "transparent",
          border: "none",
          zIndex: 0,
        }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="who?" src={profile.img} />
        </StyledBadge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        style={{ zIndex: 2 }}
      >
        <MenuItem onClick={onClickProfile}>
          <MdEdit size={25} />
          <p className={styles.menu_item}>Profile</p>
        </MenuItem>
        <MenuItem onClick={onClickAddPost}>
          <MdAddAPhoto size={25} />
          <p className={styles.menu_item}>Post</p>
        </MenuItem>
        <MenuItem onClick={onClickLogout}>
          <MdExitToApp size={25} />
          <p className={styles.menu_item}>Logout</p>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MyMenu;
