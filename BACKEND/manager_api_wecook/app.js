var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const connectDB = require('./models/connect');

 var userRouter = require('./routes/usersRoute');
 var blogRouter = require('./routes/blogRoute');
connectDB();

var app = express();

app.get('/', (req, res) => {
  res.send("we are on home! ");
})

// view engine setup
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use('/', userRouter);
app.use('/blogs', blogRouter);

module.exports = app;
