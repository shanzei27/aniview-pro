import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DifferenceIcon from '@mui/icons-material/Difference';
import Box from '@mui/material/Box';
import api from '../../config/temp_anime_api';
import Link from '@mui/material/Link';
import Grow from '@mui/material/Grow';
import Fade from '@mui/material/Fade';
import { openInNewTab } from '../../utils/utils';
import { styled  } from '@mui/material/styles';

const DiffText = styled(Typography)(({ theme }) => ({
    color:theme.palette.positive.main
}));

const LikeVsHateItem = (props) => {
    const [checked, setChecked] = useState(false);        //grow animation
    
    const startAnim = () => {
        setChecked((prev) => !prev);
      };

    useEffect(() => {
        startAnim()
     },[]);

    const diff = props.data["user_score"] - props.data["public_mean"];

    const item = (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300*0.5, }}>
        <Typography gutterBottom variant="h5" component="div">
            {props.data["node"]["title"]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            
            </Typography>
            <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <StarIcon sx={{ fontSize: 'inherit' }}/>
                <Typography variant="body2" color="text.secondary">
                {props.data["public_mean"]}
                </Typography>
            </Box>
            <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <StarIcon sx={{ fontSize: 'inherit' }}/>
                <Typography variant="body1" color="text.secondary">
                Your score: {props.data["user_score"]}
                </Typography>
            </Box>
            <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <DifferenceIcon sx={{ fontSize: 'inherit' }}/>
                <DiffText variant="body2">
                Diff: +{diff.toFixed(2)}
                </DiffText>
            </Box>
        </Box>
      );

    //const anime = api[animeID];
    //const imageSrc = process.env.PUBLIC_URL + anime["image_uri"]+'.jpg';
  //  console.log(props.data);
    const imageSrc = props.data["node"]["main_picture"]["large"];

    const imageIcon = (
        <Link onClick={() => openInNewTab('https://myanimelist.net/anime/' + props.data["node"]["id"])}>
        <CardMedia
          component="img"
          sx={{ width: 151, cursor:'pointer' }}
          image={imageSrc}
        alt={props.data["node"]["title"]}
        />
       </Link>
    )
    console.log(props.data["node"]["title"]);
    return (
    <div>
    <Card sx={{ display: 'flex', height: 185, width: 300, }}>
        {/* <Grow in={checked}> */}
            {item}
        {/* </Grow> */}
        <div  sx={{ width: 300*0.5 }}>
        {/* <Fade in={checked}> */}
            {imageIcon}
       {/* </Fade> */}
       </div>
    </Card>
    </div>   
    )
}

export default LikeVsHateItem