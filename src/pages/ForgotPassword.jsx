import { useState } from "react";
import axios from "axios";
import { FiMail, FiSend } from "react-icons/fi";
import AuthLayout from "../layouts/AuthLayout";
import Spinner from "../components/Spinner";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(""); 

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }

      );
      setMsg("Password reset link sent to your email");

    } catch (err) {
      setMsg(err.response?.data?.msg || "Forgot Password faild!");
    }finally{
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
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

        {/* Button */}
        <button
          type="submit"
          className="
            w-full py-2 rounded-lg flex items-center justify-center gap-2
            uppercase text-black font-bold
            bg-btn_color hover:bg-btn_hover_color transition
          "
        >
          {loading ? <Spinner /> : <>Send Reset Link <FiSend /></>}

        </button>

        {msg && (
          <p className="text-center text-green-400 text-sm">{msg}</p>
        )}

      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;
