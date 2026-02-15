import { FaBookOpen } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";


export default function DashboardHome({ user , onNavigate }) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user?.name} 👋
        </h1>
  
        <p className="text-gray-400 mb-6">
          Here is your dashboard overview.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  {/* Courses */}
  <div onClick={() => onNavigate("My Courses")} 
  className="bg-gray-800 p-6 rounded-xl shadow hover:bg-gray-700 transition cursor-pointer">
    <div className="flex items-center gap-3">
      <FaBookOpen className="text-blue-400 text-2xl" />
      <h2 className="text-lg font-semibold">Courses</h2>
    </div>

    <p className="text-3xl mt-3 font-bold">3</p>
    <p className="text-sm text-gray-400 mt-1">Enrolled Courses</p>
  </div>

  {/* Assessments */}
  <div onClick={() => onNavigate("Assessments")} 
  className="bg-gray-800 p-6 rounded-xl shadow hover:bg-gray-700 transition cursor-pointer">
    <div className="flex items-center gap-3">
      <MdAssignment className="text-purple-400 text-2xl" />
      <h2 className="text-lg font-semibold">Assessments</h2>
    </div>

    <p className="text-3xl mt-3 font-bold">2</p>
    <p className="text-sm text-gray-400 mt-1">Pending Tests</p>
  </div>

  {/* Upcoming Exam */}
  <div className="bg-gray-800 p-6 rounded-xl shadow hover:bg-gray-700 transition">
    <div className="flex items-center gap-3">
      <AiOutlineCalendar className="text-green-400 text-2xl" />
      <h2 className="text-lg font-semibold">Upcoming Exam</h2>
    </div>

    <p className="text-xl mt-3 font-bold">
      JavaScript Fundamentals
    </p>

    <p className="text-sm text-gray-400 mt-1">
      20 Feb 2026 • 10:00 AM
    </p>

    <button className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-sm">
      View Details
    </button>
  </div>

</div>


      </div>
    );
  }
  