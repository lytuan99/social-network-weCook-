var express = require('express');
var router = express.Router();

var User = require('../models/Users');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('this is a my user hehe');
  res.end();
});

router.post('/', function(req, res) {
    var userRes = User.createUser(req.body, (err, user)=>{
      if(err){
        let errors = [];
        let i = 0;
        for(field in err.errors){
            errors[i++] = {nameError: err.errors[field].name,
                              kind : err.errors[field].kind};
                               
        }
        res.json(errors);
        throw err;
      }
      res.json(user);
      console.log('D O N E');
    });
  

})

module.exports = router;
