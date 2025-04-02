const Post= require("../models/post.model");
//const path = require("path");
 
//fetch all posts
exports.getPosts = async(req,res)=>{
    try{
        const posts = await Post.find().sort({createAt: -1});
        res.json(posts);
    } catch(error){
        res.status(500).json({error:"Failedto fetch posts"});
    }
};
 
//create new post
exports.createPost=async(req,res)=>{
    try{
        const{ text } = req.body;
        let mediaPath="";
        let mediaType="none";
 
        if(req.file){
            mediaPath=`/uploads/${req.file.filename}`;
            mediaType=req.file.mimetype.startsWith("image")?"image":"video";
        }
 
        const newPost = new Post({text, media: mediaPath, mediaType});
        await newPost.save();
        res.status(201).json(newPost);
    } catch(error){
        res.status(500).json({error:"Error creating post"});
    }
};