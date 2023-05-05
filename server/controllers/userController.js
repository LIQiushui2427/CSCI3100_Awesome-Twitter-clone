import UserModel from '../model/User.model.js'
/*
User Controller includes the functions that are used to handle the requests related to users.
*/
export async function follow(req, res) {
    const { follower, followee } = req.body;
    console.log("Follower: ", follower, "Followee: ", followee);
  
    const followerUser = await UserModel.findOne({username:follower});
    const followeeUser = await UserModel.findOne({username:followee});
    
    console.log("FollowerUser: ", followerUser, "FolloweeUser: ", followeeUser);
    if (!followerUser || !followeeUser) {
      return res.status(404).json({ message: 'Follow: Followee or follower not found' });
    }

    if(followerUser.username === followeeUser.username){
      return res.status(404).json({ message: 'Follow: Cannot follow yourself' });
    }
    if (followerUser.following.includes(followee)) {
      return res.status(404).json({ message: 'Follower: Already followed' });
    }
  
    followerUser.following.push(followee);
    followeeUser.followers.push(follower);
    await followerUser.save();
    await followeeUser.save();
  
    return res.status(200).json({ message: 'Followed successfully' });
  }
  
  export async function unfollow(req, res) {
    try {
      const { follower, followee } = req.body;
      console.log("Follower: ", follower, "Followee: ", followee);
      const followerUser = await UserModel.findOne({ username: follower });
      const followeeUser = await UserModel.findOne({ username: followee });
      
      if (!followerUser || !followeeUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (!followerUser.following.includes(followeeUser.username)) {
        return res.status(400).json({ message: "User is not followed" });
      }
  
      // Remove followee from follower's following list
      followerUser.following = followerUser.following.filter(
        (username) => username !== followeeUser.username
      );
      await followerUser.save();
  
      // Remove follower from followee's followers list
      followeeUser.followers = followeeUser.followers.filter(
        (username) => username !== followerUser.username
      );
      await followeeUser.save();
  
      return res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  
// Get followers of a user
export async function getFollowers(req, res) {
    try {
      const { username } = req.query;
      console.log("Username in getFollowers: ", username)
      const user = await UserModel.findOne({ username }).populate('following');
      const followers = user.followers;
      res.json(followers);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  
  // Get following of a user
  export async function getFollowing(req, res) {
    try {
      const { username } = req.query;
      const user = await UserModel.findOne({ username }).populate('followers');
      const following = user.following;
      res.json(following);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  
  // Get number of followers for a user
  export async function getFollowersCount(req, res) {
    try {
      const { username } = req.params;
      const user = await UserModel.findOne({ username });
      const count = user.followers.length;
      res.json(count);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  
  // Get number of following for a user
  export async function getFollowingCount(req, res) {
    try {
      const { username } = req.params;
      const user = await UserModel.findOne({ username });
      const count = user.following.length;
      res.json(count);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  