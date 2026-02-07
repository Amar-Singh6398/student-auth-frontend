import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FiLock, FiRefreshCw } from "react-icons/fi";
import AuthLayout from "../layouts/AuthLayout";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );
      setMsg(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout>

      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-white">
          Reset Password
        </h2>

        {/* Password Input */}
        <div className="relative">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full pl-10 pr-4 py-2 rounded-lg
              bg-black/30 border border-white/20
              text-white placeholder:text-white/50
              focus:outline-none focus:ring-2 focus:ring-btn_hover_color
              transition
            "
          />
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            w-full py-2 rounded-lg
            flex items-center justify-center gap-2
            uppercase font-bold text-black
            bg-btn_color hover:bg-btn_hover_color
            transition
          "
        >
          Reset Password <FiRefreshCw />
        </button>

        {/* Success Message */}
        {msg && (
          <p className="text-green-400 text-center text-sm">
            {msg}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-center text-sm">
            {error}
          </p>
        )}

        {/* Back to Login */}
        <p className="text-center text-white/60 text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-btn_color hover:underline">
            Login
          </Link>
        </p>

      </form>

    </AuthLayout>
  );
}

export default ResetPassword;
