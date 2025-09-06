import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const API_BASE = process.env.VITE_API_BASE_URL;

const Signup = ({setLoggedin}) => {
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
       const res=await axios.post(`${API_BASE}/admin/signup`, formData);
      alert("Signup successful!");
      setLoggedin(true);
      // const userId = res.data.user._id;
      navigate('/');
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded shadow w-[425px] ">
            <section className="flex justify-between text-3xl text-zinc-700">
              <h2>Sign up</h2>
              <a href="/">×</a>
            </section>
            <section>
               <input
                className="border border-gray-400 w-full my-3 py-2 rounded-md pl-2"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                className="border border-gray-400 w-full my-4 py-2 rounded-md pl-2"
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
              />
             
              <input
                className="border border-gray-400 w-full my-3 py-2 rounded-md pl-2"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 accent-blue-600"
                />
                <span className="text-gray-700">
                  I agree to Zomato's{" "}
                  <span className="text-red-400 cursor-pointer">
                    Terms of Service, Privacy Policy
                  </span>{" "}
                  and <br />
                  <span className="text-red-400 cursor-pointer">
                    Content Policies
                  </span>
                </span>
              </label>
              <button
                type="submit"
                className="w-full mt-3 bg-gray-400 py-3 text-center rounded-md text-white"
              >
                Create account
              </button>
              <div className="mt-5 px-20 text-center text-gray-400">or</div>
              <div className="flex mt-5 justify-center py-2 cursor-pointer border rounded-md border-gray-400">
                <img src="googlelogo.jpg" alt="" className="w-8 h-8" />
                Sign in with Google
              </div>
              <p className="mt-5 text-zinc-500">
                Already have an account?
                <a href="/Login" className="text-red-400 cursor-pointer"> Log in</a>
              </p>
            </section>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;
