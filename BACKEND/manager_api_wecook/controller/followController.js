var Follow = require('../models/interact/follow');

const addFollowUser = async (req, res) => {
    console.log("add follow")
    let userFollowingId = req.params.idUserFollow
    let userId = req.params.idUser
    let follow = await Follow.findOne({user: userId})
    if(!follow){
        follow = new Follow()
        follow.user = userId
        follow.userFollows.push(userFollowingId) 
        follow.save();
        res.status(200).send({status: true, message: "đã theo dõi thành công"})
        return;
    }
    follow.userFollows.push(userFollowingId);
    follow.save();
    res.status(200).send({status: true, message: "đã theo dõi thành công"})
  }

  const getUsersFollowByIdUser = async (req, res) => {
    let idUser = req.params.idUser
    let follow = await Follow.findOne({user: idUser}).populate("userFollows").exec();
    if(!follow){
        res.status(404).send({status: false, message: "không tồn tại người dùng"})
        return;
    }
    res.status(200).send({status: true, followList: follow.userFollows})
    }



    const unfollow = async (req, res) => {
        let idUser = req.params.idUser
        let idFollow = req.params.idUserFollow
        let follow = await Follow.findOne({user: idUser}).exec();
        console.log(follow)
        let newListFollow = follow.userFollows.filter((item) => {
            return item != idFollow;
        })
        follow.userFollows = newListFollow;
        follow.save((err, doc) => {
            if(doc)
            res.status(200).send({status: true, message: "unfollow success"})
            else
            res.status(200).send({status: false, message: "unfollow failed"})
        });
        
    }

    const isFollow = async (req, res) => {
        let idUser = req.params.idUser
        let idFollow = req.params.idUserFollow
        let follow = await Follow.findOne({user: idUser})
        if(!follow){
            follow = new Follow()
            follow.user = idUser
            follow.save()
            res.status(200).send({status: false, message: "chưa follow"})
            return;
        }
        else{
            let listFollow = follow.userFollows
            let userFollow = listFollow.filter(item => {
                return item == idFollow
            })
            if(userFollow.length > 0){
                console.log("ey:", userFollow)
                res.status(200).send({status: true, message: "đã follow"})
                return;
            }
            else{
                res.status(200).send({status: false, message: "chưa follow"})
                return;
            }
        }
        
    }

  
module.exports = {
    addFollowUser,
    getUsersFollowByIdUser,
    unfollow,
    isFollow




}