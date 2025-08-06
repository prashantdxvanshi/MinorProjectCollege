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
  


  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "50px",
    slidesToShow: 1,
    speed: 500,
   
  };
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
        {/* <div className="absolute inset-0 bg-black opacity-40 z-0"></div> */}
        <div className="relative z-10 flex flex-col justify-center">
          <div className="mt-4">
            <Navbar isLoggedin={isLoggedin} />
          </div>
          <Banner />
        </div>
      </div>
      <div className="slider-container">
      <Slider {...settings}>
        {courses.map((course) => (
          <>
            <main key={course._id} className="  flex justify-center items-center ">
              <CardContainer className="">
                <CardBody className="bg-gradient-to-tl from-blue-700 via-neutral-50 rounded-xl shadow-xl p-6 text-center">
                  <CardItem
                    translateZ={50}
                    className="text-2xl font-bold text-gray-800 mb-2"
                  >
                    {course.title}
                  </CardItem>
                  <CardItem translateZ={30} className="text-gray-600 mb-4 ">
                    <img src={course.imageurl} alt="" className="h-40 w-40 " />
                    <br />
                    {course.description}
                    
                  </CardItem>
                  <CardItem translateZ={30} className="text-gray-600 mb-4">
                    {course.price}
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    className="text-sm text-blue-500 underline cursor-pointer"
                    onClick={() => handlePurchase(course._id)}
                  >
                  Buy
                  </CardItem>
                </CardBody>
              </CardContainer>
            </main>
          </>
        ))}
      </Slider>
</div>
      <Footer />
    </>
  );
};

export default Home;
