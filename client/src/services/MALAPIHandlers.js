import axios from 'axios';

const userProfileAnimeListURL = 'https://api.myanimelist.net/v2/users/zednine/animelist?status=completed&fields=list_status&limit=50';
//const animeURL = `https://api.myanimelist.net/v2/anime/${id}?fields=rank,mean,alternative_titles`;

export const fetchMALAnime = async (id) => {
    console.log("exec start with ::"+id);
    const headers = {
        'X-MAL-CLIENT-ID': process.env.REACT_APP_CLIENT_ID
    };
    
    return axios.get(`https://api.myanimelist.net/v2/anime/${id}?fields=rank,mean,alternative_titles`, { headers })
    .then(promise => promise.data)
    .catch(e => {
        console.error(e);
    });
}

export const fetchMALUserAnimeList = async (username) => {
    console.log("exec start with ::"+username);
    const headers = {
        'X-MAL-CLIENT-ID': process.env.REACT_APP_CLIENT_ID
    };
    
    return axios.get(`https://api.myanimelist.net/v2/users/${username}/animelist?status=completed&fields=list_status&limit=50`, { headers })
    .then(promise => promise.data)
    .catch(e => {
        console.error(e);
    });
}