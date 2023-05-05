import ENV from "../config.js";
import TweetModel from "../model/Tweet.model.js";
import UserModel from "../model/User.model.js";

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

export async function loadTweets(req, res) {
  const { username } = req.query;
  //console.log("username: ", username)
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "Can't find User!" });
    }
    const tweets = await TweetModel.find({ username });
    return res.status(200).send(tweets);
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Internal Server Error in loadTweets" });
  }
}

export async function loadAllTweets(req, res) {
  try {
    const tweets = await TweetModel.find({}, { tweetId: 1, _id: 0 })
      .sort({ date: "desc" })
      .exec();
    res.status(200).json({ tweets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createTweet(req, res) {
  try {
    const { nickname, username, content, profile, images } = req.body;
    if (!username) {
      return res.status(400).send({ error: "Username is required" });
    }

    if (!content) {
      return res.status(400).send({ error: "Content is required" });
    }

    const newTweet = new TweetModel({
      nickname,
      tweetId: Math.random().toString(20),
      profile,
      username,
      content,
      images,
      date: new Date(),
      likes: 0,
      retweets: 0,
      likedUsers: [],
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

export async function deleteTweet(req, res) {
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
    const { key, authorname, username } = req.query;
    let tweets;

    if (key) {
      tweets = await TweetModel.find({
        content: { $regex: key, $options: "i" },
      }).sort({ date: -1 });
    } else if (authorname) {
      tweets = await TweetModel.find({ username: authorname }).sort({
        date: -1,
      });
    } else if (username) {
      const user = await UserModel.findOne({ username: username }).populate(
        "following"
      );
      const followingUsernames = user.following;
      tweets = await TweetModel.find({
        username: { $in: followingUsernames },
      }).sort({ date: -1 });
    } else {
      tweets = await TweetModel.find({}).sort({ date: -1 });
    }

    if (tweets.length === 0) {
      return res.status(404).send({ error: "No tweets found" });
    }

    res.status(200).send({ tweets });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

/*
  This function performs a like operation on a tweet and will update corresponding information
  of this tweet in the database.
*/
export async function likeTweet(req, res) {
  console.log("invoked likeTweet()");
  try {
    const { username, tweetId } = req.body;
    if (!tweetId) {
      //tweet id is empty
      return res.status(400).send({ error: "TweetId is required" });
    }
    if (!username) {
      //username is empty
      return res.status(400).send({ error: "Username is required" });
    }
    //find the tweet in the database first
    const tweet = await TweetModel.findOne({ tweetId });
    if (!tweet) {
      //cannot find tweet
      return res.status(404).send({ error: "Tweet not found" });
    }
    /*
      Update the tweet. Detailed updates are:
      increase the number of likes by 1; add the user to the list of liked users of this tweet.
    */
    const updatedTweet = await TweetModel.findByIdAndUpdate(
      tweet._id,
      { $inc: { likes: 1 }, $push: { likedUsers: username } },
      { new: true }
    );
    updatedTweet.likes++; // Manually increment the likes count since Mongoose doesn't update the document instance
    res.json(updatedTweet);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

/*
  This function performs a unlike operation on a tweet and will update corresponding information
  of this tweet in the database.
*/
export async function unlikeTweet(req, res) {
  try {
    const { username, tweetId } = req.body;
    //find the tweet in the database first
    const tweet = await TweetModel.findOne({ tweetId });

    if (!tweet) {
      //cannot find tweet
      return res.status(404).json({
        message: "Tweet not found",
      });
    }

    // Remove userId from likes array
    const likedUsers = tweet.likedUsers.filter(
      (like) => like.toString() !== username
    );

    /*
      Update the tweet. Detailed updates are:
      decrease the number of likes by 1; change the liked list of the tweet to the new list without
      this user's id.
    */
    const updatedTweet = await TweetModel.findByIdAndUpdate(
      tweet._id,
      { $inc: { likes: -1 }, $set: { likedUsers: likedUsers } },
      { new: true }
    );
    updatedTweet.likes--; // Manually increment the likes count since Mongoose doesn't update the document instance

    res.status(200).json({
      message: "Tweet unliked successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

/*
  This function performs a retweet operation on a tweet and will generate a new tweet with type retweet
  into the database.
*/
export async function reTweet(req, res) {
  console.log("invoked reTweet()");
  try {
    const { username, tweetId } = req.body;

    if (!username) {
      //username is empty
      return res.status(400).send({ error: "Nickname is required" });
    }

    if (!tweetId) {
      //tweet id is empty
      return res.status(400).send({ error: "Original tweet ID is required" });
    }
    //find the tweet in the database first
    const tweet = await TweetModel.findOne({ tweetId });

    if (!tweet) {
      //cannot find tweet
      console.log("cannot find tweet.");
      return res.status(404).send({ error: "Tweet not found" });
    }

    /*
      Generate a new tweet which has the following properties:
      Everything else is the same with original tweet except:
      tweetId is newly generated;
      date is the current retweet time;
      retweets is the original retweet plus one because at this time the old tweet has not been modified yet;
      isRetweet set to true;
      retweetUser, originalTime is set.
      This generates a retweet which displays the original tweet as well as its retweet information.
    */
    const newTweet = new TweetModel({
      tweetId: Math.random().toString(20),
      nickname: tweet.nickname,
      username: tweet.username,
      content: tweet.content,
      images: tweet.images,
      profile: tweet.profile,
      date: new Date(),
      likes: tweet.likes,
      retweets: tweet.retweets + 1,
      isRetweet: true,
      retweetUser: username,
      originalTime: tweet.date,
      likedUSers: tweet.likedUsers,
    });
    await newTweet.save();
    //modify the original tweet, increase retweets by 1
    const originalTweet = await TweetModel.findByIdAndUpdate(
      tweet._id,
      { $inc: { retweets: 1 } },
      { new: true }
    );
    originalTweet.retweets++;

    res.status(201).json({ tweetId: newTweet.tweetId });
  } catch (error) {
    console.error("error in reTweet: ", error);
    return res.status(500).send({ error: "Internal Server Error in reTweet" });
  }
}
