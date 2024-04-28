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
};
