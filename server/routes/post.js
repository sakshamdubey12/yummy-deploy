const express = require("express");
const router = express.Router();
const multer = require('multer');
const postController = require("../controllers/postController");

// Setup multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/addPost", upload.single('image'), postController.addPost);
router.get("/posts", postController.getAllPosts);
router.put("/:id", postController.updatePost);
router.delete("/:postId", postController.deletePost);
router.put("/:id/like", postController.likePost);
router.put("/:id/unlike", postController.unlikePost);

router.get('/followed',postController.followedPost);

module.exports = router;
