// src/pages/Login.jsx
import { useState } from "react";
import API, { setAuthToken } from "../api/axios";
import AuthLayout from "../layouts/AuthLayout";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await API.post("/api/auth/login", { email, password });

      const { token} = res.data;

      localStorage.setItem("token", token);
      setAuthToken(token);

      setMsg("Login successful! Redirecting...");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form className="space-y-4" onSubmit={handleLogin}>

        {/* EMAIL */}
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full pl-10 pr-4 py-2 rounded-lg
              bg-black/30 border border-white/20
              text-white placeholder:text-white/50
              focus:outline-none focus:ring-2 focus:ring-btn_hover_color
            "
          />
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full pl-10 pr-4 py-2 rounded-lg
              bg-black/30 border border-white/20
              text-white placeholder:text-white/50
              focus:outline-none focus:ring-2 focus:ring-btn_hover_color
            "
          />
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2 rounded-lg flex items-center justify-center gap-2
            uppercase text-black font-bold
            bg-btn_color hover:bg-btn_hover_color
            transition disabled:opacity-50
          "
        >
          {loading ? <Spinner /> : <>Login <FiLogIn /></>}
         
        </button>

        {/* MESSAGE */}
        {msg && (
          <p className="text-center text-sm text-white">
            {msg}
          </p>
        )}

        {/* LINK */}
        <div className="text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-white/70 hover:text-white"
          >
            Forgot Password?
          </Link>
        </div>

      </form>
    </AuthLayout>
  );
}
