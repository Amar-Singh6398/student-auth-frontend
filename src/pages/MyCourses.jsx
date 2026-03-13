import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MoreVertical,
  Play,
  CheckCircle2,
  Clock,
  BookOpen
} from 'lucide-react';
import { getMyCourses } from '../services/courseService';

export default function MyCourses({ onNavigate }) {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getMyCourses();
        // Map Enrollment model to UI Course view
        const mapped = data.map(enrollment => ({
          _id: enrollment.course?._id,
          id: enrollment._id, // Use enrollment ID for unique key if needed
          title: enrollment.course?.title,
          image: enrollment.course?.image,
          instructor: enrollment.course?.instructor,
          category: enrollment.course?.category,
          progress: enrollment.progress || 0,
          completed: enrollment.lessonsCompleted || 0,
          lessons: enrollment.course?.totalLessons || 0,
          lastAccessed: enrollment.lastAccessedAt ? new Date(enrollment.lastAccessedAt).toLocaleDateString() : 'Never'
        }));
        setCourses(mapped);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = filter === "All"
    ? courses
    : filter === "In Progress"
      ? courses.filter(c => c.progress < 100)
      : courses.filter(c => c.progress === 100);

  if (loading) return <div className="text-center py-20">Loading courses...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Courses {courses.length === 0 && "(No Enrollments Yet)"}</h1>
          <p className="text-muted-foreground text-sm">Pick up where you left off</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search my courses..."
              className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all w-full md:w-64"
            />
          </div>
          <button className="p-2 border border-border rounded-xl hover:bg-secondary transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border">
        {["All", "In Progress", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${filter === tab ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab}
            <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-secondary rounded-full">
              {tab === "All" ? courses.length : tab === "In Progress" ? courses.filter(c => c.progress < 100).length : courses.filter(c => c.progress === 100).length}
            </span>
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
        {filteredCourses.map((course, idx) => (
          <motion.div
            key={course._id || course.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="aspect-[16/10] relative overflow-hidden">
              <img
                src={course.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop"}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                  {course.category}
                </span>
              </div>
              {course.progress === 100 && (
                <div className="absolute top-4 right-4 p-2 bg-emerald-500 text-white rounded-full shadow-lg">
                  <CheckCircle2 size={16} />
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                <button className="p-1 hover:bg-secondary rounded-md transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-4">by {course.instructor}</p>

              <div className="mt-auto space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      className={`h-full ${course.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span>{course.completed}/{course.lessons}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{course.lastAccessed}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate("CourseDetails", course._id)}
                    className={`p-2.5 rounded-xl transition-all ${course.progress === 100 ? 'bg-secondary text-foreground hover:bg-border' : 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5'}`}
                  >
                    {course.progress === 100 ? <CheckCircle2 size={20} /> : <Play size={20} fill="currentColor" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
