const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');
const {User} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

require('dotenv').config();

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
            return res.status(403).json("아이디 또는 비밀번호가 틀립니다.");
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

router.post('/mailsend', isNotLoggedIn, async(req,res,next) => {
    try{
        let newPassword = Math.floor(Math.random()*10000000)+1;
        let newPassword_string = newPassword.toString();
        console.log(newPassword_string);
        console.time('암호화 시간 확인용');
        const encrypted_password = await bcrypt.hash(newPassword_string,12);
        console.timeEnd("암호화 끝");
        let Password_Result = await User.update({password:encrypted_password},{where:{email:req.body.email}});
        
        if(Password_Result){
            let transporter = nodemailer.createTransport({ 
                service:'Gmail',
                auth:{
                    user:process.env.GOOGLE_ID,
                    pass:process.env.GOOGLE_PASSWORD, 
                }
            });
            let mailOptions = {  
                from: process.env.GOOGLE_ID, 
                to:req.body.email, 
                subject: '식사한끼 비밀번호 변경 메일입니다.',
                text: `변경된 비밀번호는 ${newPassword} 입니다.` // 메일 내용,
            }
            transporter.sendMail(mailOptions,(error,info)=>{ // 이메일 발송
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('이메일 발송에 성공했습니다: ' + info.response); // 성공
                }
            });
            return(
                res.status(200).send("이메일 발송에 성공했습니다!")
            );
        }else{
            return(
                res.status(500).send("새 비밀번호 암호화 과정에서 문제가 발생했습니다!")
            );
        }
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/passwordchange', isLoggedIn, async(req,res,next)=>{
    try{
        let {password} = req.body;
        const newPassword = await bcrypt.hash(password,12);
        console.log(newPassword);
        User.update({password:newPassword},{where:{id:req.user.id}});
        return(
            res.status(200).json("비밀번호 변경이 완료되었습니다.")
        );
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;