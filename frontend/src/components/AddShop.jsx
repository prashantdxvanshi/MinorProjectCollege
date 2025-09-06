"use client";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminAtom } from "@/atom";
import { LoaderThree } from "./ui/loader";
const API_BASE = process.env.VITE_API_BASE_URL;

const AddShop = () => {
  const setAdminName = useSetRecoilState(adminAtom);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setloading] = useState();
  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    if (!selectedFile) return alert("Please select an image.");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("file", selectedFile); // name must match multer field
      setloading(true);
      const res = await axios.post(
        `${API_BASE}/course/review/admin/coursecreator`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      alert("Your Product Uploaded successfully!");
      setAdminName(res.data.adminName);
      navigate("/my_created_courses");
    } catch (err) {
      console.error("Course creation error:", err);
      alert("Course creation failed!");
    }finally {
        setloading(false); 
      }
  };
 if(loading){
  return(<div className="flex justify-center h-screen items-center"><div className=""><LoaderThree/><div className="text-2xl text-blue-700 ">Uploading Your Product....</div></div></div>)
 }
  return (
    <div className="flex justify-center items-center h-full w-full py-10 px-4">
      <div className="w-full max-w-xl">
        <section className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl">
          <div className="bg-white dark:bg-gray-900 shadow-xl p-8 rounded-xl border-8 border-transparent">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-gray-300">
              Add Your Product
            </h1>
            <form
              method="post"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {["title", "description", "price"].map((field) => (
                <div key={field}>
                  <label className="block mb-2 text-lg dark:text-gray-300 capitalize">
                    {field}
                  </label>
                  <input
                    id={field}
                    type={field === "price" ? "number" : "text"}
                    name={field}
                    placeholder={`Enter ${field}`}
                    required
                    onChange={handleChange}
                    className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              <div>
                <label className="block mb-2 text-lg dark:text-gray-300">
                  Product Image
                </label>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {previewURL && (
                <div className="mt-4">
                  <p className="text-gray-600 text-sm mb-1">Image Preview:</p>
                  <img
                    src={previewURL}
                    alt="Preview"
                    className="w-full h-60 object-cover rounded-lg shadow"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full p-3 mt-6 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                LAUNCH TO SELL
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddShop;
