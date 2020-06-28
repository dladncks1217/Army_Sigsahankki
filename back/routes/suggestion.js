const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');

require('dotenv').config();

router.post('/mailsend',isLoggedIn,async(req,res,next)=>{
    try{
        let transporter = nodemailer.createTransport({ 
            service:'Gmail',
            auth:{
                user:process.env.GOOGLE_ID,
                pass:process.env.GOOGLE_PASSWORD, 
            }
        });
        let mailOptions = {  
            from: process.env.GOOGLE_ID, 
            to:process.env.GOOGLE_ID, 
            subject: "[식사한끼 건의] "+req.body.suggestion,
            text: req.body.suggestion_content // 메일 내용,
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
            res.status(200).json("이메일 발송에 성공했습니다!")
        );
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;
