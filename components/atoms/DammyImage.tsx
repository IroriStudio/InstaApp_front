import React from "react";
import { Skeleton } from "@mui/material";

const DammyImage: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Skeleton
        sx={{ height: 200, width: 350 }}
        animation="wave"
        variant="rectangular"
      />
    </div>
  );
};

export default DammyImage;
