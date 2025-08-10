import React, { useEffect, useState } from "react";
import ProfileDropdown from "./Profileholder";
import ProfileBanner from "./ProfileBanner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminAtom, tokenAtom } from "@/atom";

const My_created_courses = () => {
  
    const navigate=useNavigate()
  const [courses,setcourses]=useState([]);
    const [search,setsearch]=useState("");
  
    const [searchData,setsearchData]=useState({search:""});
     const handlechange=(e)=>{
      setsearchData({[e.target.name]:e.target.value});
   }
   const handlesearch=(e)=>{
     e.preventDefault();
    setsearch(searchData.search);
   }
  
   useEffect(() => {
    const fetchcourses=async()=>{
      const token=localStorage.getItem("token");
    try{
      if(token){
        const res=await axios.get("http://localhost:4000/admin/my-created-courses",{headers:{"Content-Type": "application/json",token: token}});
      setcourses(res.data)
      setimage(res.data.imageurl)
      }
      navigate("/")
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
          src="https://t3.ftcdn.net/jpg/02/45/84/16/360_F_245841615_d7QzRv937jfiC176rmKK60ckNXU9V76z.jpg"
          alt=""
          className="w-30 h-15 rounded-4xl "
        />
        <div className="flex justify-between  mt-2 w-full ">
          <div className="flex w-full mr-25 border-2 rounded shadow-2xl p-4">
            <div className="ml-3 w-90 ">LocationBar</div>
          <div className=" h-5 " />
          <div className="w-full ">
            <input placeholder="search your product title here" type="text" name="search" value={searchData.search} onChange={handlechange} className="w-full outline-none " />
          </div>
          <button onClick={handlesearch} className="cursor-pointer">🔍</button>

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
        {courses.filter((course)=>{
          if(((course.title)||(course.description)).toLowerCase().includes(search.toLowerCase())){
            return true;
          }
          
        }).map((course) => (
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
