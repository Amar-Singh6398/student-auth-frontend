import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/axios";
import logout from "../utils/logout";

import DashboardLayout from "../layouts/dashboardlayout";

// Student Pages
import DashboardHome from "./DashboardHome";
import MyCourses from "./MyCourses";
import Assessments from "./Assessments";
import Settings from "./Settings";
import CourseDetails from "./CourseDetails";

// Admin Pages
import AdminOverview from "./AdminOverview";
import StudentManagement from "./StudentManagement";
import CourseManagement from "./CourseManagement";

export default function Dashboard() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("activeTab") || "Dashboard"
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleNavigate = (tab, id = null) => {
    setActiveTab(tab);
    if (id) setSelectedCourseId(id);
  };

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
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-medium animate-pulse text-muted-foreground">Preparing your dashboard...</p>
        </div>
      </div>
    );
  }

  const isAdmin = userData?.role === "admin";

  return (
    <DashboardLayout
      user={userData}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {/* SHARED */}
      {activeTab === "Settings" && <Settings />}

      {/* STUDENT VIEWS */}
      {!isAdmin && (
        <>
          {activeTab === "Dashboard" && <DashboardHome onNavigate={handleNavigate} />}
          {activeTab === "My Courses" && <MyCourses onNavigate={handleNavigate} />}
          {activeTab === "CourseDetails" && (
            <CourseDetails
              courseId={selectedCourseId}
              onBack={() => setActiveTab("My Courses")}
            />
          )}
        </>
      )}

      {/* ADMIN VIEWS */}
      {isAdmin && (
        <>
          {activeTab === "Dashboard" && <AdminOverview onNavigate={handleNavigate} />}
          {activeTab === "Student Management" && <StudentManagement />}
          {activeTab === "Course Management" && <CourseManagement />}
        </>
      )}

    </DashboardLayout>
  );
}

