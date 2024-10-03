const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/search", userController.searchUsers);
router.post("/:userId/follow", userController.toggleFollow);
router.get("/user", userController.getUserProfile);
router.get("/:id",userController.find);
router.get("/public/:id",userController.publicProfile);
router.get('/followed', userController.follwedUsers );
router.get('/findId', userController.userId );

module.exports = router;
