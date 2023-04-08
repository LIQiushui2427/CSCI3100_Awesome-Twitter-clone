/*

import ENV from '../config.js'
import TweetModel from '../model/Tweet.model.js'
import UserModel from '../model/User.model.js';



export async function getUserProfile(req, res){
    const {username} = req.query;
    //console.log("username: ", username)
    try {
        const user = await UserModel.findOne({ username });
        if(!user) {
            return res.status(404).send({ error : "Can't find User!"});
        }
        const tweets = await TweetModel.find({ username: {username} });
        
        const replied_tweet_id = user.replies.map(reply => reply.TweetId);
        const replied_tweet_content= user.replies.map(reply => reply.reply_content);
        const replied_tweet = await TweetModel.find({TweetId : {replied_tweet_id }});
        const reply=replied_tweet.map((value,index)=>[value,replied_tweet_content[index]]);

        
        const userProfile = {user, tweets,replies,liked};
        
        return res.status(200).send(userProfile);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error in loadTweets"});
    }
}





*/





