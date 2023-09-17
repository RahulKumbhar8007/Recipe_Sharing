const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const addDataRoute = require('./userApi');
const recipes = require('./recipes');
const path = require('path');

const app = express();

const mongoose = require('mongoose');
// Add this line to serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors());

app.use(bodyparser.json());
app.use('/Api', addDataRoute);
app.use('/Api', recipes);

let port = 5000;

app.listen(port, () => {
    console.log(`Listening on ${port} `);
})


const dbpath = 'mongodb://127.0.0.1:27017/Recipe_Sharing';
mongoose.set('strictQuery', false);
mongoose.connect(dbpath).then(() => {
    console.log('connected to the mongodb database');
})




