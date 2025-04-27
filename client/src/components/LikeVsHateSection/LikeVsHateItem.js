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
import { openInNewTab } from "../../utils/utils";
import Link from "@mui/material/Link";
import Fade from "@mui/material/Fade";

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
  }, [props.type]);

  const publicMean = props.data?.node?.public_mean ?? "N.A.";
  const userScore = props.data?.user_score ?? "N.A.";
  const title = props.data?.node?.title ?? "N.A.";
  const animeId = props.data?.node?.id ?? "N.A.";
  const imageSrc = props.data?.node?.main_picture?.medium ?? "";
  const diff = Math.abs(userScore - publicMean);

  const item = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: 300 * 0.7,
        margin: "0 auto",
        overflow: "auto",
        color: "text.secondary",
      }}
    >
      <Typography gutterBottom variant="h5" component="div" className="contentBox">
        <Link
          style={{ textDecoration: "none", cursor: "pointer" }}
          onClick={() => openInNewTab(`https://myanimelist.net/anime/${animeId}`)}
        >
          {title}
        </Link>
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StarOutlineIcon sx={{ fontSize: "inherit" }} />
        <Typography variant="body2" color="text.secondary">
          MAL score: {publicMean}
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
          Your score: {userScore}
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

  const imageIcon = imageSrc ? (
    <Link onClick={() => openInNewTab(`https://myanimelist.net/anime/${animeId}`)}>
      <CardMedia
        component="img"
        sx={{ width: 132, cursor: "pointer" }}
        image={imageSrc}
        alt={title}
      />
    </Link>
  ) : null;

  return (
    <Box
      sx={{
        "&:hover": {
          transform: `scale(1.05)`,
          transitionTimingFunction: "ease-out",
          transition: "0.1s",
        },
      }}
    >
      <Fade in={checked}>
        <Card sx={{ display: "flex", height: 185, width: 300 }}>
          {item}
          <div sx={{ width: 300 * 0.5 }}>{imageIcon}</div>
        </Card>
      </Fade>
    </Box>
  );
};

export default LikeVsHateItem;