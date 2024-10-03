const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const users = await userModel.find({
      $or: [
        { userName: { $regex: searchTerm, $options: 'i' } },
        { name: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Follow/Unfollow user
exports.toggleFollow = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    const userToFollow = await userModel.findById(userId);
    const follower = await userModel.findById(followerId);

    if (!userToFollow || !follower) return res.status(404).json({ message: "User not found" });

    const isFollowing = userToFollow.followers.includes(followerId);

    if (isFollowing) {
      userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== followerId.toString());
      follower.following = follower.following.filter(id => id.toString() !== userId.toString());
      await userToFollow.save();
      await follower.save();
      res.status(200).json({ message: `Unfollowed ${userToFollow.name}`, userToFollow });
    } else {
      userToFollow.followers.push(followerId);
      follower.following.push(userId);
      await userToFollow.save();
      await follower.save();
      res.status(200).json({ message: `Following ${userToFollow.name}`, userToFollow });
    }
  } catch (error) {
    console.error("Error toggling follow/unfollow:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const id = req.user.id;
    // console.log('user',id);
    const user = await userModel.findOne({ _id: id }).populate('posts');

    if (!user) return res.status(404).json({ message: 'User not found' });

    const postsWithBase64Images = user.posts.map(post => ({
      ...post._doc,
      image: post.image.data
        ? `data:${post.image.contentType};base64,${post.image.data.toString('base64')}`
        : null
    }));

    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.userName,
      avatar: user.image,
      posts: postsWithBase64Images,
      followers: user.followers,
      following: user.following
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.publicProfile = async(req, res)=>{
  const id = req.params.id;
  // console.log(id,'hhhhhhhhhhhhhhh')

  const user = await userModel.findOne({_id:id}).populate('posts');

  const postsWithBase64Images = user.posts.map(post => ({
    ...post._doc,
    image: post.image.data
      ? `data:${post.image.contentType};base64,${post.image.data.toString('base64')}`
      : null
  }));
  // console.log(user);
  // res.json(user)
  res.status(200).json({
    _id: user._id,
    name: user.name,
    username: user.userName,
    avatar: user.image,
    posts: postsWithBase64Images,
    followers: user.followers,
    following: user.following
  });
}

exports.userId = async(req,res)={
  const userId = req.user.id;
  res.status(200).json({userId});
}

exports.find =async(req, res)=>{
  const id = req.user.id;
  // console.log(id,'hhhhhhhhhhhhhhh')

  const user = await userModel.findOne({_id:id}).populate('following');
  // console.log(user.following);
  res.status(200).json(user.following);
}

exports.follwedUsers = async (req, res) => {
  const currentUserId = req.user.id; // Get user ID from query parameter
  try {
    // Find the user by ID
    const user = await userModel.findById(currentUserId);
    // console.log(user,'followed')
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch the users that the current user is following
    const followedUsers = await userModel.find({ _id: { $in: user.following } }); // Assuming 'following' is an array of user IDs

    // Send back the list of followed users
    res.status(200).json(followedUsers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
