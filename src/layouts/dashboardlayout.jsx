import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  user,
  activeTab,
  setActiveTab,
  children
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
        <aside className="">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />
      </aside>


      <main
        className={`flex-1 h-screen overflow-y-auto p-6 transition-all duration-300
        ${collapsed ? "ml-16" : "ml-4"}`}
      >
        {children}
      </main>

    </div>
  );
}
