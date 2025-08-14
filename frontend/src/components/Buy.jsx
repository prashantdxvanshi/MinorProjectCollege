import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { creatorAtom } from "@/atom";

const Buy = () => {
  const courseId = useParams();
  // console.log(courseId.id);
  const navigate = useNavigate();
  const [course, setcourse] = useState({});
  const token = sessionStorage.getItem("token");
  const [creatorName,setcreatorName]=useRecoilState(creatorAtom);
  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(
        "http://localhost:4000/course/detail/" + courseId.id,
        {}
      );
      setcourse(res.data.details);
      setcreatorName(res.data.creatorName);
    };
    fetchCourse();
  }, []);

  const handlePurchase = async (Id) => {
    // {token?navigate("/buy/"+courseId):navigate("/Login")};
    if (!token) {
      navigate("/Login");
    }
    try {
      const res = await axios.post(
        "http://localhost:4000/admin/orders",
        { courseId: Id },
        { headers: { "Content-Type": "application/json", token: token } }
      );

      // console.log(res.data.message);

      if (res.data.message == "purchased you can see orders table") {
        alert("course is purchased");
      } else if (res.data.message == "already purchased") {
        alert("already purchased");
      }
    } catch (err) {
      console.log("error in try block:", err);
    }
  };

  //  for chat
  const handleChat = async (Id) => {
    if (!token) {
      navigate("/Login");
    } else {
      navigate("/chat/" + Id);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-2 bg-white shadow-2xl ">
        {" "}
        <Navbar2 />
      </div>
      <div className="flex relative mt-13">
        <div className="min-h-screen bg-[#e5eeff]  fixed  left-0 w-60 ">
          <div className="m-10 text-gray-500">
            <div className="flex flex-col justify-between space-y-7 cursor-pointer">
              <div className="font-bold ">MAIN MENU</div>
              <a href="/">Home</a>
              <div>Products</div>
              <hr className=" border-gray-300  mt-7 " />
            </div>
            {token && (
              <>
                <div className="flex flex-col justify-between space-y-7 mt-7 cursor-pointer">
                  <div href="">Orers</div>
                  <div href="">Settings</div>
                  <div
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      navigate("/");
                    }}
                  >
                    Logout
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="ml-60 relative bg-white w-full h-screen ">
          <div className="bg-blue-700 relative h-80 w-full ">
            <div className=" text-center h-40 w-100 left-30  absolute top-25 text-white font-bold text-4xl wrap-break-word ">
              {course.title}
            </div>
            <div className=" absolute  top-15 right-18 h-80 w-100  border-2 rounded-2xl shadow">
              <div
                key={course._id}
                className="bg-gradient-to-br from-blue-500 via-indigo-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={course.imageurl}
                  alt={course.title}
                  className="w-[600px] h-[300px] object-cover rounded-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-4">{course.description}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-800 font-bold">
                      ₹{course.price}
                    </span>

                    <button
                      onClick={() => handlePurchase(course._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleChat(course._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
                    >
                      Chat to Owner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <span className="absolute top-10 left-20 text-2xl font-bold text-blue-600 underline underline-offset-12">
              Overview
            </span>
          </div>
          <hr className=" border-gray-300  w-140 m-20" />
          <div className="w-100  -translate-y-15 translate-x-19 ">
            <span className="font-bold text-gray-700">Description</span>
            <div className="ml-8 mt-4">
              {course.description} <br />
              {course.price} <br />
              {course.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
