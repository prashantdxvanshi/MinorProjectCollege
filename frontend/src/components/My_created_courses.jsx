import React, { useEffect, useState } from "react";
import ProfileDropdown from "./Profileholder";
import ProfileBanner from "./ProfileBanner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminAtom, tokenAtom } from "@/atom";

const My_created_courses = () => {
  
    
  const [courses,setcourses]=useState([]);
  
  
   useEffect(() => {
    const fetchcourses=async()=>{
      const token=localStorage.getItem("token");
    try{
      const res=await axios.get("http://localhost:4000/admin/my-created-courses",{headers:{"Content-Type": "application/json",token: token}});
      setcourses(res.data)
      setimage(res.data.imageurl)
      
    }catch(err){
      console.log("erro in try block:",err);
    }
    }
    fetchcourses();
   }, [])
   
  return (
    <div>
       <header className="shadow bg-gradient-to-r from-blue-500 via-indigo-50">
        <nav className=" flex items-center mx-50  ">
        <img
          src="https://tse4.mm.bing.net/th/id/OIP.Lw2_IxlEXOMPlTMSZLoWIAHaGO?r=0&w=860&h=723&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt=""
          className="w-30 h-15 rounded-4xl "
        />
        <div className="flex justify-between  mt-2 w-full ">
          <div className="flex w-full mr-25 border-1 rounded shadow p-4">
            <div className="ml-3 w-90 ">LocationBar</div>
          <div className="border-l h-5 " />
          <span className="">🔍</span>
          <div className="w-full ">
            <input type="text" className="w-full outline-none" />
          </div>
          </div>
          <div className="mt-1">
            <ProfileDropdown/>
          </div>
        </div>
      </nav>
    </header>
      <div className=" border-2 w-full "><ProfileBanner/></div>
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
              className="w-[600px] h-[300px] object-cover rounded-lg"
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
