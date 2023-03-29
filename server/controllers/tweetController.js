import Tweet from '../model/Tweet.model.js';

async function createTweet (req, res) {
    const body = req.body;
    
    if (!body) {
        return res.status(400).json({
        success: false,
        error: "You must provide a tweet",
        });
    }
    
    const tweet = new Tweet(body);
    
    if (!tweet) {
        return res.status(400).json({ success: false, error: err });
    }
    
    tweet
        .save()
        .then(() => {
        return res.status(201).json({
            success: true,
            id: tweet._id,
            message: "Tweet created!",
        });
        })
        .catch((error) => {
        return res.status(400).json({
            error,
            message: "Tweet not created!",
        });
        });
    }

async function deleteTweet(req, res){
    await Tweet.findOneAndDelete({ _id: req.params.id }, (err, tweet) => {
        if (err) {
        return res.status(400).json({ success: false, error: err });
        }
    
        if (!tweet) {
        return res.status(404).json({ success: false, error: `Tweet not found` });
        }
    
        return res.status(200).json({ success: true, data: tweet });
    }).catch((err) => console.log(err));
    }

async function getTweetById (req, res){
    await Tweet.findOne({ _id: req.params.id }, (err, tweet) => {
        if (err) {
        return res.status(400).json({ success: false, error: err });
        }
    
        if (!tweet) {
        return res.status(404).json({ success: false, error: `Tweet not found` });
        }
        return res.status(200).json({ success: true, data: tweet });
    }).catch((err) => console.log(err));
    }

async function getTweets (req, res){
    await Tweet.find({}, (err, tweets) => {
        if (err) {
        return res.status(400).json({ success: false, error: err });
        }
        if (!tweets.length) {
        return res
            .status(404)
            .json({ success: false, error: `Tweet not found` });
        }
        return res.status(200).json({ success: true, data: tweets });
    }).catch((err) => console.log(err));
    }

export default {
    createTweet,
    deleteTweet,
    getTweets,
    getTweetById
}