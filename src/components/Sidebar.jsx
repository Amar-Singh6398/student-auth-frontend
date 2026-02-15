import { useState } from "react";
import { FiHome, FiBookOpen, FiFileText, FiSettings, FiHelpCircle, FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function Sidebar({ collapsed, setCollapsed,activeTab, setActiveTab, user }) {
  const [showDetails, setShowDetails] = useState(false);


  const menuItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "My Courses", icon: <FiBookOpen /> },
    { name: "Assessments", icon: <FiFileText /> },
    { name: "Settings", icon: <FiSettings /> },
    { name: "Help", icon: <FiHelpCircle /> },
  ];

 

  const currentUser = user || { name: "Loading...", email: "-", role: "Student" };

  return (
    <div className={`flex flex-col h-full bg-gray-800 text-white transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      
      {/* Profile */}
      <div className="p-4 cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
        <div className="flex items-center gap-3">
          <img src={"./assests/logo192.png" } alt="Profile" className="w-10 h-10 rounded-full" />
          {!collapsed && <p className="font-semibold">{currentUser.name}</p>}
        </div>

        {/* User Details */}
        {!collapsed && showDetails && (
          <div className="mt-2 text-sm text-gray-400 flex flex-col gap-1">
            <span>{currentUser.email}</span>
            <span>{currentUser.role}</span>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1">
  {menuItems.map((item) => (
    <div
      key={item.name}
      onClick={() => setActiveTab(item.name)}   // 🔥 THIS LINE IS REQUIRED
      className={`flex items-center gap-3 p-4 cursor-pointer
        hover:bg-gray-700
        ${activeTab === item.name ? "bg-gray-700" : ""}
      `}
    >
      <span className="text-xl">{item.icon}</span>
      {!collapsed && <span>{item.name}</span>}
    </div>
  ))}
  </nav>

      {/* Collapse/Expand */}
      <button onClick={() => setCollapsed(!collapsed)} className="p-4 hover:bg-gray-700 flex justify-center">
        {collapsed ? <FiArrowRight /> : <FiArrowLeft />}
      </button>
    </div>
  );
}
