const {Router}=require('express');
const cloudinary=require("../cloudinary/Cloudinary")
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch'); 


const path=require("path");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const {z}=require("zod");
const {adminModel, courseModel, orderModel}=require("../db");
const { adminMiddleware } = require('../Middleware/adminMiddleware');
const { JWT_ADMIN_SECRET } = require('../config');
const multer = require('multer');
const adminRoutes=Router();
adminRoutes.post("/signup",async function(req,res){
    const zodBodySchema=z.object({
        email:z.string().min(3).max(100).email(),
        name:z.string().min(3).max(100),
        password:z.string().min(3).max(100)
      })
    // zbodyschema means req.body me data ekdm esa hi or isi hi formate me hona chaiye mtlb phle email ho fir name ho fir password ho 
    //  const parsedData=zodBodySchema.Parse(req.body); this check all data as a whole individual error not defined
     const parsedData=zodBodySchema.safeParse(req.body);
     if(!parsedData.success){
      res.json({message:"incorrect formate"});
      return
     }
    
     const {email,name,password}=req.body;
    //  if(typeof email!==String || email.length<5 || !email.include("@")){
    //   res.json({message:"incorrect email"});
    //   return
    
    //  }
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "already exists" });
    }

    

     let errorthrown=0;
     try{
      const hashpassword=await bcrypt.hash(password, 5);
    //  console.log(hashpassword);
     await adminModel.create({
        email:email,
        name:name,
        password:hashpassword
     })
    
     }catch(e){
      console.error("signup error",e);
      res.json({message:"something wrong "})
      errorthrown=1;
     }
     if(errorthrown==0){
     res.status(203).json({message:"signed up",admin:{name:name}});
     }else{
      res.json({message:"error occcured"})
     }
})


adminRoutes.post("/signin",async function(req,res){
 const {email,password}=req.body;
 const adminfind=await adminModel.findOne({email:email});

 if(!adminfind){
 return res.status(403).json({message:"user not found"});
 }
 const passwordMatch=await bcrypt.compare(password, adminfind.password);
 if(passwordMatch){
  const token=jwt.sign({id:adminfind._id},JWT_ADMIN_SECRET,{ expiresIn: '1h' } );
  

  return res.status(200).json({
  message: "Login success",
  admin:adminfind.name,
  token: token
});
 }
 else{
   return res.status(401).json({ message: "Wrong password" });
 }
})




adminRoutes.post("/coursecreator",adminMiddleware,async function(req,res){
     const adminId=req.adminId;
    //  console.log(adminId);
      const {title,description,price,imageurl}=req.body;
      const admin = await adminModel.findById(adminId);

      const course=await courseModel.create({
        title:title,
        description:description,
        price:price,
        imageurl:"https://tse4.mm.bing.net/th/id/OIP.eXWcaYbEtO2uuexHM8sAwwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        creatorId:adminId
      })
      res.json({
        message:"course created",
        courseId:course._id,
        adminName:admin,
      })
    
})

adminRoutes.get("/my-created-courses",adminMiddleware,async function(req,res){
      const adminId=req.adminId;
      const courses=await courseModel.find({creatorId:adminId});
      res.json(courses);
})

adminRoutes.put("/courseupdate",adminMiddleware, async function(req,res){
      const adminId=req.adminId;
    //   console.log(adminId);
      const {title,description,image,price,courseId}=req.body;
      const course=await courseModel.updateOne({_id:courseId , creatorId:adminId},{
        title:title,
        description:description,
        image:image,
        price:price,
      })
      res.json({message:"course updated",
        courseId:course._id
      })
    
})

adminRoutes.post("/want_to_purchase",adminMiddleware, async (req, res) => {
    const buyerId=req.adminId;
    const courseId=req.body.courseId;
    const admin = await adminModel.findById(buyerId);
    const course = await courseModel.findById(courseId);
    const sellerId=course.creatorId;
    // console.log(admin);
    // console.log(course);
    if(sellerId.toString()===buyerId.toString()){ return res.json({message:"your are creator so you can't buy own"})};

   await orderModel.create({
    buyerId,
    sellerId,
    courseId
   })

  res.json({
    message:"can purchase",
    buyerId,
    sellerId,
    courseId
  })
});

adminRoutes.get("/others",adminMiddleware, async (req, res) => {
  const loggedadminId = req.adminId; // set by your userMiddleware from token

  try {
    const courses = await courseModel.find({creatorId: { $ne: loggedadminId } });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

adminRoutes.get("/my_purchased_courses", async function(req,res){
    const adminId=req.userId;
const courses=await courseModel.find({creatorId:adminId});
res.json({
    message:"all courses shown",
    courses
})
})




module.exports={
    adminRoutes:adminRoutes
}