"use client";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "./ui/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminAtom, tokenAtom } from "@/atom";

export default function SignupFormDemo({setLoggedin}) {
  const adminName=useSetRecoilState(adminAtom);
      const token=useSetRecoilState(tokenAtom);
  
 const [formData, setFormData] = useState({
     email: "",
     name: "",
     password: ""
   });
   const navigate = useNavigate();
   const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
        const res=await axios.post("http://localhost:4000/admin/signup", formData);
        console.log(res.data.message)
        if(res.data.message==="signed up"){
          alert("Signup successful!");
          setLoggedin(true);
          adminName(res.data.admin.name);
           token(1);
       // const userId = res.data.user._id;
       navigate('/Login');}
       
     } catch (error) {
       console.error("Signup error:", error);
       alert("Server Error or Already exists");
     }
   };
  return (
    <div className="bg-gradient-to-b from-blue-950 via-gray-600 ">
      <div
      className="shadow-input mx-auto w-full max-w-md rounded-none bg-gradient-to-b from-blue-600 via-neutral-50 p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        BUY $ SELL SHOP
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-800 dark:text-neutral-300">
        Please Register Yourself if you want to BUY $ SELL
        yet
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
             <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" name="email" value={formData.email}  onChange={handleChange}/>
        </LabelInputContainer>
          
        </div>
       <LabelInputContainer>
            <Label htmlFor="firstname">Name</Label>
            <Input id="firstname" placeholder="Tyler" type="name" name="name"  value={formData.name} onChange={handleChange}/>
          </LabelInputContainer>
          
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" name="password" value={formData.password}  onChange={handleChange}/>
        </LabelInputContainer>
        
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div
          className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button">
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <div>Already sign up? <a href="/Login" className="text-blue-700 underline cursor-pointer">Log in</a></div>
        </div>
      </form>
    </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
