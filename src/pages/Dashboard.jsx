// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/axios";
import logout from "../utils/logout";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login"); // redirect if no token

    setAuthToken(token); // attach token to axios

    // Fetch user data from backend
    API.get("/api/auth/me") // create this route in backend to return user info
      .then((res) => setUserData(res.data))
      .catch(() => logout(navigate));

  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {userData ? (
        <p>
        Welcome, {userData.user.email} ({userData.user.role})
      </p>
      
      ) : (
        <p>Loading...</p>
      )}

<button onClick={() => logout(navigate)}>
  Logout
</button>

<div className="min-h-screen bg-zinc-900 flex items-center justify-center">
  <h1 className="text-3xl font-bold text-emerald-400">
    Tailwind Active 🚀
  </h1>
</div>


    </div>
  );
}
