const { Router } = require("express");
const { courseModel } = require("../db");
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
module.exports = {
  courseRoutes: courseRoutes,
};

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
