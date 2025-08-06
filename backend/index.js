const express = require('express')
const mongoose=require('mongoose');
const dotenv=require("dotenv");

const { courseRoutes } = require('./routes/course');
const { adminRoutes } = require('./routes/admin');
const app = express();
dotenv.config(); 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const port = 4000
const cors = require("cors");
const multer = require('multer');
app.use(cors());





app.use("/course",courseRoutes);
// in above case courseRoutes should be router means express router mostly used
// courseRoutes(app); in this case also courseRoutes should be function
app.use("/admin",adminRoutes);


async function main(){
await mongoose.connect(process.env.MONGODB_URL);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}
main();
