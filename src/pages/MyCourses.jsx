import { useState, useEffect } from "react";
import { getCourses } from "../services/courseService";
//import { useNavigate } from "react-router-dom";


export default function MyCourses({onNavigate}) {
 // const navigate = useNavigate();

  const [courses , setCourses] = useState([]);
  const enrolledCourses = courses.filter(c => c.enrolled);
const allCourses = courses.filter(c => !c.enrolled);


  useEffect(()=>{
    getCourses().then((data)=> setCourses(data));
  }, []);

  return (<div>

    {/* Page Title */}
    <h1 className="text-2xl font-bold mb-6">My Courses</h1>
  
    {/* ================= ENROLLED COURSES ================= */}
    <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
  
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {enrolledCourses.map((course) => (
        <div
          key={course.id}
          className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition"
        >
          <h2 className="text-lg font-semibold">{course.title}</h2>
  
          <p className="text-gray-400 mt-2">
            Progress: {course.progress}%
          </p>
  
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 h-2 rounded-full mt-3">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${course.progress}%` }}
            />
          </div>
  
          <button
            onClick={() => onNavigate("CourseDetails")}
            className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-sm"
          >
            Continue Learning
          </button>
        </div>
      ))}
    </div>
  
    {/* ================= ALL COURSES ================= */}
    <h2 className="text-xl font-semibold mb-4">All Courses</h2>
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allCourses.map((course) => (
        <div
        key={course.id}
        className="bg-gray-800 rounded-xl overflow-hidden 
                   hover:scale-[1.02] transition group shadow-lg"
      >
      
        {/* Image */}
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
      
        {/* Content */}
        <div className="p-5 space-y-3">
      
          <h2 className="text-lg font-semibold">
            {course.title}
          </h2>
      
          <p className="text-gray-400 text-sm">
            {course.description}
          </p>
      
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2">
            {course.tech.map((t, i) => (
              <span
                key={i}
                className="text-xs bg-slate-700 px-2 py-1 rounded"
              >
                {t}
              </span>
            ))}
          </div>
      
          {/* Footer */}
          <div className="flex items-center justify-between pt-3">
      
            {/* Rating */}
            <div className="text-yellow-400 text-sm">
              {"★".repeat(course.rating)}
              {"☆".repeat(5 - course.rating)}
            </div>
      
            {/* Price */}
            <p className="text-emerald-400 font-semibold">
              {course.price === 0 ? "Free" : `$${course.price}`}
            </p>
      
          </div>
      
          {/* Hover Button */}
          <button
            className="w-full mt-3 py-2 rounded bg-emerald-600
                       hover:bg-emerald-700
                       opacity-0 group-hover:opacity-100
                       transition-all duration-300"
          >
            View Course
          </button>
      
        </div>
      
      </div>
      
      ))}
    </div>
  
  </div>
  
  );
}
