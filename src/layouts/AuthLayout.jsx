export default function AuthLayout({ children }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            Student Auth System
          </h1>
          {children}
        </div>
      </div>
    );
  }
  