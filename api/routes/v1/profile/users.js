//
const express = require("express");
const router = express.Router();
const {
  fetchUserGeneralsViaJikan,
  fetchUserStatsViaJikan,
  fetchUserHistory,
  fetchMALAnime,
} = require("../../../services/api");

router.get("/", async (req, res, next) => {
  const data = "users api responded; request with an username";
  res.send({
    data: data,
  });
});

router.get("/:user_name", async (req, res, next) => {
  const username = req.params.user_name;
  console.log(username);
  const userHistoryData = await fetchUserHistory(username);
  const userGeneralData = await fetchUserGeneralsViaJikan(username);
  const userStatsData = await fetchUserStatsViaJikan(username);
  const processedList = await processHistory(userHistoryData["data"]);
  res.send({
    username: username,
    user_history: userHistoryData["data"],
    last_online: userGeneralData["data"]["last_online"],
    image_url: userGeneralData["data"]["images"]["webp"]["image_url"],
    top_row: {
      num_watching: userStatsData["data"]["anime"]["watching"],
      num_completed: userStatsData["data"]["anime"]["completed"],
      days_watched: userStatsData["data"]["anime"]["days_watched"],
      mean_score: userStatsData["data"]["anime"]["mean_score"],
    },
    recent_activity: processedList,
  });
});

async function processHistory(userHistoryData) {
  // const filteredArray = userHistoryData.
  let visitedArray = [];
  let processedData = [];
  for (let entries of userHistoryData) {
    if (!visitedArray.includes(entries["entry"]["mal_id"])) {
      const animeData = await fetchMALAnime(entries["entry"]["mal_id"]);
      const animeObj = {
        name: entries["entry"]["name"],
        progress: entries["increment"],
        total_episodes: animeData["num_episodes"],
      };
      console.log(animeObj);
      //pushing the mal_id to visited array to ignore it from now on
      processedData.push(animeObj);
      visitedArray.push(entries["entry"]["mal_id"]);
    }
    if (processedData.length >= 5) {
      break;
    }
  }
  return processedData;
}

module.exports = router;
