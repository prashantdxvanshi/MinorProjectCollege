import { useState } from "react";
import "./App.css";
import axios from "axios";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes,Link ,Outlet} from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignupFormDemo from "./components/signup-form-demo";
import AddShop from "./components/AddShop";
import Buy from "./components/Buy";
import My_created_courses from "./components/My_created_courses";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "./atom";
import Chat from "./components/Chat";
import Orders from "./components/Orders";

function App() {
  const [isLoggedin, setLoggedin] = useState(false);
  // const [userData, setuserData] = useState(" ");
  const token = useRecoilValue(tokenAtom);

  return (
    <>
       


      <Routes>
        <Route path="/" element={<Home isLoggedin={isLoggedin} />}/>
        
        <Route path="/Login" element={<Login setLoggedin={setLoggedin}/>}/>
        <Route path="/Signup" element={<SignupFormDemo setLoggedin={setLoggedin}/>}/>
        <Route path="/addShop" element={<AddShop/>}/>
        <Route path="/details/:id" element={<Buy/>}/>
        <Route path="/chat/:id" element={<Chat/>}/>
        <Route path="/Orders" element={<Orders/>}/>
       
        <Route path="/my_created_courses" element={<My_created_courses/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        
      </Routes>
    

    </>
  );
}

export default App;
