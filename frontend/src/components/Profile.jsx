import React, { useEffect, useState } from "react";
import ProfileDropdown from "./Profileholder";
import ProfileBanner from "./ProfileBanner";
import axios from "axios";
import { CardContainer, CardBody, CardItem, useMouseEnter } from "./ui/3d-card";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminAtom, tokenAtom } from "@/atom";
const Profile = () => {
  const [courses,setcourses]=useState([]);
  const adminName=useRecoilValue(adminAtom);
  console.log(adminName);
  useEffect(() => {
    async function showOwnCourses(){
      try{
        const token=localStorage.getItem("token");
      const mycreatedcourses=await axios.get("http://localhost:4000/admin/my-created-courses",
        {headers:{"Content-Type": "application/json",token: token}}
      )
      setcourses(mycreatedcourses.data.courses);
      // console.log("try block executed")
      }catch(err){
        console.log("error in try block:",err);
      }
   }
   showOwnCourses();
  }, [])
  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "50px",
    slidesToShow: 3,
    speed: 500,
   
  };

  return (
    <>
    <header className="shadow">
        <nav className=" flex items-center mx-50  ">
        <img
          src="https://ops.runnr.in/assets/zomato_logo_black-72e759139bb73d92afb5f8ae0b2485b7cb023a5474859f2b6e22fdd8b83d2fc0.png"
          alt=""
          className="w-32 h-7 "
        />
        <div className="flex justify-between ml-5 mt-2 w-235 mb-2">
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
      <div className="mx-50 border-2 w-277 "><ProfileBanner/></div>
  <Slider {...settings}>
        {courses.map((course) => (
          <>
            <main key={course._id} className="flex justify-center items-center ">
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
                  <CardItem translateZ={30} className="text-gray-600 mb-4">
                    See Details
                  </CardItem>
                </CardBody>
              </CardContainer>
            </main>
          </>
        ))}
      </Slider>
    </>
  );
};

export default Profile;
