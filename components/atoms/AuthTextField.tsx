import React from "react";
import { TextField } from "@material-ui/core";

interface Props {
  placeholder: string;
  type: string;
  name: string;
  handleChange: (e) => void;
  onBlur: (e) => void;
  value: string;
}

const AuthTextField: React.FC<Props> = ({
  placeholder,
  type,
  name,
  handleChange,
  onBlur,
  value,
}) => {
  return (
    <TextField
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={handleChange}
      onBlur={onBlur}
      value={value}
    />
  );
};

export default AuthTextField;
