const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
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
});

router.post('/login',isNotLoggedIn, (req,res,next)=>{
    passport.authenticate('local',(authError, user, info)=>{ 
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){ 
            return res.status(403).json("가입되지 않은 회원입니다.");
        }
        return req.login(user,(loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).json("로그인 성공");
        })
    })(req,res,next);
});


router.get('/logout',isLoggedIn, (req,res)=>{
    req.logout(); 
    req.session.destroy(); 
    res.status(200).json("로그아웃 완료");
});



module.exports = router;