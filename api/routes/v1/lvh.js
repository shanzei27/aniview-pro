var express = require("express");
var router = express.Router();
const { fetchMALUserCompletedList, getTopMALAnimes } = require("../../services/api");
const { shuffleArray } = require("../../utils");

//score threshold vars
const publicScoreBadThreshold = 7.25; //score to determine worse than avg anime - anything below this value
const likeHateThreshold = 0.45; //score threshold to check
const publicScoreGoodThreshold = 7.25;
const hateLikeThreshold = 1.25;
const userPrefThreshold = 8;    // to determine which are user preferences - to derive recommendations

//storage vars
let userWatchedIDs = [];
let userPrefAnimes = [];
let userPrefGenres = [];
let mostPreferredGenres = [];
let popularUnwatchedMatches = [];
let malUserData = [];
let animeGeneralStatsDataObj = {};
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
  animeGeneralStatsDataObj = {};
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
  malUserData = await fetchMALUserCompletedList(username);
  if (malUserData["data"].length === 0 || malUserData["data"] === null) {
    res.send({
      error: "not_found",
    });
  } else {
    await initUserDataHandling();
    await initLVHArrayCreation();
    await initRecommendationGen();
    res.send({
      userLikes: lvhAnimeObject,
      userHates: hvlAnimeObject,
      historyPage: historyData,
      rawData: malUserData,
      recommendations: {
        r1: popularUnwatchedMatches
      },
      userPrefs: {
        genres: userPrefGenres,
        topRatedGenres: mostPreferredGenres
      },
      // rawDataPub: animeGeneralStatsDataObj
    });
  }
});

async function initRecommendationGen() {
  const topMALAnimes = await getTopMALAnimes();
  shuffleArray(topMALAnimes["data"]);

  for (anime of topMALAnimes["data"]) {
    const animeGenres = anime["genres"].map((e) => e.name);
    if (animeGenres.filter(value => mostPreferredGenres.includes(value)).length > 0) {
      if(!userWatchedIDs.includes(anime["mal_id"])){
        popularUnwatchedMatches.push(anime);

        if(popularUnwatchedMatches.length >= 5){
          break;
        }
      }
    }
  }
}

// ------------ API Process -------------------

