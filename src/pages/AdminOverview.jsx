import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    BookOpen,
    Calendar,
    TrendingUp,
    UserPlus,
    PlayCircle,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { getAdminStats } from '../services/dashboardService';

export default function AdminOverview({ onNavigate }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getAdminStats();
                setData(res);
                setLoading(false);
            } catch (err) {
                console.error("Admin Stats Load Error:", err);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-center py-20 font-bold text-muted-foreground">Syncing Dashboard...</div>;

    const statsConfig = [
        { label: 'Total Students', value: data?.stats?.totalStudents || '0', growth: '+5%', trend: 'up', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Total Courses', value: data?.stats?.totalCourses || '0', growth: '+2', trend: 'up', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Active Students', value: data?.stats?.activeStudents || '0', growth: '+1%', trend: 'up', icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Total Revenue', value: `$${data?.stats?.revenue || '0'}`, growth: '+10%', trend: 'up', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Platform Insights</h1>
                    <p className="text-muted-foreground text-sm font-medium italic">Hello Admin, here is what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onNavigate("Student Management")}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <UserPlus size={16} /> CREATE STUDENT
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsConfig.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-8 rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-md transition-shadow cursor-default"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                <stat.icon size={28} />
                            </div>
                            <div className={`flex items-center gap-0.5 text-xs font-black ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.growth}
                            </div>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                    </motion.div>
                ))}
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Enrollments Table */}
                <div className="xl:col-span-2 bg-card border border-border rounded-[2rem] shadow-sm overflow-hidden text-sm">
                    <div className="p-8 border-b border-border flex items-center justify-between overflow-hidden">
                        <h2 className="font-black text-lg">Live Enrollments</h2>
                        <button
                            onClick={() => onNavigate("Student Management")}
                            className="text-primary font-black text-xs uppercase hover:underline"
                        >
                            View Active Students
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-secondary/20 text-muted-foreground text-left">
                                    <th className="px-8 py-5 font-black uppercase tracking-widest text-[10px]">Student Name</th>
                                    <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Enrolled Course</th>
                                    <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Date</th>
                                    <th className="px-8 py-5 font-black uppercase tracking-widest text-[10px] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {data?.recentEnrollments?.length === 0 ? (
                                    <tr><td colSpan="4" className="p-12 text-center text-muted-foreground italic font-medium">No recent enrollment activity recorded.</td></tr>
                                ) : data?.recentEnrollments?.map((item) => (
                                    <tr key={item.id} className="hover:bg-secondary/10 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm border border-primary/20">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black">{item.name}</p>
                                                    <p className="text-[10px] font-medium text-muted-foreground">{item.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 font-bold">
                                            {item.course}
                                        </td>
                                        <td className="px-6 py-5 text-muted-foreground font-medium">{item.date}</td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-all">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Popular Courses Sidebar */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-[2rem] shadow-sm p-8">
                        <h2 className="font-black text-lg mb-8 flex items-center gap-3">
                            <PlayCircle size={24} className="text-primary" /> Hot Picks
                        </h2>
                        <div className="space-y-8">
                            {data?.popularCourses?.length === 0 ? (
                                <p className="text-xs text-muted-foreground italic">Your platform is waiting for its first course.</p>
                            ) : data?.popularCourses?.map((course) => (
                                <div key={course._id} className="flex items-center gap-4 group cursor-pointer" onClick={() => onNavigate("Course Management")}>
                                    <div className="w-16 h-12 rounded-xl bg-secondary overflow-hidden border border-border">
                                        <img src={course.image || `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=100&auto=format&fit=crop`} alt="course" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-sm truncate group-hover:text-primary transition-colors">{course.title}</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">{course.enrollmentCount} Active Learners</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => onNavigate("Course Management")}
                            className="w-full mt-10 py-4 bg-secondary text-foreground font-black rounded-2xl text-xs hover:bg-border transition-all shadow-sm active:scale-95"
                        >
                            ACCESS COURSE PORTFOLIO
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500 to-primary rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="font-black text-lg mb-2">Growth Center</h3>
                            <p className="text-[11px] text-white/80 font-medium leading-relaxed mb-6">
                                Everything looks good! You've had a 12% increase in new student registrations this week.
                            </p>
                            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-[10px] font-black uppercase transition-all tracking-wider">Explore Analysis</button>
                        </div>
                        <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-20 rotate-12 group-hover:scale-110 transition-transform duration-700">
                             <TrendingUp size={120} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
