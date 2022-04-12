// This is only copied from the post-routes and minor changes done, all needs to be updated

const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const post = require("../models/post")
const question = require("../models/question")
const solution = require("../models/solution")
const User = require("../models/user")
const Comment = require("../models/comment")
const mailer = require("nodemailer");

const router = express.Router();

const smtpProtocol = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "kousani.sa@highradius.com",
        pass: "nnnfjzbhekyymiuk"
    }
});

router.get('/questions', async (req,res,next)=>{
    const posts = await post.find({}).exec()
    res.send(posts)
});

router.get('/questions/:uid', async (req,res,next)=>{
    const userId = req.params.uid;
    await post.find({ 'uid': userId }, function (err, posts) {
        if (!err && posts.length > 0)
            res.status(200).send(posts);
        else{
            res.status(422).send("<h4>Posts not available for the requested user </h4>")
        }
    }).clone().catch(function(err){ console.log(err)});
});

router.post('/post/questions', async (req, res, next)=>{
    const {uid, pid, title, body, role} = req.body
    console.log(role)
    const users = await User.find().exec();
    const result = users.find(user => user.id === uid)
    if (!result)
        return res.status(422).json({message: "User does not exist, hence post cannot be created"})
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const createdpost = new post({
        pid: uuidv4(),
        uid,
        approved: (role==="admin")?true:false,
        title,
        body,
        likes: [],
        dislikes: [],
        comments: 0,
        questions: 0,
        createdAt: new Date()
    })
    await createdpost.save({session: session}); 
    session.commitTransaction();
    res.status(201).send(createdpost);
    if (role!="admin"){
        var mailoption = {
            from: "kousani.sa@highradius.com",
            to: "avinash.ambrose@highradius.com",
            subject: "New Post added",
            html: `
                <p>New Idea has been added on Ideaboard! Go and check <p/>
            `
        }
        smtpProtocol.sendMail(mailoption, async function(err, response){
            if(err) {
                console.log("Error in mail sending: ",err);
                return res.status(422).json({message: "Oops! Some error occured"});
            } 
            console.log('Message Sent' + response);
            smtpProtocol.close();
        });
    }
})

router.delete('/post/questions/', async (req, res, next)=>{
    const {postId} = req.body;
    try{
        const response = await post.deleteOne({pid: postId})
        await Comment.deleteMany({pid: postId})
        res.status(202).send(response);
    } catch(err){
        console.log(err)
        res.status(500).json({message: "Post cannot be deleted"})
    }
})

router.patch('/post/questions/', async (req, res, next)=>{
    const {pid, title, body} = req.body;
    console.log(pid)
    try{
        await post.updateOne(
            { 'pid': pid }, 
            { $set: { title, body } }
        )
        await post.findOne({'pid': pid}, (err, result)=>{
            if (!err)
                res.status(250).send(result)
            else
                res.status(500).send("Something went wrong!")
        }).clone().catch(function(err){ console.log(err)});
    } catch(err) {
        console.log(err)
        return res.status(422).json({message: "Post Unavailable"})
    }
})

router.patch('/question/reaction', async (req, res, next) => {
    const {pid, uid, like} = req.body;
    try{
        if (like==1)
            await post.updateOne(
                { 'pid': pid }, 
                { $addToSet: { 'likes': uid  }, $pull: {'dislikes': uid} }
            )
        else
            await post.updateOne(
                { 'pid': pid }, 
                { $addToSet: { 'dislikes': uid  }, $pull: {'likes': uid} }
            )
        await post.findOne({'pid': pid}, (err, result)=>{
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

// router.patch('/users/posts/approvePost', async (req, res, next)=>{
//     const {pid} = req.body;
//     console.log(pid)
//     try{
//         await post.updateOne(
//             { 'pid': pid }, 
//             { $set: { approved: true } }
//         )
//         await post.findOne({'pid': pid}, (err, result)=>{
//             if (!err)
//                 res.status(250).send(result)
//             else
//                 res.status(500).send("Something went wrong!")
//         }).clone().catch(function(err){ console.log(err)});
//         var mailoption = {
//             from: "kousani.sa@highradius.com",
//             to: "babba_pnc@highradius.com, babba_pnc_interns@highradius.com",
//             subject: "New Post added",
//             html: `
//                 <p>New Idea has been added on Ideaboard! Go and check <p/>
//             `
//         }
//         smtpProtocol.sendMail(mailoption, async function(err, response){
//             if(err) {
//                 console.log("Error in mail sending: ",err);
//                 return res.status(422).json({message: "Oops! Some error occured"});
//             } 
//             console.log('Message Sent' + response);
//             smtpProtocol.close();
//         });
//     } catch(err) {
//         console.log(err)
//         return res.status(422).json({message: "Post Unavailable"})
//     }
// })

module.exports = router