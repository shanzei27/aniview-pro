import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Fade from "@mui/material/Fade";
import { openInNewTab } from "../../utils/utils";

const RandomAnimeButton = ({data}) => {
  const [checked, setChecked] = useState(false); //fade animation

  useEffect(() => {
    setChecked(true);
  }, []);

  const item = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: 300 * 0.6,
        margin: "0 auto",
        overflow: "auto",
        color: "text.secondary",    
      }}
    >
      <Typography variant="h5" component="div">
        <Link
          style={{ textDecoration: "none", cursor: "pointer" }}
          onClick={() =>
            openInNewTab(
              "https://myanimelist.net/anime/" + data["id"]
            )
          }
        >
          {data["title"]}
        </Link>
      </Typography>   
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StarIcon sx={{ fontSize: "inherit" }} />
        <Typography variant="body1" color="text.secondary">
        MAL score:  {data["score"]}
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      </Box>
    </Box>
  );

  const imageSrc = data["image_url"];

  const imageIcon = (
    <Link
      onClick={() =>
        openInNewTab(
          "https://myanimelist.net/anime/" + data["id"]
        )
      }
    >
      <CardMedia
        component="img"
        sx={{ width: 151, cursor: "pointer" }}
        image={imageSrc}
        alt={data["title"]}
      />
    </Link>
  );
  console.log(data["title"]);
  return (
    <Box sx={{
      '&:hover': {
        transform: `scale(1.05)`,
        transitionTimingFunction: 'ease-out',
        transition: '0.1s'
   },   
    }}>
      <Fade in={checked}>
        <Card sx={{ display: "flex", height: 185, width: 300 }}>
          {item}
          <div sx={{ width: 300 * 0.5 }}>{imageIcon}</div>
        </Card>
      </Fade>
    </Box>
  );
};

export default RandomAnimeButton;
