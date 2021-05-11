const { request } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requiredLogin = require("../middleware/requiredLogin");
const Post = mongoose.model("Post");

router.get("/allposts",requiredLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
      console.log(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", requiredLogin, (req, res) => {
  const { title, body, photo } = req.body;
  if (!title || !body || !photo) {
    console.log(title, body, photo);
    return res.status(422).json({ error: "please add all the fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", requiredLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/like',requiredLogin, (req, res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
    $push:{likes:req.user._id}
  },{new:true}).exec((err,result)=>{
  if(err){
    return res.status(422).json({ error: err})

  }else{
    res.json(result)
  }
})
})
router.put('/unlike',requiredLogin, (req, res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.user._id}
  },{new:true}).exec((err,result)=>{
  if(err){
    return res.status(422).json({ error: err})

  }else{
    res.json(result)
  }
})
})

module.exports = router;
