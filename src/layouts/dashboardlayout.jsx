import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Bell, Search, Menu } from "lucide-react";

export default function DashboardLayout({
  user,
  activeTab,
  setActiveTab,
  children
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden transition-colors duration-300">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-8 z-40 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold tracking-tight">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search courses..."
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>

            <button className="relative p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

