import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Footer from "./Footer";
import { CardContainer, CardBody, CardItem, useMouseEnter } from "./ui/3d-card";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "@/atom";

const Home = ({ isLoggedin }) => {
  const [courses, setcourses] = useState([]);
   
  const token=useRecoilValue(tokenAtom);
  
  useEffect(() => {
    const fetchcourse = async () => {
      try {
        const tokenofstorage = localStorage.getItem("token"); 
        if(token===0){const res = await axios.get("http://localhost:4000/course/review", {});
      setcourses(res.data);}
        else{const res = await axios.get("http://localhost:4000/admin/others", {headers:{"Content-Type": "application/json",token: tokenofstorage}});
      setcourses(res.data);}
        
      } catch (err) {
        console.log("error is ", err);
      }
    };
    fetchcourse();
  }, []);
  


 
 const navigate = useNavigate();
  const handlePurchase = async (courseId) => {
    token?navigate("/buy"):navigate("/Login")
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.post("http://localhost:4000/admin/want_to_purchase",
       {courseId: courseId }, 
       {headers:{"Content-Type": "application/json",token: token}}
      );
      console.log(response.data.adminId); 
      console.log(response.data.courseId); 
      
      
  } catch (err) {
    console.error("Purchase failed:", err)
  }
    
};
  return (
    <>
      <div
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
      <div className="slider-container">
      <div className="p-6 bg-gradient-to-r from-blue-500 via-indigo-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
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
                <span className="text-green-800 font-bold">₹{course.price}</span>
                <button onClick={handlePurchase} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
                 Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
</div>
      <Footer />
    </>
  );
};

export default Home;
