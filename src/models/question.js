const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const questionSchema = moongoose.Schema({
    pid: {type: String, reuired: true},
    uid: {type: String, reuired: true},
    ques: {type: String, reuired: true},
    // subQid: {type: String, reuired: false},
    sols: {type: Number},
    upvotes: {type: Array}
})

module.exports = mongoose.model("Qusetion", questionSchema);