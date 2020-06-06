const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {User} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

router.post('/join', isNotLoggedIn, async(req,res,next)=>{ 
    const {userId, email, location, phoneNumber, username, password} = req.body; 
    try{
        console.log(email);
        const exUser = await User.findOne({where:{email}});

        if(exUser){
            return res.status(403).send("이미 가입된 아이디입니다.");
        }else{
            console.time('암호화 시간');
            const hash = await bcrypt.hash(password,12); // 두 번째 인자가 커질수록 복잡해짐. 대신 속도도 느려짐. 1초정도로 맞추자.
            console.timeEnd('암호화 시간'); // 시간맞추는용도임.
            const newUser = await User.create({
                email,
                userId,
                location,
                phoneNumber,
                username,
                password:hash,
            });
            return res.status(200).json(JSON.parse(newUser));
        }
    }catch(err){
        console.error(err);
        next(err);
    }
})