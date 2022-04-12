const mongoose = require("mongoose");

const auth_schema = mongoose.Schema({

    fname:{
        type: String,
        required: true,
    },
    lname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }

})

