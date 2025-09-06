import { searchAtom } from '@/atom';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
const API_BASE = process.env.VITE_API_BASE_URL;

const AllProducts = () => {
      const [courses, setcourses] = useState([]);
  const search=useRecoilValue(searchAtom);
  //  console.log(search);
  // const token=useRecoilValue(tokenAtom);
  const token=sessionStorage.getItem("token")
  console.log(token);
  useEffect(() => {
    const fetchcourse = async () => {
      try {
         
        if(!token){const res = await axios.get(`${API_BASE}/course/review`, {});
      setcourses(res.data);}
        else{const res = await axios.get(`${API_BASE}/admin/others`, {headers:{"Content-Type": "application/json",token: token}});
      setcourses(res.data);}
        
      } catch (err) {
        console.log("error is ", err);
      }
    };
    fetchcourse();
  }, []);
  

 const navigate = useNavigate();

const handleDetails = async (courseId) => {
    navigate("/details/"+courseId)
};

  return (
    <div>
        <div className="absolute top-10 right-150 font-bold text-2xl">Products</div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 m-25">
     
        {courses.filter((course)=>{
         if(course.title.toLowerCase().includes(search.toLowerCase())){
          return true;
         }
        }).map((course) => (
          <div
            key={course._id}
            className="bg-gradient-to-tl from-blue-500 via-indigo-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={course.imageurl}
              alt={course.title}
              className="w-[600px] h-[300px] object-cover rounded-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2  h-12">{course.title}</h2>
              <p className="text-gray-600 mb-4 ">{course.description.slice(0, 80)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-green-800 font-bold">₹{course.price}</span>
                <button onClick={()=>handleDetails(course._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
                 View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProducts
