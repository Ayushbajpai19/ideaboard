// This is only copied from the post-routes and minor changes done, all needs to be updated

const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
// const post = require("../models/post")
const question = require("../models/question")
const solution = require("../models/solution")
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

// router.get('/solutions', async (req,res,next)=>{
//     const solutions = await post.find({}).exec()
//     res.send(solutions)
// });

// /solution is not for any particular output
router.get('/solution', async (req,res,next)=>{
    const solId = req.body._id;
    // await solution.find({"_id": solId}, function (err, solution) {
    //     if (!err && posts.length > 0)
    //         res.status(200).send(posts);
    //     else{
    //         res.status(422).send("<h4>Posts not available for the requested user </h4>")
    //     }
    // }).clone().catch(function(err){ console.log(err)});
    let solution = await solution.findById(solId);
});

// Find all the solutions for a given question (Basic test done)
router.get('/question/solutions', async (req,res,next)=>{
    const qid = req.body.qid;
    console.log("qid get: ", qid);
    await solution.find({ 'qid': qid }, function (err, sols) {
        if (!err && sols.length > 0)
            res.status(200).send(sols);
        else{
            res.status(422).send("<h4>Solutions not available for the requested Question </h4>"+err)
        }
    }).clone().catch(function(err){ console.log(err)});
});

// Find all the solutions by a given User 
router.get('/user/solutions', async (req,res,next)=>{
    const userId = req.params.uid;
    await solution.find({ 'uid': userId }, function (err, sols) {
        if (!err && sols.length > 0)
            res.status(200).send(sols);
        else{
            res.status(422).send("<h4>Solutions not available for the requested user </h4>")
        }
    }).clone().catch(function(err){ console.log(err)});
});

// Create a new solution by the user for a question (Basic Test Done)
router.post('/question/solutions', async (req, res, next)=>{
    const {qid, uid, sol} = req.body
    // const session = await mongoose.startSession();
    // session.startTransaction();

    console.log(qid, uid, sol);
    
    const createdSol = new solution({
        // pid: uuidv4(),
        qid,
        uid,
        sol: sol,
        upvotes: [],
        createdAt: new Date()
    })
    await createdSol.save(); 
    // await createdpost.save({session: session}); 
    // session.commitTransaction();

    res.status(201).send(createdSol);
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

// Delete the solution (Basic Work flow test done (No Logic test))
router.delete('/question/solution', async (req, res, next)=>{
    const {_id} = req.body;
    try{
        const response = await solution.findByIdAndRemove(_id)
        // await .deleteMany({pid: postId})
        res.status(202).send(response);
    } catch(err){
        console.log(err)
        res.status(500).json({message: "Post cannot be deleted"})
    }
})

//Edit the post by the user
// TODO: Check if the post belongs to the user (uid from authentication Token == uid in the post)
// router.patch('/question/solution', async (req, res, next)=>{
//     const {pid, title, body} = req.body;
//     console.log(pid)
//     try{
//         await post.updateOne(
//             { 'pid': pid }, 
//             { $set: { title, body } }
//         )
//         await post.findOne({'pid': pid}, (err, result)=>{
//             if (!err)
//                 res.status(250).send(result)
//             else
//                 res.status(500).send("Something went wrong!")
//         }).clone().catch(function(err){ console.log(err)});
//     } catch(err) {
//         console.log(err)
//         return res.status(422).json({message: "Post Unavailable"})
//     }
// })

// router.patch('/solution/reaction', async (req, res, next) => {
//     const {pid, uid, like} = req.body;
//     try{
//         if (like==1)
//             await post.updateOne(
//                 { 'pid': pid }, 
//                 { $addToSet: { 'likes': uid  }, $pull: {'dislikes': uid} }
//             )
//         else
//             await post.updateOne(
//                 { 'pid': pid }, 
//                 { $addToSet: { 'dislikes': uid  }, $pull: {'likes': uid} }
//             )
//         await post.findOne({'pid': pid}, (err, result)=>{
//             if (!err)
//                 res.status(250).send(result)
//             else
//                 res.status(500).json({message: "Something went wrong!"})
//         }).clone().catch(function(err){ console.log(err)});
//     } catch(err) {
//         console.log(err)
//         return res.status(422).json({message: "Something went wrong or Post Unavailable"})
//     }
// })

module.exports = router