import { useState } from "react";
import {
  Home,
  BookOpen,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Users,
  PlusCircle,
  Bell,
  Moon,
  Sun,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import logout from "../utils/logout";

export default function Sidebar({ collapsed, setCollapsed, activeTab, setActiveTab, user }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  const isAdmin = user?.role === "admin";

  const studentMenu = [
    { id: "Dashboard", name: "Overview", icon: Home },
    { id: "My Courses", name: "My Learning", icon: BookOpen },
  ];

  const adminMenu = [
    { id: "Dashboard", name: "Stats", icon: Home },
    { id: "Student Management", name: "Students", icon: Users },
    { id: "Course Management", name: "Manage Courses", icon: PlusCircle },
  ];

  const secondaryMenu = [
    { id: "Settings", name: "Settings", icon: Settings },
  ];

  const currentMenu = isAdmin ? adminMenu : studentMenu;

  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="relative flex flex-col h-full bg-card border-r border-border transition-colors duration-300 shadow-xl z-50"
    >
      {/* Brand Logo / Header */}
      <div className="flex items-center gap-3 p-6 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
          <Award size={24} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-bold text-xl tracking-tight whitespace-nowrap"
            >
              LMS<span className="text-primary">Master</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* User Profile Hook */}
      <div className="px-4 mb-6">
        <div
          onClick={() => setShowProfileDetails(!showProfileDetails)}
          className={`p-3 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all cursor-pointer group ${collapsed ? 'items-center justify-center' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (user?.name || "default")}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user?.name || "Guest User"}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role || "student"}</p>
              </div>
            )}
          </div>

          <AnimatePresence>
            {!collapsed && showProfileDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pt-3 mt-3 border-t border-border/50 text-xs text-muted-foreground flex flex-col gap-2"
              >
                <p className="truncate">{user?.email}</p>
                <div className="flex items-center justify-between mt-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); logout(navigate); }}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 custom-scrollbar overflow-y-auto">
        <div className="mb-2">
          {!collapsed && <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Main Menu</p>}
          {currentMenu.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              active={activeTab === item.id}
              collapsed={collapsed}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </div>

        <div className="pt-4 border-t border-border/50">
          {!collapsed && <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">General</p>}
          {secondaryMenu.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              active={activeTab === item.id}
              collapsed={collapsed}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 mt-auto">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-secondary transition-all text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2"><ChevronLeft size={20} /> <span className="text-sm font-medium">Collapse Sidebar</span></div>}
        </button>
      </div>
    </motion.div>
  );
}

function SidebarItem({ item, active, collapsed, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`
        relative w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
        ${active
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"}
        ${collapsed ? "justify-center" : ""}
      `}
    >
      <Icon size={20} className={`${active ? "scale-110" : "group-hover:scale-110"} transition-transform duration-200`} />
      {!collapsed && (
        <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
      )}
      {active && !collapsed && (
        <motion.div
          layoutId="active-pill"
          className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary-foreground"
        />
      )}
      {collapsed && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
          {item.name}
        </div>
      )}
    </button>
  );
}

