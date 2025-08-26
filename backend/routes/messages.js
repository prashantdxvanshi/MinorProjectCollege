const { Router } = require("express");
const adminMiddleware = require("../Middleware/adminMiddleware");
const { adminModel, messageModel } = require("../db");
const dbmessageRoutes = Router();

dbmessageRoutes.get("/otherallusers", adminMiddleware, async (req, res) => {
 try{
       const userId = req.adminId;
  const filteredusers = await adminModel
    .find({ _id: { $ne: userId } })
    .select("-password");

  //  howmany users msged this user count
  const unseenmessages = {};
  const promises = filteredusers.map(async (key) => {
    const messages = await messageModel.find({
      senderId: key._id,
      recieverId: userId,
      seen: false,
    });
    if (messages.length > 0) {
      unseenmessages[key._id] = messages.length;
    }
  });
 await Promise.all(promises);
  res.json({
    message: "message user route",
    filteredusers: filteredusers,
    unseenmessages: unseenmessages,
  });
 }catch(err){
   console.log(err.message);
   res.json({message:err.message});
 }
});

// get all messages for selected user
dbmessageRoutes.get("/:id",adminMiddleware, async (req,res)=>{
     try {
        const myId=res.adminId;
     const {id:selecteduserId}=req.params;
     const messages=await messageModel.find({
        $or:[
            {senderId:myId,receiverId:selecteduserId},
            {senderId:selecteduserId,receiverId:myId}
        ]
     })
     await messageModel.updateMany({
        senderId:selecteduserId, receiverId:myId
     },{seen:true});
     res.json({messages});
     } catch (error) {
        res.json({message:error.message});
     }
})

// mark msgs as seen  using message id
dbmessageRoutes.get("/mark/:id",adminMiddleware,async (req,res)=>{
    try {
        const userId=req.adminId;
        const {id}=req.params;
        await messageModel.findByIdAndUpdate(id,{seen:true})
        res.json({success:true})
    } catch (error) {
        res.json(error.message);
    }
})

// send message to selected user
dbmessageRoutes.post("/send",adminMiddleware,async (req,res)=>{
    try {
      const senderId=req.adminId;
      // const receiverId=req.params;
      const {text}=req.body;  
      const newmsg=await messageModel.create({
        senderId:senderId,
        text:text,
         // receiverId,
      })
      res.json({newmsg});
    } catch (error) {
        res.json({message:error.message})
    }
})
module.exports = {
  dbmessageRoutes: dbmessageRoutes,
};
