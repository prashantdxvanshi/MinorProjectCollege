"use client";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminAtom } from "@/atom";

const AddShop = () => {
    const adminName=useSetRecoilState(adminAtom);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageurl: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log(e.target.files);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      // console.log(formData);
      const res = await axios.post(
        "http://localhost:4000/admin/coursecreator",
        formData,
        {
          headers: {
            token:token,
          },
        }
      );
      // console.log(res.data.adminName);
      alert("created");
      adminName(res.data.adminName);
      navigate("/my_created_courses");
    } catch (error) {
      console.error("course created error:", error);
      alert("course created failed!");
    }
  };

  return (
    <div>
      <div class="flex justify-center items-center h-full w-full">
        <div class=" gap-8">
          <section
            id="back-div"
            class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl"
          >
            <div class="border-8 border-transparent rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 m-2">
              <h1 class="text-5xl font-bold text-center cursor-default dark:text-gray-300 text-gray-900">
                Add Your Product
              </h1>
              <form
                method="post"
                class="space-y-6"
                enctype="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    for="title"
                    class="block mb-2 text-lg dark:text-gray-300"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                    type="title"
                    name="title"
                    placeholder="Add Product title"
                    required=""
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    for="description"
                    class="block mb-2 text-lg dark:text-gray-300"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                    type="description"
                    name="description"
                    placeholder="Description here"
                    required=""
                    onChange={handleChange}
                  />
                  <label
                    for="description"
                    class="block mb-2 text-lg dark:text-gray-300"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                    type="number"
                    name="price"
                    placeholder="price here"
                    required=""
                    onChange={handleChange}
                  />
                  <label
                    for="description"
                    class="block mb-2 text-lg dark:text-gray-300"
                  >
                    image
                  </label>

                  <input
                    id="image"
                    class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                    type="text"
                    name="imageurl"
                    placeholder="image here"
                    required=""
                    onChange={handleChange}
                  />
                </div>

                <button
                  class="w-full p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 btn btn-primary"
                  type="submit"
                >
                  LAUNCH TO SELL
                </button>
              </form>
              <div class="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
                <p>
                  want to buy?
                  <a href="#" class="text-blue-400 transition hover:underline">
                    Buy
                  </a>
                </p>
              </div>
              {/* <div id="third-party-auth" class="flex justify-center gap-4 mt-5">
                <button class="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                  <img
                    class="w-6 h-6"
                    loading="lazy"
                    src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                    alt="Google"
                  />
                </button>
                <button class="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                  <img
                    class="w-6 h-6"
                    loading="lazy"
                    src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                    alt="LinkedIn"
                  />
                </button>
                <button class="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                  <img
                    class="w-6 h-6 dark:invert"
                    loading="lazy"
                    src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                    alt="GitHub"
                  />
                </button>
                <button class="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                  <img
                    class="w-6 h-6"
                    loading="lazy"
                    src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                    alt="Facebook"
                  />
                </button>
                <button class="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                  <img
                    class="w-6 h-6"
                    loading="lazy"
                    src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/"
                    alt="Twitter"
                  />
                </button>
                <button class="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                  <img
                    class="w-6 h-6"
                    loading="lazy"
                    src="https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/"
                    alt="Apple"
                  />
                </button>
              </div> */}
              <div class="mt-4 text-center text-sm text-gray-500">
                <p>
                  Before selling product, you can read our
                  <a href="#" class="text-blue-400 transition hover:underline">
                    Terms
                  </a>
                  and
                  <a href="#" class="text-blue-400 transition hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddShop;
