const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const mongoDB = "mongodb://localhost:27017/twitter";
// Fetch all tweets
router.get('/tweets', async (req, res) => {
  try {
    const tweets = await Tweet.find({});
    res.status(200).json(tweets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;