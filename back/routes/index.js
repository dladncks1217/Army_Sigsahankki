const express = require('express');
const router = express.Router();
const {Restaurants, Sequelize} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const Op = Sequelize.Op;

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


router.get('/:location', async(req,res,next)=>{ // 일단 화천만
    try{
        const location = (location)=>{
            switch(location){
                case 'hwacheon': return '화천';
                case 'chooncheon' : return '춘천';
            }
        }
        console.log(location(req.params.location));
        const hwacheon = await Restaurants.findAll({where:{Classification_address:location(req.params.location)}});
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

router.get('/:location/type/:type',async(req,res,next)=>{ // 일단 화천만 한거 분야별로
    try{
        const location = (location)=>{
            switch(location){
                case 'hwacheon': return '화천';
                case 'chooncheon' : return '춘천';
            }
        }
        console.log(location(req.params.location));
        const store = await Restaurants.findAll({
            where:Sequelize.and(
                {Classification_address:location(req.params.location)},
                {restaurant_type:req.params.type}
            )
        });
        console.log(store);
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

router.get('/:location/:id',async(req,res,next)=>{
    try{
        const location = (location)=>{
            switch(location){
                case 'hwacheon': return '화천';
                case 'chooncheon' : return '춘천';
            }
        }
        const store = await Restaurants.findOne({
            where:{
                [Sequelize.Op.and]: [
                    {id:req.params.id},
                    {Classification_address:location(req.params.location)}
                ]
            }
        });
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