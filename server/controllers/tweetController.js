import ENV from '../config.js'
import TweetModel from '../model/Tweet.model.js'
import UserModel from '../model/User.model.js';

export async function loadTweets(req, res){
    const username = req.query.username;
    try {
        const user = await UserModel.findOne({ username });
        if(!user) {
            return res.status(404).send({ error : "Can't find User!"});
        }
        const tweets = await TweetModel.find({ username });
        return res.status(200).send(tweets);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error in loadTweets"});
    }
}

export async function createTweet(req, res){
    try {
        const { username, content } = req.body;
        if(!username){
            return res.status(400).send({ error: "Username is required"});
        }
        if(!content){
            return res.status(400).send({ error: "Content is required"});
        }
        const newTweet = new TweetModel({ tweetId: Math.random().toString(20), username, content, date: new Date(), likes: 0, retweets: 0 });
        await newTweet.save();
        return res.status(201).send({ msg: "Tweet Created Successfully"});
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error in createTweet"});
    }
}

export async function deleteTweet(req, res){
    try{
        const {tweetId, username} = req.body;
        if(!tweetId){
            return res.status(400).send({ error: "TweetId is required"});
        }
        const tweet = await TweetModel.findOne({ tweetId });
        //check if tweet is user's tweet
        const user = req.username
        if(username != user){
            return res.status(400).send({ error: "You can only delete your own tweets"});
        }
        await tweet.delete();
        res.send({ msg: "Tweet Deleted Successfully"});
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error in deleteTweet"});
    }
}
   
