//
var express = require("express");
var router = express.Router();
const axios = require('axios');

router.get('/', async (req, res, next) => {
  const data = 'test api responded'
  res.send({
      data: data
  });
});

router.get('/:user_name', async (req, res, next) => {
  const username = req.params.user_name;
  console.log(username);
  const userHistoryData = await fetchUserHistory(username);
  //const slicedArray = userHistoryData["data"].slice(0,5);
  const processedList = await processHistory(userHistoryData["data"]);
  res.send({
    userHistory: userHistoryData["data"],
    processHistory: processedList
  });
});

async function processHistory(userHistoryData) {
 // const filteredArray = userHistoryData.
 let visitedArray = [];
 let processedData = [];
 for(let entries of userHistoryData){
  if(!visitedArray.includes(entries["entry"]["mal_id"])){
    const animeData = await fetchMALAnime(entries["entry"]["mal_id"]);
    const animeObj = {
      "name": entries["entry"]["name"],
      "progress": entries["increment"],
      "total_episodes": animeData["num_episodes"]
    }
    console.log(animeObj);
    //pushing the mal_id to visited array to ignore it from now on
    processedData.push(animeObj);
    visitedArray.push(entries["entry"]["mal_id"]);
  }
  if(processedData.length === 5) {
    break;
  }
 }
 return processedData;
}

async function fetchUserHistory(username) {
  console.log("exec start with ::" + username);

  const responseData = await axios.get(
    `https://api.jikan.moe/v4/users/${username}/history`
  );

  return responseData.data;
}

async function fetchMALAnime (id) {
  const headers = {
      'X-MAL-CLIENT-ID': process.env.REACT_APP_CLIENT_ID
  };
  
  return axios.get(`https://api.myanimelist.net/v2/anime/${id}?fields=num_episodes`, { headers })
  .then(promise => promise.data)
  .catch(e => {
      console.error(e);
  });
}

// async function fetchMALAnimeViaJikan(animeID) {
//   console.log("fetch exec start with :: " + animeID);

//   const responseData = await axios.get(
//     `https://api.jikan.moe/v4/anime/${animeID}/full`
//   );

//   return responseData["data"];
// }

module.exports = router;
