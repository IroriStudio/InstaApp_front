import React from "react";
import { useSelector } from "react-redux";
import { Badge, Avatar, withStyles } from "@material-ui/core";
import { selectProfile } from "../../stores/slices/authSlice";

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

const MyAvatarButton: React.FC = () => {
  const profile = useSelector(selectProfile);

  return (
    <button
      style={{ color: "red", backgroundColor: "transparent", border: "none" }}
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar alt="who?" src={profile?.img} />
      </StyledBadge>
    </button>
  );
};

export default MyAvatarButton;
