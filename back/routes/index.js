const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('index'); //예시
});

module.exports = router;