import ENV from '../config.js'
import TweetModel from '../model/Tweet.model.js';
import UserModel from '../model/User.model.js';

export async function getTweetById(req, res) {
    const { tweetId } = req.query;
    //("req.query: ", req.query)
    try {
      const tweet = await TweetModel.findOne({ tweetId });
  
      if (!tweet) {
        return res.status(404).send({ error: "Tweet not found" });
      }
  
      res.json(tweet);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

export async function loadTweets(req, res){
    const {username} = req.query;
    //console.log("username: ", username)
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

export async function loadAllTweets(req, res) {
    try {
      const tweets = await TweetModel.find({}, { tweetId: 1, _id: 0 }).sort({ date: "desc" }).exec();
      res.status(200).json({ tweets });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


export async function createTweet(req, res) {
  try {
    const { nickname ,username, content, images} = req.body;
    
    if (!username) {
      return res.status(400).send({ error: "Username is required" });
    }

    if (!content ) {
      return res.status(400).send({ error: "Content is required" });
    }

    const newTweet = new TweetModel({
      tweetId: Math.random().toString(20),
      nickname,
      username,
      content,
      images,
      date: new Date(),
      likes: 0,
      retweets: 0,
    });
    await newTweet.save();

    res.status(201).json({ tweetId: newTweet.tweetId });
  } catch (error) {
    console.error("error in createTweet: ", error);
    return res
      .status(500)
      .send({ error: "Internal Server Error in createTweet" });
  }
}

export async function deleteTweet(req, res){
    const { tweetId } = req.body;
    if (!tweetId) {
        return res.status(400).send({ error: "TweetId is required" });
    }
    try {
        const tweet = await TweetModel.findOne({ tweetId: tweetId });
        console.log("tweetId: ", tweetId);
        if (!tweet) {
            return res.status(404).send({ error: "Tweet not found" });
        }
        await tweet.deleteOne();
        res.status(200).send({ message: "Tweet deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}


export async function searchTweets(req, res) {
try {
    const { key } = req.query;
    if (!key) {
    return res.status(400).send({ error: "Keyword is required" });
    }

    const tweets = await TweetModel.find({ content: { $regex: key, $options: "i" } });
    if (tweets.length === 0) {
    return res.status(404).send({ error: "No tweets found for the keyword" });
    }

    res.status(200).send({ tweets });
} catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
}
}
  
export async function likeTweet(req, res) {
try {
    const { username } = req.body;
    const { tweetId } = req.query;
    if (!tweetId) {
    return res.status(400).send({ error: "TweetId is required" });
    }
    if (!username) {
    return res.status(400).send({ error: "Username is required" });
    }
    const tweet = await TweetModel.findOne({ tweetId });
    if (!tweet) {
    return res.status(404).send({ error: "Tweet not found" });
    }
    const updatedTweet = await TweetModel.findByIdAndUpdate(
    tweet._id,
    { $inc: { likes: 1 } },
    { new: true }
    );
    updatedTweet.likes++; // Manually increment the likes count since Mongoose doesn't update the document instance
    res.json(updatedTweet);
} catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
}
}


export async function unlikeTweet (req, res) {
  try {
    const tweetId = req.body.tweetId;
    const userId = req.user.userId;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
      });
    }

    // Remove userId from likes array
    const likes = tweet.likes.filter((like) => like.toString() !== userId);

    tweet.likes = likes;
    await tweet.save();

    res.status(200).json({
      message: "Tweet unliked successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
