const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    pid: {type: String, required: true, ref: 'Posts'},
    uid: {type: String, required: true, ref: 'User'},
    cid: {type: String, required: true},
    body: {type: String, required: true},
    likes: {type: Array, required: true},
    dislikes: {type: Array, required: true}
})

module.exports = mongoose.model("Comments", commentSchema);