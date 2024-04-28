var express = require("express");
var router = express.Router();
const axios = require("axios");

//score threshold vars
const publicScoreBadThreshold = 7.25; //score to determine worse than avg anime - anything below this value
const likeHateThreshold = 0.45; //score threshold to check
const publicScoreGoodThreshold = 7.25;
const hateLikeThreshold = 1.25;

//storage vars
let malUserData = [];
let publicAnimeDataObj = {};
let lvhAnimeObject = {
  data: [],
  count: 0,
};
let hvlAnimeObject = {
  data: [],
  count: 0,
};
// history page
let historyData = {
  bar_1: {},
};

router.get("/", async (req, res, next) => {
  const data = "test api responded";
  res.send({
    data: data,
  });
});

router.get("/:searchText", async (req, res, next) => {
  malUserData = [];
  publicAnimeDataObj = {};
  lvhAnimeObject = {
    data: [],
    count: 0,
  };
  hvlAnimeObject = {
    data: [],
    count: 0,
  };
  historyData = {
    bar_1: {},
  };

  const username = req.params.searchText;
  malUserData = await fetchData(username);
  if (malUserData["data"].length === 0 || malUserData["data"] === null) {
    res.send({
      error: "not_found",
    });
  } else {
    await initUserDataHandling();
    await initLVHArrayCreation();
    res.send({
      userLikes: lvhAnimeObject,
      userHates: hvlAnimeObject,
      historyPage: historyData,
      rawData: malUserData,
      // rawDataPub: publicAnimeDataObj
    });
  }
});

async function fetchData(username) {
  console.log("exec start with ::" + username);
  const limit = 20;
  const headers = {
    "X-MAL-CLIENT-ID": process.env.REACT_APP_CLIENT_ID,
  };

  const responseData = await axios.get(
    `https://api.myanimelist.net/v2/users/${username}/animelist?status=completed&?sort=list_updated_at&fields=list_status&limit=${limit}`,
    { headers }
  );

  console.log("init end, response ::", responseData);
  return responseData.data;
}

async function initHistoryDataCreation() {}

async function fetchMALAnime(id) {
  const headers = {
    "X-MAL-CLIENT-ID": process.env.REACT_APP_CLIENT_ID,
  };

  return axios
    .get(
      `https://api.myanimelist.net/v2/anime/${id}?fields=rank,mean,alternative_titles,start_date,average_episode_duration`,
      { headers }
    )
    .then((promise) => promise.data)
    .catch((e) => {
      console.error(e);
    });
}

// ------------ API Process -------------------

async function initUserDataHandling() {
  console.log("init UserDataHandling");

  // let historyItem = {
  //   "oldest_title": {"node": {}, "list_status": {}},
  //   "newest_title": {"node": {}, "list_status": {}},
  //   "year": 2010,
  //   "hours_watched": 10,
  //   "animes_completed": 10,
  //  }

  let prevIDs = [];
  let prevYears = [];

  // public data storage
  for (let i = 0; i < malUserData["data"].length; i++) {
    const animeID = malUserData["data"][i]["node"]["id"];
    const publicAnime = await fetchMALAnime(animeID);
    //  console.log(publicAnime);
    let finishYear = 0;
    // history data
    if (malUserData["data"][i]["list_status"]["finish_date"] != null) {
      finishYear =
        malUserData["data"][i]["list_status"]["finish_date"].split("-")[0]; // year fetched from string format : "2024-02-03"
    }

    if (!prevYears.includes(finishYear)) {
      historyData["bar_1"][finishYear] = {
        oldest_title: { node: {}, list_status: {} },
        newest_title: { node: {}, list_status: {} },
        year: finishYear,
        hours_watched: 0,
        animes_completed: 0,
      };
      prevYears.push(finishYear);
    }
    let avgEpisodeDuration = 0;
    if (publicAnime.hasOwnProperty("average_episode_duration")) {
      avgEpisodeDuration = Math.floor(
        publicAnime["average_episode_duration"]
      );
    } else {
      avgEpisodeDuration = 23; //placeholder default value old 23 mins in case there is no return value
    }

    //console.log("ep duration: "+avgEpisodeDuration);
    let episodesWatched =
      malUserData["data"][i]["list_status"]["num_episodes_watched"];
    //console.log("episodesWatched: "+episodesWatched);
    let rewatchAmount =
      malUserData["data"][i]["list_status"]["num_times_rewatched"];
    if (rewatchAmount === null || rewatchAmount === undefined) {
      rewatchAmount = 0;
    }
    //console.log("rewatchAmount: "+rewatchAmount);

    if (malUserData["data"][i]["list_status"]["status"] === "completed") {
      historyData["bar_1"][finishYear]["animes_completed"] += 1;
    }

    historyData["bar_1"][finishYear]["hours_watched"] +=
      Math.floor((avgEpisodeDuration) / 60) * episodesWatched * (rewatchAmount + 1);

    //   console.log(publicAnime);
    const obj = {};
    obj[animeID] = publicAnime;
    // console.log(prevIDs);

    if (!prevIDs.includes(animeID)) {
      prevIDs.push(animeID);
      const newObj = {};
      newObj[animeID] = publicAnime;
      publicAnimeDataObj[animeID] = publicAnime;
      // console.log("fetched 1 public anime");
    }
  }

  console.log("end of UserDataHandling");
}

async function initLVHArrayCreation() {
  console.log("init LVH array creation");

  malUserData["data"].forEach(async (element) => {
    const animeID = element["node"]["id"];
    let processedObjLVH = {};
    let processedObjHVL = {};
    const userScore = element["list_status"]["score"];
    const publicScore = publicAnimeDataObj[animeID]["mean"];

    if (publicScore <= publicScoreBadThreshold) {
      if (userScore - publicScore >= likeHateThreshold) {
        processedObjLVH["node"] = element["node"];
        processedObjLVH["public_mean"] = publicScore;
        processedObjLVH["user_score"] = element["list_status"]["score"];

        lvhAnimeObject["data"].push(processedObjLVH);
        lvhAnimeObject["count"] = lvhAnimeObject["data"].length;
        // console.log('MATCH FOUND :: ' + processedObjLVH["node"]["title"]);
      } else {
        //console.log('NO MATCH');
      }
    }
    // console.log('anime : '+ element["node"]["title"]);

    //  console.log('cmp 1: '+publicScore + " >= " + publicScoreGoodThreshold);
    //  console.log('result 1: '+ (publicScore >= publicScoreGoodThreshold));
    //  console.log('cmp 2: '+(publicScore-userScore) + " >= " + hateLikeThreshold);
    //  console.log('result 2: '+ ((publicScore-userScore) >= hateLikeThreshold));
    //  console.log('____________________________________________________________');

    if (publicScore >= publicScoreGoodThreshold) {
      if (publicScore - userScore >= hateLikeThreshold) {
        processedObjHVL["node"] = element["node"];
        processedObjHVL["public_mean"] = publicScore;
        processedObjHVL["user_score"] = element["list_status"]["score"];

        hvlAnimeObject["data"].push(processedObjHVL);
        hvlAnimeObject["count"] = hvlAnimeObject["data"].length;
        console.log("MATCH FOUND :: " + processedObjHVL["node"]["title"]);
      }
      //hvlAnimeObject
    }
  });
  console.log("end of LVH array creation");
}

//----API PROCESS END-------------------------------------------------------------------------------------

module.exports = router;
