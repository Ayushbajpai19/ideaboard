// TODO: Create routes for fetching specific type of posts like News, Trending, IT, Branding

const express = require('express')
const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid');
const post = require("../models/post")
// const User = require("../models/user")
const Comment = require("../models/comment")
const mailer = require("nodemailer");
const { networkInterfaces } = require('nodemailer/lib/shared');
const { estimatedDocumentCount } = require('../models/post');
const { resetWatchers } = require('nodemon/lib/monitor/watch');

const router = express.Router();

const smtpProtocol = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "kousani.sa@highradius.com",
        pass: "nnnfjzbhekyymiuk"
    }
});

// Find all the posts ( No Filter )
router.get('/posts', async (req,res,next)=>{
    const posts = await post.find({}).exec()
    res.send(posts)
});

// Find all the posts by the user
router.get('/posts/:uid', async (req,res,next)=>{
    console.log("Getting a Post");
    const userId = req.params.uid;
    await post.find({ 'uid': userId }, function (err, posts) {
        if (!err && posts.length > 0)
            res.status(200).send(posts);
        else{
            res.status(422).send("<h4>Posts not available for the requested user </h4>")
        }
    }).clone().catch(function(err){ console.log(err)});
});

// // Get all the news related Posts (Single Dynamic Tag)
// router.get("/:tag/posts/", async (req, res, next) => {
//     console.log("Getting a News Post");
//     // const userId = req.params.uid;
//     // TODO: How to do a ArrayContainsAny for the posts in the filters

//     let tag = req.params.tag;

//     await post.find({ 'tags': { $all: [tag] } }, function (err, posts) {
//         if (!err && posts.length > 0)
//             res.status(200).send(posts);
//         else{
//             res.status(422).send("<h4>Posts not available currently </h4>")
//         }
//     }).clone().catch(function(err){ console.log(err)});
// })

// Get all the posts on basis of tags (Multiple Dynamic Tag) [Achieved the GOAL but, might not be the correct way]
router.get("/:tags/posts/", async (req, res, next) => {
    console.log("Getting a News Post");
    // const userId = req.params.uid;
    // TODO: How to do a ArrayContainsAny for the posts in the filters

    let tags = req.params.tags.split(",");
    console.log(tags);

    // await post.find({ 'tags': { $all: tags } }, function (err, posts) {
    //     if (!err && posts.length > 0)
    //         res.status(200).send(posts);
    //     else{
    //         res.status(422).send("<h4>Posts not available currently </h4>")
    //     }
    // }).clone().catch(function(err){ console.log(err)});

    // function fetch() {
    //     return new Promise(async (resolve, reject) => {
    //         var list_all_elements = [];
    //         for (let elem of tags) {
    //             // console.log("Elem: " + elem);
    //             await post.find({ 'tags': elem }, function (err, posts) {
    //                 if (!err && posts.length > 0){
    //                     // res.status(200).send(posts);
    //                     console.log(`${elem} => ${posts}`);
    //                     for (let post of posts){
    //                         list_all_elements.push(post);
    //                     }
    //                 }
    //                 // else{
    //                 //     console.log(`Can not find any Articles for ${elem}`);
    //                 //     // res.status(422).send("<h4>Posts not available currently </h4>");
    //                 // }
    //             }).clone().catch(function(err){ console.log(err)});
    //         }
    //         resolve(list_all_elements);
    //         // res.status(200).send(list_all_elements) ? list_all_elements.length>0:res.status(422).send("<h4>Posts not available currently </h4>")
    //     })
    // }

    const all_elements = new Promise(async (resolve, reject) => {
        let list_all_elements = [];
        let c = 0;
        for (let elem of tags) {
            // console.log("Elem: " + elem);
            await post.find({ 'tags': elem }, function (err, posts) {
                if (!err && posts.length > 0){
                    // res.status(200).send(posts);
                    console.log(`${elem} => ${posts}`);
                    for (let post of posts){
                        list_all_elements.push(post);
                    }
                    c+=1;
                }
                if (c==tags.length) {
                    res.status(200).send(list_all_elements);
                }
                // else{
                //     console.log(`Can not find any Articles for ${elem}`);
                //     // res.status(422).send("<h4>Posts not available currently </h4>");
                // }
            }).clone().catch(function(err){ console.log(err)});
        }
        resolve(list_all_elements);
        // return list_all_elements;
        // res.status(200).send(list_all_elements) ? list_all_elements.length>0:res.status(422).send("<h4>Posts not available currently </h4>")
    })

    
    // await fetch().then((el) => {
    //     console.log("Elements: ", el);
    //     res.status(200).send(el) ? el.length>0 : res.status(422).send("<h4>Posts not available currently </h4>");
    // })
})

// Creating a Post
router.post('/user/post', async (req, res, next)=>{
    const {uid, title, body, role, tags} = req.body
    // tags is an Array of tags like news, post etc..
    console.log(uid);

    // const session = await mongoose.startSession();
    // session.startTransaction();
    
    // We only need to fetch the uid from firebase user uid, so the part before this comment can be removed.
    const createdpost = new post({
        // pid: uuidv4(),
        uid,
        approved: (role==="admin")?true:false,
        title,
        body,
        tags: tags,
        likes: [],
        dislikes: [],
        comments: 0,
        questions: 0,
        createdAt: new Date()
    })
    // await createdpost.save({session: session}); 
    try {
        let saved_post = await createdpost.save(); 
        res.json(saved_post);
    } catch (error) {
        console.log("Error: Might be an intigrity Error", error);
        res.status(422).send("<h4>Error: Might be an intigrity Error</h4>" + error);
    }
        
    // }

    // session.commitTransaction();

    // res.status(201).send(createdpost);
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

router.delete('/user/post/', async (req, res, next)=>{
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

router.patch('/user/post/', async (req, res, next)=>{
    const {pid, title, body} = req.body;
    console.log(pid)
    try{
        await post.updateOne(
            { '_id': pid },
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

router.patch('/post/reaction', async (req, res, next) => {
    const {pid, uid, like} = req.body;
    try{
        if (like==1)
            await post.updateOne(
                { '_id': pid }, 
                { $addToSet: { 'likes': uid  }, $pull: {'dislikes': uid} }
            )
        else
            await post.updateOne(
                { '_id': pid }, 
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

router.patch('/user/post/approvePost', async (req, res, next)=>{
    const {pid} = req.body;
    console.log(pid)
    try{
        await post.updateOne(
            { '_id': pid },
            { $set: { approved: true } }
        )
        await post.findOne({'pid': pid}, (err, result)=>{
            if (!err)
                res.status(250).send(result)
            else
                res.status(500).send("Something went wrong!")
        }).clone().catch(function(err){ console.log(err)});
        var mailoption = {
            from: "kousani.sa@highradius.com",
            to: "babba_pnc@highradius.com, babba_pnc_interns@highradius.com",
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
    } catch(err) {
        console.log(err)
        return res.status(422).json({message: "Post Unavailable"})
    }
})

module.exports = router