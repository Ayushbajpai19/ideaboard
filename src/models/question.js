const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const questionSchema = moongoose.Schema({
    qid: {type: String, reuired: true},
    pid: {type: String, reuired: true},
    uid: {type: String, reuired: true},
    question: {type: String, reuired: true},
    solution: {type: Number},
    upvotes: {type: Array}
})

module.exports = mongoose.model("Qusetion", questionSchema);