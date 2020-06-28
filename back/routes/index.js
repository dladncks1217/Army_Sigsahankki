const express = require('express');
const router = express.Router();
const {Restaurants} = require('../models');

router.get('/',(req,res,next)=>{
    res.render('index'); //예시
});

router.post('/add', async(req,res,next)=>{
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
    }catch(error){
        console.error(error);
        next(error);
    }
})
module.exports = router;