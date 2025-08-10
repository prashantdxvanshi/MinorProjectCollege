import React, { useEffect, useState } from "react";
import Navbar from "./Navbar1";
import Banner from "./Banner";
import Footer from "./Footer";
import ReactSearchBox from "react-search-box";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { searchAtom, tokenAtom } from "@/atom";
import Navbar2 from "./Navbar2";
import { fromTheme } from "tailwind-merge";

const Home = ({ isLoggedin }) => {
  const [courses, setcourses] = useState([]);
  const search=useRecoilValue(searchAtom);
  //  console.log(search);
  // const token=useRecoilValue(tokenAtom);
  const token=localStorage.getItem("token")
  console.log(token);
  useEffect(() => {
    const fetchcourse = async () => {
      try {
         
        if(!token){const res = await axios.get("http://localhost:4000/course/review", {});
      setcourses(res.data);}
        else{const res = await axios.get("http://localhost:4000/admin/others", {headers:{"Content-Type": "application/json",token: token}});
      setcourses(res.data);}
        
      } catch (err) {
        console.log("error is ", err);
      }
    };
    fetchcourse();
  }, []);
  

 const navigate = useNavigate();

const handleDetails = async (courseId) => {
    navigate("/details/"+courseId)
};


  return (
    <>
      
      {/* <div
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://wallpaperaccess.com/full/3356601.png')",
        }}
      >
     
        <div className="relative z-10 flex flex-col justify-center">
          <div className="mt-4">
            <Navbar isLoggedin={isLoggedin} />
          </div>
          <Banner />
        </div>
      </div>
      <div className="slider-container ">
      <div className="p-6 pt-12 bg-gradient-to-r from-blue-500 via-indigo-50 min-h-screen">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.filter((course)=>{
         if(course.title.toLowerCase().includes(search.toLowerCase())){
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
                <span className="text-green-800 font-bold">₹{course.price}</span>
                <button onClick={()=>handlePurchase(course._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
                 Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
</div> */}

<div>
     <div className='fixed top-0 left-0 w-full z-2 bg-white shadow '> <Navbar2 /></div>
    <div className="flex relative mt-13">
     <div className='min-h-screen bg-[#e5eeff]  fixed  left-0 w-60 '>
      <div className='m-10 text-gray-500'>
        
       <div className='flex flex-col justify-between space-y-7 cursor-pointer'>
         <div className='font-bold '>MAIN MENU</div>
        <a href="/">Home</a>
        <a href="/">Products</a>
             <hr className=" border-gray-300  mt-7 "/>
       </div>
       {token && <>
       <div className='flex flex-col justify-between space-y-7 mt-7 cursor-pointer'>
        <div href="">Orders</div>
        <div href="">Settings</div>
        <div onClick={()=>{localStorage.removeItem("token"); localStorage.removeItem("user");  document.location.reload()}}  >Logout</div>
       </div>
       </>}
      </div>
     </div>
     <div className='ml-60 relative bg-white w-full h-screen'>
      <div className="absolute top-10 right-150 font-bold text-2xl">Products</div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 m-25">
        {courses.filter((course)=>{
         if(course.title.toLowerCase().includes(search.toLowerCase())){
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
                <span className="text-green-800 font-bold">₹{course.price}</span>
                <button onClick={()=>handleDetails(course._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
                 View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      




     </div>
    </div>
    </div>

      {/* <Footer /> */}
    </>
  );
};

export default Home;
