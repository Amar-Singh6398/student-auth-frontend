// src/pages/Login.jsx
import { useState } from "react";
import API, { setAuthToken } from "../api/axios";
import AuthLayout from "../layouts/AuthLayout";
import { FiLock, FiLogIn , FiMail } from "react-icons/fi";
import {Link} from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", { email, password });
      const { token, user } = res.data;

      // Save token in localStorage
      localStorage.setItem("token", token);

      // Attach token to future API requests
      setAuthToken(token);

      alert(`Welcome, ${user.email}!`); // backend returns email
      window.location.href = "/dashboard"; // redirect to dashboard
    } catch (err) {
      console.log(err.response);
      alert(err.response?.data?.msg || "Login failed!");
    }
  };

  return (
    <AuthLayout>
      <form className="space-y-4" onSubmit={handleLogin}>
      <div className="relative">
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="
      w-full pl-10 pr-4 py-2 rounded-lg
      bg-black/30 border border-white/20
      text-white placeholder:text-white/50
      focus:outline-none focus:ring-2 focus:ring-btn_hover_color
      transition
    "
  />
  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
</div>

<div className="relative">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-btn_hover_color"
        />
        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />

        </div>

        

        <button
          type="submit"
          className="w-full py-2 rounded-lg flex items-center justify-center gap-2 uppercase text-black font-bold bg-btn_color hover:bg-btn_hover_color transition"
        >
        Login <FiLogIn className="text-lg group-hover:translate-x-1 transition" /> 
        </button>

        <Link to="/forgot-password">Forgot Password?</Link>
      </form>
    </AuthLayout>
  );
}
