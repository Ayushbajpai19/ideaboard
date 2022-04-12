const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const solutionSchema = moongoose.Schema({
    sid: {type: String, reuired: true},
    qid: {type: String, reuired: true},
    uid: {type: String, reuired: true},
    solution: {type: Number, required: true},
    upvotes: {type: Array}
})

module.exports = mongoose.model("Solution", solutionSchema);