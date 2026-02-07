import { useState } from "react";
import API from "../api/axios";
import { FiMail, FiLock, FiUser, FiLogIn } from "react-icons/fi";
import AuthLayout from "../layouts/AuthLayout";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/register", { name, email, password });
      alert(res.data.message);
      window.location.href = "/login";
    } catch (err) {
        console.log(err.response); // see exact backend error in console
      alert(err.response?.data?.message || "Registration failed!");
    }
  };

  return (<AuthLayout>
    <form className="space-y-4" onSubmit={handleRegister}>
      {/* Name Input */}
      <div className="relative">
        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-btn_hover_color"

          required
        />
      </div>

      {/* Email Input */}
      <div className="relative">
        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-btn_hover_color"
      
          required
        />
      </div>

      {/* Password Input */}
      <div className="relative">
        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-btn_hover_color"
          required
        />
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="w-full py-2 rounded-lg uppercase text-black font-bold bg-btn_color hover:bg-btn_hover_color transition flex items-center justify-center gap-2"
      >
        Register <FiLogIn className="text-lg" />
      </button>
    </form>
  </AuthLayout>
);
}

