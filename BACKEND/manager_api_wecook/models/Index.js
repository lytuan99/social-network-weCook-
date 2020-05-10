const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require('../models/Users');
db.role = require('../models/Roles');

db.ROLES =['user', 'moderator'];

module.exports = db;