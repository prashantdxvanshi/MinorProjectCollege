const { JWT_ADMIN_SECRET } = require("../config");
const jwt=require("jsonwebtoken");

function adminMiddleware(req,res,next){
 const token = req.headers.token;
console.log(token);

 const verify=jwt.verify(token,JWT_ADMIN_SECRET);
console.log(verify);

 if(verify){
    req.adminId=verify.id;
    next();
 }else{
    res.json({message:"you are not signed in "});
 }
}
module.exports={
    adminMiddleware:adminMiddleware,
}