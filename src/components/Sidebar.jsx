// src/components/Sidebar.jsx
import { FiBookOpen, FiUser } from "react-icons/fi";

export default function Sidebar({ user }) {
  return (
    <aside className="w-64 bg-black/40 p-6 flex flex-col justify-between">

      <div>
        <h2 className="text-xl font-bold mb-6">Student Panel</h2>

        <div className="flex flex-col items-start gap-3 mb-8">
          <div className="w-16 h-16 rounded-full bg-btn_color text-black flex items-center justify-center">
            <FiUser size={32} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white truncate flex items-start">{user?.name }</p>
            <p className="text-xs text-zinc-400 truncate flex items-start">{user?.email }</p>
            <p className="text-xs text-white/60 flex items-start">Student</p>
          </div>
        </div>

        <nav className="space-y-3">
          <p className="flex items-center gap-2 text-white/70">
            <FiBookOpen /> My Courses
          </p>
        </nav>
      </div>

      <p className="text-white/40 text-sm">
        © 2026 Student Auth
      </p>

    </aside>
  );
}
