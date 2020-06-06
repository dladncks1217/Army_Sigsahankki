exports.isLoggedIn = (req,res,next)=>{ 
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(403).json("로그인 필요");
    };
}

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    }else{
        res.status(403).json("로그인 상태에서 접근 불가능합니다.");
    }
};