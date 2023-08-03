const User = require("../models/User");
const router = require("express").Router();
// search a user
router.get("/search", async(req, res) => {
  const username = req.query.username;
  // console.log(username);
  // const regex = new RegExp(username, 'i');
  try {
    const response = await User.find({"username":{$regex:username, $options:"i"}});
    return res.json(response);  
  } catch (error) {
    return res.status(500).json(error);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});
// update profile profilePicture
router.put("/updatePic", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.profilePicture = req.body.profilePicture;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json(error);    
  }
})
//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

router.put("/:id/updatebio", async(req, res) => {
  if(req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.body.userId);
      if(req.body.username !== "") {
        user.username = req.body.username;
      }
      if(req.body.education !== "") {
        user.education = req.body.education;
      }
      if(req.body.experience !== "") {
        user.experience = req.body.experience;
      }
      if(req.body.bio !== "") {
        user.bio = req.body.bio;
      }
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});
//get a user
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;