const { Router } = require("express");
const { courseModel, adminModel } = require("../db");
const adminMiddleware = require("../Middleware/adminMiddleware");
const courseRoutes = Router();
courseRoutes.get("/purchases", (req, res) => {
  res.send("Hello World!");
});
courseRoutes.get("/review", async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.json(courses);
  } catch (err) {
    res.json("error", err);
  }
});
courseRoutes.get("/detail/:id", async (req, res) => {
  // console.log("hi")
  //  console.log(req.params.id);
   const courseId=req.params.id;
   const details=await courseModel.findById(courseId);
  //  console.log("creator id is ",details.creatorId);
  const creator=await adminModel.findById(details.creatorId);
  // console.log(creator.name);
  const creatorName=creator.name;
  res.json({details:details,creatorName:creatorName});
});


module.exports ={courseRoutes};


// function courseRoutes(app){
//     app.get('/course/purchases', (req, res) => {
//   res.send('Hello World!')
// })
// app.
// app.get('/course/review', (req, res) => {
//   res.send('Hello World!')
// })
// }
// module.exports={
//     courseRoutes:courseRoutes
// }
