// src/components/DashboardContent.jsx
import Spinner from "./Spinner";
import { FiLogOut } from "react-icons/fi";

export default function DashboardContent({ user, loading, onLogout }) {

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="flex-1 p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Welcome {user?.name}
        </h1>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
        >
          <FiLogOut /> Logout
        </button>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="font-semibold mb-2">Current Course</h3>
          <p>MERN Stack</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="font-semibold mb-2">Progress</h3>
          <p>45% Completed</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="font-semibold mb-2">Next Exam</h3>
          <p>React Assessment</p>
        </div>

      </div>

    </main>
  );
}
