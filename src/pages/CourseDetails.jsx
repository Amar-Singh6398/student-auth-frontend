import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Play,
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  FileText,
  MessageSquare,
  ArrowRight,
  Download,
  Share2,
  Clock,
  Layout
} from 'lucide-react';
import { getCourseById, markLessonComplete } from '../services/courseService';

export default function CourseDetails({ courseId, onBack }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [expandedModules, setExpandedModules] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
        if (data.modules?.length > 0) {
          setExpandedModules([data.modules[0]._id]);
          if (data.modules[0].lessons?.length > 0) {
            setActiveLesson(data.modules[0].lessons[0]);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Course Details Load Error:", err);
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const toggleModule = (id) => {
    setExpandedModules(prev =>
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  const handleMarkComplete = async () => {
    if (!course || !activeLesson) return;
    try {
      await markLessonComplete(course._id, activeLesson._id);
      // Refresh to update progress
      const updated = await getCourseById(course._id);
      setCourse(updated);
      // Also update local active lesson status
      setActiveLesson(prev => ({ ...prev, completed: true }));
    } catch (err) {
      console.error("Completion error:", err);
    }
  };

  if (loading) return <div className="text-center py-20 font-medium">Loading course content...</div>;
  if (!course) return <div className="text-center py-20 font-medium">Course not found. <button onClick={onBack} className="text-primary underline">Go back</button></div>;

  return (
    <div className="flex flex-col xl:flex-row h-[calc(100vh-120px)] gap-6 animate-in fade-in duration-500">
      {/* Video / Content Player */}
      <div className="flex-1 flex flex-col min-w-0 bg-background rounded-2xl overflow-hidden border border-border shadow-sm">
        <div className="aspect-video bg-zinc-950 relative">
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
             <Layout size={80} />
             <p className="absolute bottom-10 text-sm font-bold text-white/40">CONTENT PLAYER PLACEHOLDER</p>
          </div>
          <div className="absolute top-4 left-4">
            <button onClick={onBack} className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/80 transition-all flex items-center gap-2 text-xs font-bold">
              <ChevronLeft size={14} /> BACK TO LIST
            </button>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest px-2 py-1 bg-primary/10 rounded mb-2 inline-block">
                Currently Learning
              </span>
              <h1 className="text-2xl font-bold">{activeLesson?.title || "Select a Lesson"}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleMarkComplete}
                disabled={activeLesson?.completed}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-sm shadow-lg transition-all ${activeLesson?.completed ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-emerald-500 text-white shadow-emerald-500/20 hover:scale-105 active:scale-95'}`}
              >
                <CheckCircle size={16} /> {activeLesson?.completed ? 'COMPLETED' : 'MARK COMPLETE'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b border-border mb-6">
            {['Overview', 'Resources', 'Discussion'].map((tab, i) => (
              <button key={tab} className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all ${i === 0 ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="text-muted-foreground space-y-4">
            <p>{course.description}</p>
          </div>
        </div>
      </div>

      {/* Course Content Sidebar (Mobile: Below, Desktop: Right) */}
      <div className="w-full xl:w-[400px] flex flex-col gap-4">
        <div className="bg-card border border-border rounded-2xl flex flex-col h-full overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-card/50">
            <h2 className="font-bold mb-2">Course Playlist</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-muted-foreground uppercase">PROGRESS</span>
                <span>{course.progress || 0}% COMPLETED</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${course.progress || 0}%` }} />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {course.modules?.map((module, idx) => (
              <div key={module._id} className="border-b border-border last:border-0">
                <button
                  onClick={() => toggleModule(module._id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col items-start gap-1 text-left">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Module {idx + 1}</span>
                    <span className="font-bold text-sm">{module.title}</span>
                  </div>
                  {expandedModules.includes(module._id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <AnimatePresence>
                  {expandedModules.includes(module._id) && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden bg-secondary/20"
                    >
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson._id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`
                            w-full flex items-center gap-4 px-6 py-4 border-l-4 transition-all
                            ${activeLesson?._id === lesson._id ? 'bg-primary/5 border-primary' : 'border-transparent hover:bg-secondary/40'}
                          `}
                        >
                          <div className={`p-2 rounded-lg ${lesson.completed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                            {lesson.completed ? <CheckCircle size={16} /> : <Play size={16} />}
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className={`text-sm font-semibold truncate ${activeLesson?._id === lesson._id ? 'text-primary' : ''}`}>{lesson.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium"><Clock size={10} /> {lesson.duration}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="p-4 bg-secondary/30 mt-auto">
             <p className="text-[10px] text-center text-muted-foreground mb-3 font-bold uppercase tracking-wider">Course Instructor: {course.instructor}</p>
            <button
               onClick={onBack}
               className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 shadow-md transition-all active:scale-95"
            >
              <ChevronLeft size={18} /> ALL COURSES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
