const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models/Index')
const User = db.user
const Role = db.role

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        console.log("err token")
        res.status(403).send({ message: "No token provided!" });
        return false;
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        console.log("token success")
        next();
    })

};

isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require Moderator Role!" });
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isModerator
  };
  module.exports = authJwt;