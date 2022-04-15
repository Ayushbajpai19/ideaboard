// This is only copied from the post-routes and minor changes done, all needs to be updated

const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const post = require("../models/post")
const question = require("../models/question")
const solution = require("../models/solution")
// const User = require("../models/user")
// const Comment = require("../models/comment")
const mailer = require("nodemailer");

const router = express.Router();

const smtpProtocol = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "kousani.sa@highradius.com",
        pass: "nnnfjzbhekyymiuk"
    }
});

// Get all the questions, not to be used in regular
router.get('/questions', async (req,res,next)=>{
    const ques = await question.find({}).exec()
    res.send(ques)
});

// Get a single question with it's _id
router.get('/questions/:qid', async (req,res,next)=>{
    const qid = req.params.qid;
    await question.find({ '_id': qid }, function (err, ques) {
        if (!err && ques.length > 0)
            res.status(200).send(ques);
        else{
            res.status(422).send("<h4>Posts not available for the requested user </h4>")
        }
    }).clone().catch(function(err){ console.log(err)});
});

// Get all the questions of a post
router.get('/post/questions/:pid', async (req,res,next)=>{
    const pid = req.params.pid; // params.pid would be the _id of the current post
    await question.find({ 'pid': pid }, function (err, posts) {
        if (!err && posts.length > 0)
            res.status(200).send(posts);
        else{
            res.status(422).send("<h4>Posts not available for the requested user </h4>")
        }
    }).clone().catch(function(err){ console.log(err)});
});

// Create a new question
router.post('/post/questions', async (req, res, next)=>{
    const {pid, uid, ques, sols } = req.body
    console.log(role)

    // const session = await mongoose.startSession();
    // session.startTransaction();

    const createdQues = new post({
        pid: pid,
        uid, 
        ques: ques,
        sols: 0,
        upvotes: []
    })
    let postId = await createdQues.save(); 
    // let postId = await createdQues.save({session: session}); 
    // session.commitTransaction();
    res.status(201).send(createdQues);
    // if (role!="admin"){
    //     var mailoption = {
    //         from: "kousani.sa@highradius.com",
    //         to: "avinash.ambrose@highradius.com",
    //         subject: "New Post added",
    //         html: `
    //             <p>New Idea has been added on Ideaboard! Go and check <p/>
    //         `
    //     }
    //     smtpProtocol.sendMail(mailoption, async function(err, response){
    //         if(err) {
    //             console.log("Error in mail sending: ",err);
    //             return res.status(422).json({message: "Oops! Some error occured"});
    //         } 
    //         console.log('Message Sent' + response);
    //         smtpProtocol.close();
    //     });
    // }
})

router.delete('/post/question', async (req, res, next)=>{
    const {quesId} = req.body;
    try{
        const response = await question.deleteOne({_id: quesId})
        await solution.deleteMany({qid: quesId})
        res.status(202).send(response);
    } catch(err){
        console.log(err)
        res.status(500).json({message: "Post cannot be deleted"})
    }
})

router.patch('/post/question', async (req, res, next)=>{
    const {qid, ques} = req.body; // qid is the _id of the Question
    console.log(pid)
    try{
        await post.updateOne(
            { '_id': qid }, 
            { $set: { ques } }
        ).then((updatedQues) => {
            res.status(250).send(updatedQues)
        })
        // await question.findOne({'_id': qid}, (err, result)=>{
        //     if (!err)
        //         res.status(250).send(result)
        //     else
        //         res.status(500).send("Something went wrong!")
        // }).clone().catch(function(err){ console.log(err)});
    } catch(err) {
        console.log(err)
        return res.status(422).json({message: "Post Unavailable"})
    }
})

router.patch('/question/upvote', async (req, res, next) => {
    const {qid, uid, upvote} = req.body;
    try{
        if (upvote==1)
            await question.updateOne(
                { '_id': qid }, 
                { $addToSet: { 'upvotes': uid  }}
            ).then((updatedVotes) => {
                res.status(250).send(updatedVotes)
            })
        // else
        //     await question.updateOne(
        //         { '_id': qid }, 
        //         { $addToSet: { 'dislikes': uid  }, $pull: {'likes': uid} }
        //     )

        // await post.findOne({'pid': pid}, (err, result)=>{
        //     if (!err)
        //         res.status(250).send(result)
        //     else
        //         res.status(500).json({message: "Something went wrong!"})
        // }).clone().catch(function(err){ console.log(err)});
    } catch(err) {
        console.log(err)
        return res.status(422).json({message: "Something went wrong or Post Unavailable"})
    }
})

module.exports = router