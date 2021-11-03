import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { selectAuthMode } from "../../stores/slices/authSlice";

interface Props {
  disabled: boolean;
}

const AuthButton: React.FC<Props> = ({ disabled }) => {
  const authMode = useSelector(selectAuthMode);
  
return (
    <Button
      disabled={disabled}
      variant="contained"
      color="primary"
      type="submit"
    >
      {authMode === "login" ? "Log In" : "Sign Up"}
    </Button>
  );
};

export default AuthButton;
