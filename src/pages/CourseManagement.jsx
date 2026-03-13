import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Video,
    Settings2,
    X,
} from 'lucide-react';
import { adminGetCourses, adminDeleteCourse, adminCreateCourse, adminUpdateCourse } from '../services/courseService';

export default function CourseManagement() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCourseId, setCurrentCourseId] = useState(null);
    
    const [courseForm, setCourseForm] = useState({
        title: '',
        description: '',
        instructor: '',
        price: 0,
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop',
        status: 'published'
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await adminGetCourses();
            setCourses(data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching courses:", err);
            setLoading(false);
        }
    };

    const handleOpenCreate = () => {
        setIsEditing(false);
        setCourseForm({
            title: '',
            description: '',
            instructor: '',
            price: 0,
            category: 'Development',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop',
            status: 'published'
        });
        setShowModal(true);
    };

    const handleOpenEdit = (course) => {
        setIsEditing(true);
        setCurrentCourseId(course._id);
        setCourseForm({
            title: course.title,
            description: course.description,
            instructor: course.instructor,
            price: course.price,
            category: course.category,
            image: course.image,
            status: course.status
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await adminUpdateCourse(currentCourseId, courseForm);
            } else {
                // Add a default module for new courses
                const courseData = {
                    ...courseForm,
                    modules: [{
                        title: "Welcome Module",
                        lessons: [{ title: "Getting Started", duration: "10:00", type: "video" }]
                    }]
                };
                await adminCreateCourse(courseData);
            }
            setShowModal(false);
            fetchCourses();
        } catch (err) {
            alert("Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this course and all its content?")) {
            try {
                await adminDeleteCourse(id);
                setCourses(prev => prev.filter(c => c._id !== id));
            } catch (err) {
                alert("Failed to delete course");
            }
        }
    };

    const filteredCourses = courses.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-center py-20 font-bold text-muted-foreground animate-pulse">Synchronizing Course Data...</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Content Repository</h1>
                    <p className="text-muted-foreground text-sm font-medium italic">Create, optimize and distribute your courses</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    <Plus size={18} /> CREATE NEW COURSE
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Active Nodes", val: courses.length, color: "text-foreground" },
                    { label: "Published", val: courses.filter(c => c.status === 'published').length, color: "text-emerald-500" },
                    { label: "Draft Index", val: courses.filter(c => c.status === 'draft').length, color: "text-amber-500" },
                    { label: "Rev Projection", val: `$${courses.reduce((acc, c) => acc + (c.price * (c.enrollmentCount || 0)), 0)}`, color: "text-blue-500" }
                ].map((s, i) => (
                    <div key={i} className="p-6 border border-border rounded-[2rem] bg-card shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{s.label}</p>
                        <p className={`text-3xl font-black ${s.color}`}>{s.val}</p>
                    </div>
                ))}
            </div>

            <div className="bg-card border border-border rounded-[2rem] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Filter by course title..."
                            className="w-full pl-12 pr-4 py-4 bg-secondary/30 border border-transparent rounded-2xl focus:border-primary focus:bg-background outline-none transition-all font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/20 text-muted-foreground">
                            <tr>
                                <th className="px-8 py-5 font-black uppercase tracking-widest text-[10px]">Title & Category</th>
                                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Architecture</th>
                                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Economic Value</th>
                                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Status</th>
                                <th className="px-8 py-5 font-black uppercase tracking-widest text-[10px] text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredCourses.length === 0 ? (
                                <tr><td colSpan="5" className="p-20 text-center text-muted-foreground font-black italic text-lg uppercase">Registry Offline</td></tr>
                            ) : filteredCourses.map((course) => (
                                <tr key={course._id} className="hover:bg-secondary/10 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 rounded-xl bg-secondary overflow-hidden shrink-0 border border-border">
                                                <img src={course.image} alt="thumb" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-black text-base leading-none mb-1">{course.title}</p>
                                                <p className="text-[10px] font-black uppercase text-primary">{course.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-bold text-muted-foreground">
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-xl"><Video size={14} /> {course.totalLessons} LESSONS</span>
                                    </td>
                                    <td className="px-6 py-6 font-black text-base">
                                        ${course.price}
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${course.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                            {course.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button className="p-2.5 hover:bg-primary text-primary hover:text-white rounded-xl transition-all" onClick={() => handleOpenEdit(course)}>
                                                <Settings2 size={18} />
                                            </button>
                                            <button className="p-2.5 hover:bg-rose-500/10 rounded-xl text-rose-500 transition-colors" onClick={() => handleDelete(course._id)}>
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative w-full max-w-lg bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-border flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black">{isEditing ? "Edit Course" : "Forge Course"}</h2>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{isEditing ? "Update your learning node" : "Initialize new learning node"}</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-secondary rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Asset Title</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-primary transition-all"
                                        placeholder="eg: Neural Networks"
                                        value={courseForm.title}
                                        onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Instructor</label>
                                    <input
                                        required
                                        className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-primary transition-all"
                                        value={courseForm.instructor}
                                        onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Valuation ($)</label>
                                    <input
                                        type="number"
                                        className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-primary transition-all"
                                        value={courseForm.price}
                                        onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Classification</label>
                                    <select
                                        className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-primary transition-all"
                                        value={courseForm.category}
                                        onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                                    >
                                        <option>Development</option>
                                        <option>Design</option>
                                        <option>Business</option>
                                        <option>Marketing</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Node Status</label>
                                <div className="flex gap-2">
                                    {['published', 'draft'].map(s => (
                                        <button
                                          key={s}
                                          type="button"
                                          onClick={() => setCourseForm({...courseForm, status: s})}
                                          className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${courseForm.status === s ? 'bg-primary text-white shadow-lg' : 'bg-secondary/30 text-muted-foreground'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description Brief</label>
                                <textarea
                                    className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-primary transition-all min-h-[100px]"
                                    value={courseForm.description}
                                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all mt-4"
                            >
                                {isEditing ? "SAVE UPDATES" : "DEPLOY COURSE"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
