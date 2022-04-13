const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const solutionSchema = moongoose.Schema({
    // sid: {type: String, reuired: true},
    qid: {type: String, reuired: true, ref: "question"},
    uid: {type: String, reuired: true},
    sol: {type: String, required: true},
    upvotes: {type: Array},
    createdAt: {type: Date, required: true}
})

module.exports = mongoose.model("Solutions", solutionSchema);