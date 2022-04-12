const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const Comment = require("../models/comment");
const Post = require("../models/post");

const router = express.Router();

router.get('/posts/comments/:pid', async (req,res,next)=>{
    const postId = req.params.pid;
    const post = await Post.find({ 'pid': postId });
    if(post.length>0)
        await Comment.find({ 'pid': postId }, function (err, comments) {
            if (!err){
                res.status(200).send(comments);
            }
            else{
                res.status(404).json({message: "Comments not available for the given post"})
            }
        }).clone().catch(function(err){ console.log(err)});
    else
    res.status(404).json({message: "Page not found"})
});

router.post('/posts/comments', async (req, res, next)=>{
    const {uid, pid, body} = req.body
    const session = await mongoose.startSession();
    session.startTransaction();
    const createdComment = new Comment({
        uid,
        pid,
        body,
        likes: [],
        dislikes: [],
        cid: uuidv4()
    })
    await createdComment.save({session: session}); 
    session.commitTransaction();
    await Post.updateOne(
        { 'pid': pid }, 
        { $inc : { "comments": 1} }
    )
    res.status(201).send(createdComment);
})

router.patch('/comments/reaction', async (req, res, next) => {
    const {cid, uid, like} = req.body;
    try{
        if (like==1)
            await Comment.updateOne(
                { 'cid': cid }, 
                { $addToSet: { 'likes': uid  }, $pull: {'dislikes': uid} }
            )
        else
            await Comment.updateOne(
                { 'cid': cid }, 
                { $addToSet: { 'dislikes': uid  }, $pull: {'likes': uid} }
            )
        await Comment.findOne({'cid': cid}, (err, result)=>{
            if (!err)
                res.status(250).send(result)
            else
                res.status(500).json({message: "Something went wrong!"})
        }).clone().catch(function(err){ console.log(err)});
    } catch(err) {
        console.log(err)
        return res.status(422).json({message: "Something went wrong or Post Unavailable"})
    }
})

router.patch('/posts/comments', async (req, res, next)=>{
    const {cid, body} = req.body;
    try{
        await Comment.updateOne(
            { 'cid': cid }, 
            { $set: { body } }
        )
        await Comment.findOne({'cid': cid}, (err, result)=>{
            if (!err)
                res.status(250).send(result)
            else
                res.status(500).send("Something went wrong!")
        }).clone().catch(function(err){ console.log(err)});
    } catch(err) {
        console.log(err)
        return res.status(422).json({message: "Comment Unavailable"})
    }
})

router.delete('/posts/comments/', async (req, res, next)=>{
    const {commentId} = req.body;
    try{
        const {pid} = await Comment.findOne({'cid': commentId}, "pid")
        const response = await Comment.deleteOne({cid: commentId})
        await Post.updateOne(
            { 'pid': pid }, 
            { $inc : { "comments": -1} }
        )
        res.status(202).send(response);
    } catch(err){
        console.log(err)
        res.status(500).json({message: "Comment cannot be deleted"})
    }
})

module.exports = router