var express = require('express');
var router = express.Router();
const axios = require('axios')

//score threshold vars
const publicScoreBadThreshold = 7.25;     //score to determine worse than avg anime - anything below this value
const likeHateThreshold = 0.5;     //score threshold to check

//storage vars
let malUserData = [];
let publicAnimeDataObj = {};
let lvhAnimeObject = {
    "data": [],
    "count": 0
};

router.get('/', async (req, res, next) => {
    const data = 'enter'
    //const data = await fetchData(req);
    res.status(200).json({
        data: data
    });
});

router.get('/:searchText', async (req, res, next) => {
    //res.send('API is working properly');
    const username = req.params.searchText;
    malUserData = await fetchData(username);
    await initPublicAnimeFetch();
    await createLVHArray();
    res.send({
        data: lvhAnimeObject
    });
});

async function fetchData(username) {
    console.log("exec start with ::"+ username);
    const headers = {
        'X-MAL-CLIENT-ID': process.env.REACT_APP_CLIENT_ID
    };

    const responseData = await axios.get(`https://api.myanimelist.net/v2/users/${username}/animelist?status=completed&fields=list_status&limit=50`, { headers });
    
   
    console.log("init end, response ::", responseData);
    return responseData.data;

     // processing api data post fetching
  //   await Promise.all([
  //     initFetchAndHandleResponse()
  //   ]).then(setPublicAnimeData(publicAnimeDataObj))
  //   console.log("WAITED 1");
   
  //   await Promise.all([
  //     handleFetchedData(publicAnimeDataObj)
  //   ]).then(updateStateWithAnimeData(lvhAnimeObject))
    
  //   console.log("WAITED 2");
  //   console.log("FINALLY");
  //   console.log(lvhAnimeArray);
  //   console.log(publicAnimeData);
   
    
}

async function fetchMALAnime (id) {
    const headers = {
        'X-MAL-CLIENT-ID': process.env.REACT_APP_CLIENT_ID
    };
    
    return axios.get(`https://api.myanimelist.net/v2/anime/${id}?fields=rank,mean,alternative_titles`, { headers })
    .then(promise => promise.data)
    .catch(e => {
        console.error(e);
    });
}

// ------------ API Process -------------------

async function initPublicAnimeFetch () {
     console.log("public anime fetch init");
     let prevIDs = [];
     //debugger;
     for (let i = 0; i < malUserData["data"].length; i++) {
       const animeID = malUserData["data"][i]["node"]["id"];
         const publicAnime = await fetchMALAnime(animeID);
        //   console.log(publicAnime);
           const obj = {};
           obj[animeID] = publicAnime;
          // console.log(prevIDs);
 
           if(!prevIDs.includes(animeID)){
             prevIDs.push(animeID);
             const newObj = {};
             newObj[animeID] = publicAnime;
             publicAnimeDataObj[animeID] = publicAnime;
           }
           console.log("fetched 1 public anime");
     };
     console.log("end of public anime fetch");

 }
 
 async function  createLVHArray () {
    console.log("init LVH array creation");

    malUserData["data"].forEach(async (element) => {
       const animeID = element["node"]["id"];
       let processedObj = {};
       const userScore = element["list_status"]["score"];

         const publicScore = publicAnimeDataObj[animeID]["mean"];
         if(publicScore < publicScoreBadThreshold){
           if(userScore > publicScore){
             if((userScore-likeHateThreshold) > publicScore){
                processedObj["node"] = element["node"];
                processedObj["public_mean"] = publicScore;
                processedObj["user_score"] = element["list_status"]["score"]

                lvhAnimeObject["data"].push(processedObj);
                lvhAnimeObject["count"] = lvhAnimeObject["data"].length;
                console.log('MATCH FOUND :: ' + processedObj["node"]["title"]);
               } else {
              //console.log('NO MATCH');
             }
         } else {
          //console.log('NO MATCH');
         }
       }
     });
     console.log("end of LVH array creation");
   }
 
 //----API PROCESS END-------------------------------------------------------------------------------------


module.exports = router;