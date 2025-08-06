const mongoose=require('mongoose');
const Schema=mongoose.Schema

const adminSchema=new Schema({
 email:{type:String,unique:true},
 name:String,
 password:String
})
const courseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageurl:String,
    creatorId:{ type: mongoose.Schema.Types.ObjectId, ref: "admin" }
})



const orderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: "pending" } // pending, completed, canceled
});



const adminModel=mongoose.model("admin",adminSchema);
const courseModel=mongoose.model("course",courseSchema);
const orderModel=mongoose.model("order",orderSchema);


module.exports={
    adminModel,
    courseModel,
    orderModel,
    
}