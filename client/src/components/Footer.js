import React from "react";
import { Typography } from "@mui/material";


const Footer = (props) => {
  return (
    <>
      <footer
        style={{
          color: "gray",
          width: "100%",
          height: "40px",
          position: "fixed",
          bottom: 0,
        }}
      >
        <Typography>Copyright © 2024 Aniview | UNDER DEVELOPMENT - Things might break or not function as intended.</Typography>
      </footer>
    </>
  );
};

export default Footer;
