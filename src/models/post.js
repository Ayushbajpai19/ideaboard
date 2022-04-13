const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // pid: {type: String, required: true, unique: true},
    uid: {type: String, required: true, unique: true},
    approved: {type: Boolean, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    tags: {type: Array, required: true},
    likes: {type: Array, required: true},
    dislikes: {type: Array, required: true},
    comments: {type: Number, required: true},
    questions: {type: Number, required: true}, // Including the questions counts
    createdAt: {type: Date, required: true}
})

module.exports = mongoose.model("Posts", postSchema);