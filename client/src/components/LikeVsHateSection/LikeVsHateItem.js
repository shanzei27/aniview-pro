import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DifferenceIcon from "@mui/icons-material/Difference";
import Box from "@mui/material/Box";
import api from "../../config/temp_anime_api";
import Link from "@mui/material/Link";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import { openInNewTab } from "../../utils/utils";
import { styled } from "@mui/material/styles";

const LikeVsHateItem = (props) => {
  const [checked, setChecked] = useState(false); //fade animation
  const [diffSign, setDiffSign] = useState("");

  useEffect(() => {
    if (props.type === "lvhUserLikes") {
      setDiffSign("+");
    } else {
      setDiffSign("-");
    }
    setChecked(true);
  }, []);

  const diff = Math.abs(props.data["user_score"] - props.data["public_mean"]);

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
      <Typography gutterBottom variant="h5" component="div">
        <Link
          style={{ textDecoration: "none", cursor: "pointer" }}
          onClick={() =>
            openInNewTab(
              "https://myanimelist.net/anime/" + props.data["node"]["id"]
            )
          }
        >
          {props.data["node"]["title"]}
        </Link>
      </Typography>
      <Typography variant="body2" color="text.secondary"></Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StarOutlineIcon sx={{ fontSize: "inherit" }} />
        <Typography variant="body2" color="text.secondary">
          MAL score: {props.data["public_mean"]}
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StarIcon sx={{ fontSize: "inherit" }} />
        <Typography variant="body1" color="text.secondary">
          Your score: {props.data["user_score"]}
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DifferenceIcon sx={{ fontSize: "inherit" }} />
        <Typography
          variant="body2"
          style={diffSign === "+" ? { color: "green" } : { color: "red" }}
        >
          Diff: {diffSign + diff.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );

  //const anime = api[animeID];
  //const imageSrc = process.env.PUBLIC_URL + anime["image_uri"]+'.jpg';
  //  console.log(props.data);
  const imageSrc = props.data["node"]["main_picture"]["large"];

  const imageIcon = (
    <Link
      onClick={() =>
        openInNewTab(
          "https://myanimelist.net/anime/" + props.data["node"]["id"]
        )
      }
    >
      <CardMedia
        component="img"
        sx={{ width: 151, cursor: "pointer" }}
        image={imageSrc}
        alt={props.data["node"]["title"]}
      />
    </Link>
  );
  console.log(props.data["node"]["title"]);
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

export default LikeVsHateItem;
