const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

router.post('/join', isNotLoggedIn, async(req,res,next)=>{ 
    const {email, location, phoneNumber, username, password} = req.body; 
    try{
        console.log(email);
        const exUser = await User.findOne({where:{email}});

        if(exUser){
            return res.status(403).json("이미 가입된 아이디입니다.");
        }else{
            console.time('암호화 시간');
            const hash = await bcrypt.hash(password,12); 
            console.timeEnd('암호화 시간'); 
            const newUser = await User.create({
                email,
                location,
                phoneNumber,
                username,
                password:hash,
            });
            return res.status(200).json(newUser);
        }
    }catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;