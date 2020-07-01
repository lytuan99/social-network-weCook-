var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
var multer = require('multer');
const connectDB = require('./models/connect');
var blogController = require('./controller/blogController');
//  var userRouter = require('./routes/usersRoute');
 var blogRouter = require('./routes/blogRoute');
 const db = require('./models/Index')

connectDB();

var app = express();



// view engine set up
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const Role = db.role;

app.get('/', (req, res) => {
  res.json({message: "helo babe"})
})

require('./routes/usersRoute')(app);
require('./routes/blogRoute')(app);
require('./routes/commentRoute')(app);
require('./routes/favoriteRoute')(app);
require('./routes/followRoute')(app);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
    }
  });
}
initial();

module.exports = app;
