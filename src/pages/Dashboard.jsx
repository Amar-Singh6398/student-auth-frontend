import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import DashboardLayout from "../layouts/dashboardlayout";

// Student Pages
import DashboardHome from "./DashboardHome";
import MyCourses from "./MyCourses";
// import Assessments from "./Assessments";
import Settings from "./Settings";
import CourseDetails from "./CourseDetails";

// Admin Pages
import AdminOverview from "./AdminOverview";
import StudentManagement from "./StudentManagement";
import CourseManagement from "./CourseManagement";
import AIStudyAssistant from "../components/AIStudyAssistant";

export default function Dashboard() {
  const { user, loading } = useAuth();
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

  const isAdmin = user?.role === "admin";

  return (
    <DashboardLayout
      user={user}
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

      <AIStudyAssistant />

    </DashboardLayout>
  );
}