async function initUserDataHandling() {
  console.log("init UserDataHandling");
  // let userPrefAnimes = [];
  // let userPrefGenres = [];

  // let historyItem = {
  //   "oldest_title": {"node": {}, "list_status": {}},
  //   "newest_title": {"node": {}, "list_status": {}},
  //   "year": 2010,
  //   "hours_watched": 10,
  //   "animes_completed": 10,
  //  }

  let prevIDs = [];
  let prevYears = [];

  for (let i = 0; i < malUserData["data"].length; i++) {
    const animeID = malUserData["data"][i]["node"]["id"];
    userWatchedIDs.push(animeID);     // stored for later use in recommendation gen
    const animeGeneralStats = malUserData["data"][i]["node"]; //await fetchMALAnime(animeID);

    if(malUserData["data"][i]["list_status"]["score"] >= userPrefThreshold){
      userPrefAnimes.push(animeID);
      userPrefGenres.push(animeGeneralStats["genres"]);
    }

    let unknownFinishData = 0;
    //  console.log(animeGeneralStats);
    let finishYear = 0;
    // history data
    if (
      malUserData["data"][i]["list_status"]["finish_date"] != null &&
      malUserData["data"][i]["list_status"]["finish_date"] != undefined
    ) {
      finishYear =
        malUserData["data"][i]["list_status"]["finish_date"].split("-")[0]; // year fetched from string format : "2024-02-03"
    } else {
      unknownFinishData += 1;
    }

    if (finishYear != 0 && !prevYears.includes(finishYear)) {
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
    if (animeGeneralStats.hasOwnProperty("average_episode_duration")) {
      avgEpisodeDuration = animeGeneralStats["average_episode_duration"];
    } else {
      avgEpisodeDuration = 1440; //placeholder default value of 23 mins in case there is no return value
    }

    let episodesWatched = 0;
    if (
      malUserData["data"][i]["list_status"]["num_episodes_watched"] != null &&
      malUserData["data"][i]["list_status"]["num_episodes_watched"] != undefined
    ) {
      episodesWatched =
        malUserData["data"][i]["list_status"]["num_episodes_watched"];
    }
    let rewatchAmount = 0;
    if (
      malUserData["data"][i]["list_status"]["num_times_rewatched"] != null &&
      malUserData["data"][i]["list_status"]["num_times_rewatched"] != undefined
    ) {
      rewatchAmount =
        malUserData["data"][i]["list_status"]["num_times_rewatched"];
    }

    if (rewatchAmount === null || rewatchAmount === undefined) {
      rewatchAmount = 0;
    }

    if (historyData["bar_1"].hasOwnProperty(finishYear)) {
      if (malUserData["data"][i]["list_status"]["status"] === "completed") {
        historyData["bar_1"][finishYear]["animes_completed"] += 1;
      }
      const watchTimeInSeconds =
        Math.floor(avgEpisodeDuration) * episodesWatched * (rewatchAmount + 1);
      historyData["bar_1"][finishYear]["hours_watched"] += Math.round(
        ((watchTimeInSeconds / 3600) * 100) / 100
      );
    }

    const obj = {};
    obj[animeID] = animeGeneralStats;
    // console.log(prevIDs);

    if (!prevIDs.includes(animeID)) {
      prevIDs.push(animeID);
      const newObj = {};
      newObj[animeID] = animeGeneralStats;
      animeGeneralStatsDataObj[animeID] = animeGeneralStats;
      // console.log("fetched 1 public anime");
    }
  }
  userPrefGenres = userPrefGenres.flat();
  userPrefGenres = userPrefGenres.map((e) => e.name);
  mostPreferredGenres = getMostFoundElFromArr(userPrefGenres, 6);
  console.log("end of UserDataHandling");
}

async function initLVHArrayCreation() {
  console.log("init LVH array creation");

  malUserData["data"].forEach(async (element) => {
    const animeID = element["node"]["id"];
    let processedObjLVH = {};
    let processedObjHVL = {};
    const userScore = element["list_status"]["score"];
    const publicScore = animeGeneralStatsDataObj[animeID]["mean"];

    if (publicScore <= publicScoreBadThreshold) {
      if (userScore - publicScore >= likeHateThreshold) {
        processedObjLVH["node"] = element["node"];
        processedObjLVH["public_mean"] = publicScore;
        processedObjLVH["user_score"] = element["list_status"]["score"];

        lvhAnimeObject["data"].push(processedObjLVH);
        lvhAnimeObject["count"] = lvhAnimeObject["data"].length;
      }
    }

    if (publicScore >= publicScoreGoodThreshold) {
      if (publicScore - userScore >= hateLikeThreshold) {
        processedObjHVL["node"] = element["node"];
        processedObjHVL["public_mean"] = publicScore;
        processedObjHVL["user_score"] = element["list_status"]["score"];

        hvlAnimeObject["data"].push(processedObjHVL);
        hvlAnimeObject["count"] = hvlAnimeObject["data"].length;
       // console.log("MATCH FOUND :: " + processedObjHVL["node"]["title"]);
      }
    }
  });
  console.log("end of LVH array creation");
}

//----API PROCESS END-------------------------------------------------------------------------------------

function getMostFoundElFromArr(arr, n) {
  const count = {};

  // Count occurrences of each string
  arr.forEach(str => {
      count[str] = (count[str] || 0) + 1;
  });

  // Convert the object into an array of [string, count] pairs
  const countArray = Object.entries(count);

  // Sort the array based on the count in descending order
  countArray.sort((a, b) => b[1] - a[1]);
  const topN = countArray.slice(0, n);

  return topN.map(pair => pair[0]);
}

module.exports = router;
