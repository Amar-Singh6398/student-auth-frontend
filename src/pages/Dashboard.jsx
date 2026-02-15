import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/axios";
import logout from "../utils/logout";

import DashboardLayout from "../layouts/dashboardlayout";

import DashboardHome from "./DashboardHome";
import MyCourses from "./MyCourses";
import Assessments from "./Assessments";
import Settings from "./Settings";

import CourseDetails from "./CourseDetails";

export default function Dashboard() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("activeTab") || "Dashboard"
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return navigate("/login");

    setAuthToken(token);

    API.get("/api/auth/me")
      .then((res) => {
        setUserData(res.data.user);
        setLoading(false);
      })
      .catch(() => logout(navigate));
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        Loading...
      </div>
    );
  }

  return (
    <DashboardLayout
      user={userData}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >

      {activeTab === "Dashboard" && (<DashboardHome onNavigate={setActiveTab} />)}
      {activeTab === "My Courses" && (
  <MyCourses onNavigate={setActiveTab} />
)}

      {activeTab === "CourseDetails" && <CourseDetails />}
      {activeTab === "Assessments" && <Assessments />}
      {activeTab === "Settings" && <Settings />}

    </DashboardLayout>
  );
}
