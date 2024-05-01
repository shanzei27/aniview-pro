const axios = require("axios");

async function fetchUserGeneralsViaJikan(username) {
  const responseData = await axios.get(
    `https://api.jikan.moe/v4/users/${username}`
  );
  return responseData.data;
}

async function fetchUserStatsViaJikan(username) {
  const responseData = await axios.get(
    `https://api.jikan.moe/v4/users/${username}/statistics`
  );
  return responseData.data;
}

async function fetchUserHistory(username) {
  console.log("exec start with ::" + username);

  const responseData = await axios.get(
    `https://api.jikan.moe/v4/users/${username}/history`
  );

  return responseData.data;
}

async function fetchMALAnime(id) {
  const headers = {
    "X-MAL-CLIENT-ID": process.env.REACT_APP_CLIENT_ID,
  };

  return axios
    .get(`https://api.myanimelist.net/v2/anime/${id}?fields=num_episodes`, {
      headers,
    })
    .then((promise) => promise.data)
    .catch((e) => {
      console.error(e);
    });
}

async function fetchMALUserCompletedList(username) {
  console.log("exec start with ::" + username);
  const limit = 200;
  const headers = {
    "X-MAL-CLIENT-ID": process.env.REACT_APP_CLIENT_ID,
  };

  const responseData = await axios.get(
    `https://api.myanimelist.net/v2/users/${username}/animelist?fields=list_status,rank,mean,alternative_titles,start_date,average_episode_duration&status=completed&sort=list_updated_at&limit=${limit}`,
    { headers }
  );
  console.log("init end, response ::", responseData);
  return responseData.data;
}

// async function fetchMALAnimeViaJikan(animeID) {
//   console.log("fetch exec start with :: " + animeID);

//   const responseData = await axios.get(
//     `https://api.jikan.moe/v4/anime/${animeID}/full`
//   );

//   return responseData["data"];
// }

module.exports = {
  fetchUserGeneralsViaJikan,
  fetchUserStatsViaJikan,
  fetchUserHistory,
  fetchMALAnime,
  fetchMALUserCompletedList,
};
