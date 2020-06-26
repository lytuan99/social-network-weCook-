const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateNameOrEmailOrPhoneNumber = function(req, res, next){

    User.findOne({
        name: req.body.name
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({message: err})
            return;
        }
        if(user){
            res.status(400).send({ message: "Lỗi! usename đã tồn tại!" });
            return;
        }
        User.findOne({
            email: req.body.email
        }).exec((err, user) =>{
            if(err) {
                res.status(500).send({message: err})
                return;
            }
            if(user){
                res.status(400).send({ message: "Lỗi! email đã được dùng!" });
                return;
            }
            User.findOne({
                phoneNumber: req.body.phoneNumber
            }).exec((err, user) => {
                if(err) {
                    res.status(500).send({message: err})
                    return;
                }
                if(user){
                    res.status(400).send({ message: "Lỗi! số điện thoại này đã được dùng!" });
                    return;
                }
                next();
            })
        })
    })
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
          });
          return;
        }
      }
    }
  
    next();
};

const verifySignUp = {
    checkDuplicateNameOrEmailOrPhoneNumber,
    checkRolesExisted
}

module.exports = verifySignUp;