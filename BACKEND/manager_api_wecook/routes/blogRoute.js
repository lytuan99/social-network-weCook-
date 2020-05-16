var express = require('express');
var router = express.Router();

var blogController = require('../controller/blogController');

router.get('/', (req, res) => {
    res.send('this is all of blogs');
})

router.get('/:idUser', (req, res) => {
    
})

router.get('/:idBlog', (req, res) => {

})

router.post('/', (req, res) => {
    blogController.createBlog(req.body, (err, result) => {
        if(!result){
            res.json({error: err, status: false})
            return;
        }
        else{
            res.json(JSON.stringify({status: true, blog: result}))
            console.log('D O N E post blog');
            return;
        }
    })
})
module.exports = router;