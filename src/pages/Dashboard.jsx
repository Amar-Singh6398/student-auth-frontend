// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/axios";
import logout from "../utils/logout";

import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen flex bg-zinc-900 text-white">
      {/* SIDEBAR */}
      <Sidebar user={userData} />

      {/* MAIN CONTENT */}
      <DashboardContent
        user={userData}
        loading={loading}
        onLogout={() => logout(navigate)}
      />
    </div>
  );
}