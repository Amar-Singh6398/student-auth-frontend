// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/axios";
import logout from "../utils/logout";
import { FiUser, FiLogOut } from "react-icons/fi";
import Spinner from "../components/Spinner";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setAuthToken(token);

    API.get("/api/auth/me")
      .then((res) => setUserData(res.data.user))
      .catch(() => logout(navigate));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <h1 className="text-xl font-bold">Student Dashboard</h1>

        <button
          onClick={() => logout(navigate)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-red-500 hover:bg-red-600 transition"
        >
          <FiLogOut />
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6 grid md:grid-cols-2 gap-6">

        {!userData ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            {/* PROFILE CARD */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-btn_color
                flex items-center justify-center text-black text-xl">
                  <FiUser />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Welcome {userData.email}
                  </h2>
                  <p className="text-white/60">
                    Role: {userData.role}
                  </p>
                </div>
              </div>
            </div>

            {/* STATUS CARD */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Account Status</h3>
              <p className="text-green-400">Active</p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
