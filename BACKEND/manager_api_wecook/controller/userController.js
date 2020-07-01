const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var User = require('../models/user');
var Role = require('../models/role');
const Constants = require('../constants/index')
const config = require('../config/auth.config')
const jwt = require('jsonwebtoken')
const blogController = require('../controller/blogController');
const Blog = require('../models/blog');


const createUser = function (req, res) {
    let userReq = req.body
    let user = new User({
        name: userReq.name,
        password: bcrypt.hashSync(userReq.password, 8),
        gender: userReq.gender,
        birthday: userReq.birthDay,
        city: userReq.city,
        email: userReq.email,
        phoneNumber: userReq.phoneNumber
    })
    console.log(user);
    
    user.save((err, user) => {
        if (err){
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.roles) {
            Role.find(
              {
                name: { $in: req.body.roles }
              },
              (err, roles) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                user.roles = roles.map(role => role._id);
                user.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                  res.send({ message: "User was registered successfully!" });
                });
              }
            );
          } else {
            Role.findOne({name: "user"}, (err, role) =>{
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err , status: false});
                        return;
                      }
            
                      res.send({ message: "User was registered successfully!", status: true });
                })
            })
          }
    })
}

const loginUser = (req, res) => {
    console.log("helo: ", req.body)
    User.findOne({
         name: req.body.name
         })
         .populate('roles' ,"-__v")
         .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            res.status(404).send({ status: false, message: "User Not found." });
            return;
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);      

        if (!passwordIsValid) {
            res.status(401).send({ accessToken: null, status: false, message: "invalid password" });
            return;
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: Constants.EXPIRE_TOKEN 
          });

        var roles = [];
        for (let i = 0; i < user.roles.length; i++)
            roles.push("ROLE_" + user.roles[i].name.toUpperCase());
        res.status(200).send({
            status: true,
            message: "login successful",
            userId: user._id,
            name: user.name,
            email: user.email,
            roles: roles,
            accessToken: token,
            avatar: user.avatar

        })
    })
}

const getProfile = async (req, res) =>{
  let userName = req.params.name
  let user = await User.findOne({name: userName})
  if(!user){
    res.status(404).send("user not found!")
    return;
  }
  else{
    let blogs = await Blog.find({user: user._id});
    res.status(200).send({blogs, user})
  }
}

const updateUser = (req, res) => {
  let user = req.body;
  let response = User.findById(req.params.idUser, (err, doc) => {
    if(err){
      res.status(404).send('Not found id user')
      return;
    }
    doc.gender = user.gender
    doc.birthday = user.birthDay
    doc.city = user.city
    doc.phoneNumber = user.phoneNumber
    doc.save((err, doc) => {
      if(err){
        res.status(500).send("error server!")
        return;
      }
      res.status(200).send(doc);
      console.log("U P D A T E OK")
    })
    
  })
}

const changeAvatar = (req, res) => {
  let idUser = req.params.idUser
  let avatar = req.body.avatar
  User.findByIdAndUpdate(idUser, {avatar: avatar}, (err, response) => {
    if(response){
      res.status(200).send({status: true, message:'upload thanh cong' })
      return;
    }
    res.status(404).send({status: false, message: 'failed!'})
  })
}

const getAllUser = async (req, res) => {
  let users = await User.find().populate('role').exec();
  res.status(200).send({status: true, users: users});
}

const countUser = async (req, res) => {
  let count = await User.countDocuments({})
  
  if(count){
    res.status(200).send({status: true, count: count})
    return;
  }
  else{
    res.status(500).send({status: false, message:"not available" })
    return;
  }
}


const countBlogOfUser = async (req, res) => {
  let idUser = req.params.idUser
  let countBlog = await Blog.count({user: idUser})
  if(countBlog){
    res.status(200).send({status: true, amountBlog: countBlog})
    return;
  }
  else{
    res.status(404).send({status: false, message:"not available" })
    return;

  }
}


module.exports = {
    createUser,
    loginUser,
   getProfile,
   updateUser,
   changeAvatar,
   getAllUser,
   countUser,
   countBlogOfUser
   


}