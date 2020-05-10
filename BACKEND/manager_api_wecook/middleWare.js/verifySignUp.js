const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateNameOrEmailOrPhoneNumber = function(res, req, next){

    User.findOne({name: req.body.name}).exec((err, user) => {
        
    })
}