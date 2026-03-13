import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Play,
  ArrowRight
} from 'lucide-react';
import { getStudentStats } from '../services/dashboardService';
import { getMyCourses } from '../services/courseService';

export default function DashboardHome({ onNavigate }) {
  const [stats, setStats] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await getStudentStats();
        setStats([
          { label: 'Courses in Progress', value: s.coursesInProgress || '0', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Hours Spent', value: s.hoursSpent || '0h', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Assessments Passed', value: s.assessmentsPassed || '0', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Overall Progress', value: s.overallProgress || '0%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        ]);

        const c = await getMyCourses();
        setRecommended(c.slice(0, 2)); // Show up to 2 for now as recommendations

        setLoading(false);
      } catch (err) {
        console.error("Dashboard Loading Error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex animate-pulse justify-center items-center h-64">Loading portal...</div>;

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 text-primary-foreground shadow-2xl shadow-primary/20"
        >
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mastering Full-Stack Development 🚀</h1>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              You've completed {stats[3]?.value} of your current module. Resume where you left off and keep the streak alive!
            </p>
            <button
              onClick={() => onNavigate("My Courses")}
              className="px-6 py-3 bg-white text-primary rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 group"
            >
              Resume Learning <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Abstract Decorations */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 ml-40 mb-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:block opacity-20">
            <Trophy size={200} />
          </div>
        </motion.div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </section>

      {/* Continue Learning & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recommended for You</h2>
            <button
              onClick={() => onNavigate("My Courses")}
              className="text-primary text-sm font-semibold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommended.length === 0 ? (
              <p className="text-muted-foreground italic col-span-2">No active courses yet. Start learning today!</p>
            ) : recommended.map((course, i) => (
              <motion.div
                key={course._id}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={course.image || `https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop`}
                    alt="Course"
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl">
                      <Play fill="currentColor" size={20} />
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => onNavigate("CourseDetails", course._id)}
                  className="p-5 cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">{course.category || "Beginner"}</span>
                    <span className="text-xs text-muted-foreground">{course.lessons || 0} Lessons</span>
                  </div>
                  <h3 className="font-bold mb-4 group-hover:text-primary transition-colors">{course.title}</h3>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(j => (
                        <img key={j} className="w-6 h-6 rounded-full border-2 border-card" src={`https://i.pravatar.cc/100?u=${j}`} alt="avatar" />
                      ))}
                      <span className="pl-4 text-xs text-muted-foreground">+24k others</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold">Weekly Progress</h2>
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-muted-foreground">Mon</span>
                <span className="font-bold">2.5h</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} className="h-full bg-primary" />
              </div>
            </div>
            {/* Keeping placeholders for week days but updating average */}
            <div className="pt-4 mt-6 border-t border-border flex items-center gap-4">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Weekly Record</p>
                <p className="text-lg font-bold">{stats[1]?.value} Total</p>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 flex items-center justify-center font-bold text-emerald-500 text-xs text-center leading-tight">
                +12%
              </div>
            </div>
          </div>

          {/* Achievement Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">New Achievement</p>
                <h3 className="font-bold text-lg">Fast Learner</h3>
              </div>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Trophy size={20} />
              </div>
            </div>
            <p className="text-sm text-indigo-100/80 mb-4">You've completed 5 lessons in under 2 hours. Keep it up!</p>
            <button className="text-xs font-bold px-3 py-1.5 bg-white text-indigo-600 rounded-md hover:bg-opacity-90 transition-all">Claim Badge</button>
          </div>
        </section>
      </div>
    </div>
  );
}

