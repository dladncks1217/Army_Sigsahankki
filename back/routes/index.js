const express = require('express');
const router = express.Router();
const {Restaurants} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

router.get('/',(req,res,next)=>{
    res.render('index'); //예시
});

router.post('/add', async(req,res,next)=>{ // 걍 임시로 쓸라고 만든거입니다.
    try{
        const {business_name, tel, restaurant_type, Classification_address, address, open_time, close_time} = req.body; 
        const Add = await Restaurants.create({
            business_name,
            tel,
            restaurant_type,
            Classification_address,
            address,
            open_time,
            close_time
        })
        if(Add){
            return(
                res.status(200).redirect('/')
            );
        }else{
            res.status(500).send("500 error");
        }
    }catch(err){
        console.error(err);
        next(err);
    }
});


router.get('/hwacheon', async(req,res,next)=>{ 
    try{
        const hwacheon = await Restaurants.findAll({where:{Classification_address:"화천"}});
        if(hwacheon){
            return(
                res.status(200).json(hwacheon)
            );
        }
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/hwacheon/:type',async(req,res,next)=>{ //분야별로
    try{
        const store = await Restaurants.findAll({where:{restaurant_type:req.params.type}});
        if(store){
            return(
                res.status(200).json(store)
            );
        }else{
            return(
                res.status(500).json("500 server error")
            );
        }
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/hwacheon/:id',async(req,res,next)=>{
    try{
        const store = await Restaurants.findOne({where:{id:req.params.id}});
        if(store){
            return(
                res.status(200).json(store)
            );
        }else{
            return(
                res.status(404).send("리소스를 찾을 수 없습니다.")
            );
                    }
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;