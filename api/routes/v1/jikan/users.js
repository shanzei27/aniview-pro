//
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

async function fetchUserHistory(username) {
  console.log("exec start with ::"+ username);

  const responseData = await axios.get(`https://api.jikan.moe/v4/users/${username}/history`);

  return responseData.data;   
}

module.exports = router;
