// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/axios";
import logout from "../utils/logout";
import DashboardHome from "./DashboardHome";
import MyCourses from "./MyCourses";
import Assessments from "./Assessments";
import Settings from "./Settings";

import Sidebar from "../components/Sidebar";


export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setAuthToken(token);

    API.get("/api/auth/me")
      .then((res) => {
        console.log("User data from API:", res.data.user); // Debug log
        setUserData(res.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        logout(navigate);
      });
  }, [navigate]);

  // Show loading state while fetching user data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

 
    
    return(
      <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} 
               setCollapsed={setCollapsed}   
               activeTab={activeTab} 
               setActiveTab={setActiveTab} 
               user={userData}  />

<main
  className={`flex-1 p-8 transition-all duration-300 ${
    collapsed ? "ml-16" : "ml-64"
  }`}
>
  {activeTab === "Dashboard" && <DashboardHome user={userData}/>}
  {activeTab === "My Courses" && <MyCourses />}
  {activeTab === "Assessments" && <Assessments />}
  {activeTab === "Settings" && <Settings />}
</main>
    </div>
  );
}
  
/*
  return (
    <div className="min-h-screen flex bg-zinc-900 text-white">
     
      <Sidebar user={userData} />

     
      <DashboardContent
        user={userData}
        loading={loading}
        onLogout={() => logout(navigate)}
      />
    </div>
  );*/
