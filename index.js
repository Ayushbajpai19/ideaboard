const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

app.use(bodyParser.json());


mongoose.connect().then(()=>{
    console.log("Database connected successfully");
    return app.listen({port: process.env.PORT || 5000});
}).then((res)=>{
    console.log(`Server is running on port ${res.address().port}`)
}).catch(()=>{
    console.log("Database Connection failed")
});
