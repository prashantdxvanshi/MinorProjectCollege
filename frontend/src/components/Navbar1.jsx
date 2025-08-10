import React, { useState } from "react";
import Profileholder from "./Profileholder";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchAtom, tokenAtom } from "@/atom";
import axios from "axios";

const Navbar = ({ isLoggedin }) => {
  const token = localStorage.getItem("token");
  const [search,setsearch]=useRecoilState(searchAtom);
  // console.log(token);
  const [searchData,setsearchData]=useState({search:""});
  const handleChange=(e)=>{
       setsearchData({[e.target.name]:e.target.value})
  }
  // console.log(searchData.search);
  const handleSearch=async()=>{
     setsearch(searchData.search);
  }
  return (
    <header className="mr-80 mt-6 ">
      <div className=" flex justify-center ">
        <div className="h-35px border-2 text-white w-80 rounded-full  ">
          <input type="text" name="search" value={searchData.search}  onChange={handleChange} className="w-full outline-none pl-3" />
        </div>
        <button onClick={handleSearch} className="h-35px border-2 rounded-md bg-gradient-to-r from-blue-500 via-indigo-50 text-shadow-slate-700 px-2 text-black font-bold hover:bg-gradient-to-b from-blue-500 via-fuchsia-100 ">
          Search
        </button>
      </div>
      <ul className="text-2xl flex justify-end space-x-10 cursor-pointer text-white -translate-y-2">
        { !token ? ( 
          <>
          
            <a
              className="border-2 rounded-md bg-gradient-to-r from-blue-500 via-indigo-50 text-shadow-slate-700 px-2 text-black font-bold hover:bg-gradient-to-b from-blue-500 via-fuchsia-100"
              href="/Login"
            >
              Log in
            </a>
            <a
              className="border-2 rounded-md bg-gradient-to-r from-blue-500 via-indigo-50 text-shadow-slate-700 px-2 text-black font-bold hover:bg-gradient-to-b from-blue-500 via-fuchsia-100"
              href="/Signup"
            >
              Sign up
            </a>
          </>
        ) : (
          <>
            <a
              className="border-2 rounded-md bg-gradient-to-r from-blue-500 via-indigo-50 text-shadow-slate-700 px-2 text-black font-bold hover:bg-gradient-to-b from-blue-600 via-fuchsia-100"
              href="/addShop"
            >
              Add Shop
            </a>
            <Profileholder />
          </>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
