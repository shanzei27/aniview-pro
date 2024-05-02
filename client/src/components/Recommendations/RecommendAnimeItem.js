import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Box from "@mui/material/Box";
import api from "../../config/temp_anime_api";
import Link from "@mui/material/Link";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import { openInNewTab } from "../../utils/utils";
import { styled } from "@mui/material/styles";

const RecommendItem = ({data}) => {
   // debugger
  const [checked, setChecked] = useState(false); //fade animation

  useEffect(() => {
    setChecked(true);
  }, []);

  const item = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 300 * 0.5,
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

  //const anime = api[animeID];
  //const imageSrc = process.env.PUBLIC_URL + anime["image_uri"]+'.jpg';
  //  console.log(data);
  const imageSrc = data["images"]["webp"]["large_image_url"];

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
    <div>
      <Fade in={checked}>
        <Card sx={{ display: "flex", height: 185, width: 300 }}>
          {item}
          <div sx={{ width: 300 * 0.5 }}>{imageIcon}</div>
        </Card>
      </Fade>
    </div>
  );
};

export default RecommendItem;
