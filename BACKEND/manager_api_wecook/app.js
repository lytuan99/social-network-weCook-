var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const connectDB = require('./models/connect');

 var indexRouter = require('./routes/index');
 var usersRouter = require('./routes/users');

connectDB();

var app = express();

app.get('/', (req, res) => {
  res.send("we are on home! ");
})

// view engine setup
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


 app.use('/', usersRouter);


module.exports = app;
