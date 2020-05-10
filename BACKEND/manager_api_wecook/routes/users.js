var express = require('express');
var router = express.Router();

var userController = require('../controller/userController');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('this is a my user hehe');
  res.end();
});
  
router.post('/users', function(req, res) {
     userController.createUser(req.body, (err, result) => {
      if(err){
        let errors ={nameError: result.message, status: false}; // trả về lỗi đã tồn tại tên người dùng
        res.json(errors);
        return;
      }
      if(!result.status){
        console.log(result.message);
        let errors ={nameError: result.message, status: false}; // trả về lỗi đã tồn tại tên người dùng
        res.json(errors);
      }
      else{
        let success = {status: true, userId: result.userId }
        res.json(JSON.stringify(success))
        console.log('D O N E')
      }
    });
});


router.post('/login', (req, res) => {
  userController.loginUser(req.body, res);
});




module.exports = router;
