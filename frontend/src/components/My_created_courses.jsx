import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CardContainer, CardBody, CardItem, useMouseEnter } from "./ui/3d-card";

const My_created_courses = () => {
  const [courses,setcourses]=useState([]);
   useEffect(() => {
    const fetchcourses=async()=>{
      const token=localStorage.getItem("token");
    try{
      const res=await axios.get("http://localhost:4000/admin/my-created-courses",{headers:{"Content-Type": "application/json",token: token}});
      setcourses(res.data)
      
    }catch(err){
      console.log("erro in try block:",err);
    }
    }
    fetchcourses();
   }, [])
   
  return (
    <div>
      <div className="p-6 bg-gradient-to-r from-blue-500 via-indigo-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">My Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-gradient-to-tl from-blue-500 via-indigo-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={course.imageurl}
              alt={course.title}
              className="w-full  object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description.slice(0, 80)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-bold">₹{course.price}</span>
                <button   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
                 view
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default My_created_courses
