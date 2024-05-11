const axios = require("axios");

async function fetchUserGeneralsViaJikan(username) {
  return axios
    .get(`https://api.jikan.moe/v4/users/${username}`)
    .then((promise) => promise.data)
    .catch((e) => {
      console.error(e);
    });
}

async function fetchUserStatsViaJikan(username) {
  return axios
    .get(`https://api.jikan.moe/v4/users/${username}/statistics`)
    .then((promise) => promise.data)
    .catch((e) => {
      console.error(e);
    });
}

async function fetchUserHistory(username) {
  return axios
    .get(`https://api.jikan.moe/v4/users/${username}/history`)
    .then((promise) => promise.data)
    .catch((e) => {
      console.error(e);
    });
}

async function getTopMALAnimes() {
  return axios
  .get("https://api.jikan.moe/v4/top/anime?sfw")
  .then((promise) => promise.data)
  .catch((e) => {
    console.error(e);
  });
}

async function getRecsForAnime(id) {
  return axios
  .get(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
  .then((promise) => promise.data)
  .catch((e) => {
    console.error(e);
  });
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
  const limit = 200;
  const headers = {
    "X-MAL-CLIENT-ID": process.env.REACT_APP_CLIENT_ID,
  };

  const responseData = await axios.get(
    `https://api.myanimelist.net/v2/users/${username}/animelist?fields=list_status,rank,mean,genres,start_date,average_episode_duration&status=completed&sort=list_updated_at&limit=${limit}`,
    { headers }
  );
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
  getRecsForAnime,
  getTopMALAnimes,
  fetchMALAnime,
  fetchMALUserCompletedList,
};
