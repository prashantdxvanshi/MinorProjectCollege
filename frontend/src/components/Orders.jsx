import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar2 from "./Navbar2";
import { useRecoilValue } from "recoil";
import { searchAtom } from "@/atom";

const Orders = () => {
  const token = sessionStorage.getItem("token");
  const [orders, setorders] = useState([]);
  const search = useRecoilValue(searchAtom);
  console.log("on order page seach value is ", search);

  useEffect(() => {
    async function fetchorder() {
      try {
        const res = await axios.get(
          "https://minorprojectcollege.onrender.com//admin/my_purchased_courses",
          { headers: { "Content-Type": "application/json", token: token } }
        );
        console.log("orders detail", res.data.ordersDetails);
        setorders(res.data.OrdersWithCourseinfo);
      } catch (error) {
        console.log("error in try block is ", error.message);
      }
    }

    fetchorder();
  }, []);
  // console.log("on frontend courses are ",courses)
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-2 bg-white shadow ">
        {" "}
        <Navbar2 />
      </div>

      <div className="min-h-screen bg-[#e5eeff]  fixed  left-0 top-0 w-65 ">
        <div className="m-10 text-gray-500">
          <div className="flex flex-col justify-between space-y-7 cursor-pointer">
            <div className="font-bold ">MAIN MENU</div>
            <a href="/">Home</a>
            <a href="/">Products</a>
            <hr className=" border-gray-300  mt-7 " />
          </div>
          {token && (
            <>
              <div className="flex flex-col justify-between space-y-7 mt-7 cursor-pointer">
                <Link to="/Orders">Orders</Link> <div href="">Settings</div>
                <div
                  onClick={() => {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("user");
                    document.location.reload();
                  }}
                >
                  Logout
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-rows-1 sm:grid-row-2 md:grid-row-3 lg:grid-row-3 gap-6 m-25 ml-70 ">
        <div className="flex font-bold text-2xl w-full justify-center">
          <span>Orders</span>
        </div>
        {orders
          .filter(function (order) {
            if (
              order.courseId.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return true;
            }
          }).length==0?(<div className="flex font-bold text-2xl w-full justify-center">
          <span>No Record Found!!!!</span>
        </div>):orders
          .filter(function (order) {
            if (
              order.courseId.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return true;
            }
          })
          .map((order) => (
            <div
              key={order._id}
              className="bg-gradient-to-tl from-blue-200 via-indigo-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-row justify-evenly relative"
            >
              {/* image div */}
              <div>
                <img
                  src={order.courseId.imageurl}
                  alt=""
                  className="h-20 w-20 my-3 absolute left-10 "
                />
              </div>
              {/* desc div */}
              <div className="w-70 my-3 overflow-y-auto break-words">
                <div className="font-bold text-gray-700 mb-3">
                  {order.courseId.title}
                </div>
                <div className="text-neutral-500 text-[15px]">
                  {order.courseId.description}
                </div>
                <div className="text-neutral-500 text-[15px] ">
                  Product id: {order.courseId._id}
                </div>
              </div>
              {/* price div */}
              <div className="text-green-800 font-bold mt-8">
                ₹{order.courseId.price}
              </div>
              {/* order div */}
              <div className="my-4">
                <div className="mb-3 font-bold">
                  Delivered on {order.orderDate}
                </div>
                <div>{order._id}</div>
                <div className="text-yellow-800">{order.status}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;

// //         <div>{order._id}</div>
//            <div>{order.buyerId}</div>
//            <div>{order.sellerId}</div>

//            <div>{order.courseId._id}</div>
//            <div>{order.courseId.title}</div>
//            <div>{order.courseId.description}</div>
//            <div>{order.courseId.creatorId}</div>
//            <div>{order.courseId.imageurl}</div>
