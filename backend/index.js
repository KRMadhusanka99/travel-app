const express = require('express');
const mongoose = require('mongoose');
const app = express();
const MONGO_URL = require("dotenv").config();

mongoose.connect(process.env.MONGO_URL,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('DB connection successful!');
}).catch((err) => console.log(err));
app.listen(8800, () => {
    console.log('Server is running on port 8800 port!');
});