const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

// Add a new post
exports.addPost = async (req, res) => {
  const { title, description, ingredients, instructions, hashtags } = req.body;
  try {
    const user = await userModel.findOne({ _id: req.user.id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const post = await postModel.create({
      title,
      description,
      ingredients,
      instructions,
      hashtags,
      image: req.file ? {
        data: req.file.buffer,
        contentType: req.file.mimetype
      } : null,
      user: req.user.id
    });

    user.posts.push(post._id);
    await user.save();

    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user.id }).populate('posts');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const postsWithBase64Images = user.posts.map(post => ({
      ...post._doc,
      image: post.image.data
        ? `data:${post.image.contentType};base64,${post.image.data.toString('base64')}`
        : null,
      isLiked: post.likes.includes(req.user.id)
    }));

    res.status(200).json(postsWithBase64Images);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description, hashtags, ingredients, instructions, image } = req.body;
  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { title, description, hashtags, ingredients, instructions, image },
      { new: true }
    );

    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: 'Failed to update post', error });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.user.toString() !== userId) return res.status(403).json({ message: 'Unauthorized' });

    await postModel.findByIdAndDelete(postId);
    await userModel.findByIdAndUpdate(userId, { $pull: { posts: postId } });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  try {
    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.likes.includes(userId)) return res.status(400).json({ message: 'You already liked this post' });

    post.likes.push(userId);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  try {
    const post = await postModel.findById(postId);  
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.likes.includes(userId)) return res.status(400).json({ message: 'You have not liked this post' });

    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch posts for feed
exports.followedPost = async (req, res) => {
  try {
    const userId = req.user.id;
    // Find the logged-in user
    const user = await userModel.findById(userId).populate('posts')
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the list of users followed by the logged-in user
    const followedUsers = user.following;

    if (!followedUsers || followedUsers.length === 0) {
      return res.json([]); 
    }

    // Fetch posts from the followed users
    const posts = await postModel.find({ user: { $in: followedUsers } })
      .sort({ createdAt: -1 }) 
      .populate('user')
      .exec();

      const postsWithBase64Images = posts.map(post => ({
        ...post._doc, 
        image: post.image.data 
          ? `data:${post.image.contentType};base64,${post.image.data.toString('base64')}`
          : null,  
      }));

    return res.json(postsWithBase64Images);
  } catch (error) {
    console.error('Error fetching posts from followed users:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  
}