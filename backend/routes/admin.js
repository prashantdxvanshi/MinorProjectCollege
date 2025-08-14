const {Router}=require('express');
const multer = require("multer");
const { uploadOnCloudinary } = require("../cloudinary/Cloudinary");
const { upload } = require("../Middleware/multer")


const path=require("path");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const {z}=require("zod");
const {adminModel, courseModel, orderModel}=require("../db");
const  adminMiddleware  = require('../Middleware/adminMiddleware');
const { JWT_ADMIN_SECRET } = require('../config');

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








adminRoutes.post("/coursecreator", adminMiddleware, upload.single("file"), async (req, res) => {

     try {
      const adminId = req.adminId;
      const { title, description, price } = req.body;
      const admin = await adminModel.findById(adminId);

      const localPath = req.file?.path;
      if (!localPath) return res.status(400).json({ error: "File not found" });

      const cloudinaryResult = await uploadOnCloudinary(localPath);
       console.log("1")
      const course = await courseModel.create({
        title,
        description,
        price,
        imageurl:cloudinaryResult.secure_url,
        creatorId: adminId,
      });

      res.json({
        message: "Course created",
        courseId: course._id,
        adminName: admin.name,
        image:course.imageurl,
      });
    } catch (err) {
      console.error("Course creation error:", err);
      res.status(500).json({
        error: "Something went wrong",
        detail: err.message,
      });
    }
});



adminRoutes.get("/my-created-courses",adminMiddleware,async function(req,res){
      const adminId=req.adminId;
      const courses=await courseModel.find({creatorId:adminId});
      const creator=await adminModel.findById(adminId);
      // console.log(creator.name);
      res.json({courses:courses , creatorName:creator.name});
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

adminRoutes.post("/orders",adminMiddleware, async (req, res) => {
    const buyerId=req.adminId;
    const courseId=req.body.courseId;
    const admin = await adminModel.findById(buyerId);
    const course = await courseModel.findById(courseId);
    const sellerId=course.creatorId;
    // console.log(buyerId);
    // console.log(courseId);
    const already=await orderModel.findOne({buyerId,courseId});
    if(already){
      return res.json({message:"already purchased"})
    }
    
    if(sellerId.toString()===buyerId.toString()){ return res.json({message:"your are creator so you can't buy own"})};
    const paymentsuccess=true;
    if(paymentsuccess){
    await orderModel.create({
    buyerId,
    sellerId,
    courseId
   })

    }
   
  res.json({
    message:"purchased you can see orders table",
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

adminRoutes.get("/my_purchased_courses",adminMiddleware, async function(req,res){
    const adminId=req.adminId;
const courses=await orderModel.find({buyerId:adminId});
console.log(courses)
res.json({
    message:"all courses shown",
    courses
})
})



module.exports={
    adminRoutes:adminRoutes
}