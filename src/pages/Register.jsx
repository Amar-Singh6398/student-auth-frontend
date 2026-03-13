import { useState } from "react";
import { Mail, Lock, User, ArrowRight, UserPlus, Github } from "lucide-react";
import AuthLayout from "../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join our community of over 10k+ learners</p>
        </div>

        <form className="space-y-5" onSubmit={handleRegister}>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm rounded-xl flex items-center gap-2"
              >
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-rose-500" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="flex p-1 bg-secondary/50 rounded-xl border border-border">
              {["student", "admin"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData({ ...formData, role })}
                  className={`
                    flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all
                    ${formData.role === role ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}
                  `}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="relative group">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full pl-11 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:bg-card outline-none transition-all placeholder:text-muted-foreground/50"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" size={18} />
            </div>

            <div className="relative group">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full pl-11 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:bg-card outline-none transition-all placeholder:text-muted-foreground/50"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" size={18} />
            </div>

            <div className="relative group">
              <input
                type="password"
                placeholder="Secure Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full pl-11 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:bg-card outline-none transition-all placeholder:text-muted-foreground/50"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" size={18} />
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground px-1">
            By creating an account, you agree to our <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>.
          </p>

          <button
            type="submit"
            disabled={loading || success}
            className={`
              w-full py-3.5 rounded-xl flex items-center justify-center gap-2
              text-sm font-bold shadow-lg transition-all active:scale-[0.98]
              ${success ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-foreground hover:shadow-primary/25 hover:-translate-y-0.5'}
              disabled:opacity-70 disabled:cursor-not-allowed
            `}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-white rounded-full animate-spin" />
            ) : success ? (
              <span className="flex items-center gap-2">Success! Redirecting... <ArrowRight size={18} /></span>
            ) : (
              <span className="flex items-center gap-2">Create Account <UserPlus size={18} /></span>
            )}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl hover:bg-secondary transition-colors text-sm font-medium">
              <Github size={18} /> GitHub
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl hover:bg-secondary transition-colors text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
              Sign In
            </Link>
          </p>
        </form>
      </motion.div>
    </AuthLayout>
  );
}



