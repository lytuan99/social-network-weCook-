const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var User = require('../models/Users');
var Role = require('../models/Roles');
const createUser = function (userReq, done) {

    User.findOne({ 'name': userReq.name }, (err, doc) => {
        if (err) console.log(err);
        if (doc != null)
            return done(err, { message: 'name has existed!', status: false });

        var roles = [];
        Role.findOne({ name: 'user' }, (err, role) => {
            if (role)
                roles.push(role._id);
        })
        let user = new User({
            name: userReq.name,
            password: bcrypt.hashSync(userReq.password, 8),
            gender: userReq.gender,
            birthday: userReq.birthday,
            city: userReq.city,
            email: userReq.email,
            phoneNumber: userReq.phoneNumber,
            roles: roles

        })
        console.log(user);
        user.save((err, user) => {
            if (err)
                return done(err, null);
            return done(err, { status: true, userId: user._id, message: 'sign up successfully' });     // nếu thành công thì trả về id của user vừa đăng ký
        })
    })


}

const loginUser = (req, res) => {

    User.findOne({ name: req.name }).populate('roles').exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {

            res.status(404).send({ status: false, message: "User Not found." });
            return;
        }

        console.log(user);
        var passwordIsValid = bcrypt.compareSync(req.password, user.password);

        if (!passwordIsValid) {
            res.status(401).send({ status: false, message: "invalid password" });
            return;
        }
        var roles = [];
        for (let i = 0; i < user.roles.length; i++)
            roles.push(user.roles[i].name.toUpperCase());
        res.status(200).send({
            status: true,
            message: "login successful",
            userId: user._id,
            name: user.name,
            roles: roles
        })
    })
}



module.exports = {
    createUser,
    loginUser
}