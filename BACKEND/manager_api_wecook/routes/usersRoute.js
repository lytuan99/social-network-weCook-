var express = require('express');
// var router = express.Router();
const {verifySignUp, authJwt} = require('../middleWare/index')
const userController = require('../controller/userController');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/api/auth/signup',
  [
    verifySignUp.checkDuplicateNameOrEmailOrPhoneNumber,
    verifySignUp.checkRolesExisted
  ],
  userController.createUser
  );

  app.get('/api/auth/:name/profile',
     [authJwt.verifyToken], 
     userController.getProfile
  );

  app.post('/api/auth/login', userController.loginUser);

};



  
// router.post('api/auth/signup', function(req, res) {
//      userController.createUser(req.body, (err, result) => {
//       if(err){
//         let errors ={nameError: result.message, status: false}; // trả về lỗi đã tồn tại tên người dùng
//         res.json(errors);
//         return;
//       }
//       if(!result.status){
//         console.log(result.message);
//         let errors ={nameError: result.message, status: false}; // trả về lỗi đã tồn tại tên người dùng
//         res.json(errors);
//       }
//       else{
//         let success = {status: true, userId: result.userId }
//         res.json(JSON.stringify(success))
        
//         console.log('D O N E')
//       }
//     });
// });


// router.post('/login', (req, res) => {
//   userController.loginUser(req.body, res);
// });

// module.exports = router;
