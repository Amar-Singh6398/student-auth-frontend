import React, { useState, useEffect } from 'react';
import {
    Users,
    Search,
    UserPlus,
    MoreVertical,
    Mail,
    ShieldCheck,
    Filter,
    ArrowUpDown,
    CheckCircle2,
    Clock,
    Trash2,
    Edit2,
    Calendar,
    X,
    BookPlus,
    BarChart3
} from 'lucide-react';
import API from '../services/api';
import { adminGetCourses, adminEnrollStudent, getPlatformProgress } from '../services/courseService';

export default function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [progressData, setProgressData] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    // Modal States
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isEditingStudent, setIsEditingStudent] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState("");

    const [newStudent, setNewStudent] = useState({
        name: '',
        email: '',
        password: 'password123'
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const [studentRes, courseData, progress] = await Promise.all([
                API.get('/auth/students'),
                adminGetCourses(),
                getPlatformProgress()
            ]);
            setStudents(studentRes.data || []);
            setCourses(courseData || []);
            setProgressData(progress || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching admin data:", err);
            setLoading(false);
        }
    };

    const handleOpenEditStudent = (student) => {
        setIsEditingStudent(true);
        setSelectedStudent(student);
        setNewStudent({
            name: student.name,
            email: student.email,
            password: '' // Keep empty if not changing
        });
        setShowCreateModal(true);
    };

    const handleCreateStudent = async (e) => {
        e.preventDefault();
        try {
            if (isEditingStudent) {
                await API.put(`/auth/students/${selectedStudent._id}`, {
                    name: newStudent.name,
                    email: newStudent.email
                });
            } else {
                await API.post('/auth/students', newStudent);
            }
            setShowCreateModal(false);
            fetchInitialData();
            setNewStudent({ name: '', email: '', password: 'password123' });
            setIsEditingStudent(false);
        } catch (err) {
            alert(err.response?.data?.msg || "Operation failed");
        }
    };

    const handleEnrollStudent = async () => {
        if (!selectedCourseId) return alert("Select a course");
        try {
            await adminEnrollStudent({
                courseId: selectedCourseId,
                studentId: selectedStudent._id
            });
            setShowEnrollModal(false);
            fetchInitialData();
        } catch (err) {
            alert(err.response?.data?.msg || "Enrollment failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Remove this student from the platform?")) {
            try {
                await API.delete(`/auth/students/${id}`);
                setStudents(prev => prev.filter(s => s._id !== id));
            } catch (err) {
                alert("Failed to remove student");
            }
        }
    };

    const getStudentProgress = (studentId) => {
        return progressData.filter(p => p.student?._id === studentId);
    };

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-center py-20 font-bold text-muted-foreground animate-pulse">Synchronizing Student Registry...</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Student Directory</h1>
                    <p className="text-muted-foreground text-sm font-medium">Manage accounts, enrollments, and track progress</p>
                </div>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    <UserPlus size={18} /> REGISTER STUDENT
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                    type="text"
                    placeholder="Search by name or email identity..."
                    className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-card border border-border rounded-[2rem] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/20 text-muted-foreground border-b border-border">
                            <tr>
                                <th className="px-8 py-5 font-black uppercase tracking-widest text-[10px]">Student Identity</th>
                                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Enrollments & Progress</th>
                                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Access Level</th>
                                <th className="px-8 py-5 font-black uppercase tracking-widest text-[10px] text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredStudents.length === 0 ? (
                                <tr><td colSpan="4" className="p-20 text-center text-muted-foreground font-medium italic text-lg">Empty Registry</td></tr>
                            ) : filteredStudents.map((student) => {
                                const enrollments = getStudentProgress(student._id);
                                return (
                                    <tr key={student._id} className="hover:bg-secondary/10 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-lg border border-primary/5">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-base">{student.name}</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium"><Mail size={12} /> {student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            {enrollments.length === 0 ? (
                                                <span className="text-[10px] font-bold text-muted-foreground/60 italic uppercase">No Courses Assigned</span>
                                            ) : (
                                                <div className="space-y-2">
                                                    {enrollments.slice(0, 2).map((e, i) => (
                                                        <div key={i} className="flex flex-col gap-1 max-w-[150px]">
                                                            <p className="text-[10px] font-black truncate">{e.course?.title}</p>
                                                            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                                                                <div className="h-full bg-primary" style={{ width: `${e.progress}%` }} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {enrollments.length > 2 && <p className="text-[9px] font-bold text-primary">+{enrollments.length - 2} more</p>}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">{student.role}</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                <button 
                                                  onClick={() => handleOpenEditStudent(student)}
                                                  className="p-2.5 hover:bg-primary text-primary hover:text-white rounded-xl transition-all" 
                                                  title="Edit Student"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button 
                                                  onClick={() => { setSelectedStudent(student); setShowEnrollModal(true); }}
                                                  className="p-2.5 hover:bg-primary text-primary hover:text-white rounded-xl transition-all" 
                                                  title="Add Course"
                                                >
                                                    <BookPlus size={18} />
                                                </button>
                                                <button 
                                                  onClick={() => handleDelete(student._id)} 
                                                  className="p-2.5 hover:bg-rose-500/10 rounded-xl text-rose-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CREATE STUDENT MODAL */}
            {showCreateModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
                    <div className="relative w-full max-w-md bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-border flex items-center justify-between">
                            <h2 className="text-2xl font-black">{isEditingStudent ? "Update Account" : "Register Student"}</h2>
                            <button onClick={() => { setShowCreateModal(false); setIsEditingStudent(false); }}><X /></button>
                        </div>
                        <form onSubmit={handleCreateStudent} className="p-8 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Full Name</label>
                                <input 
                                  required 
                                  className="w-full px-4 py-3 bg-secondary/30 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-primary" 
                                  value={newStudent.name}
                                  onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Email Address</label>
                                <input 
                                  required type="email" 
                                  className="w-full px-4 py-3 bg-secondary/30 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-primary" 
                                  value={newStudent.email}
                                  onChange={e => setNewStudent({...newStudent, email: e.target.value})}
                                />
                            </div>
                            {!isEditingStudent && (
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Default Password</label>
                                    <input 
                                      required type="text"
                                      className="w-full px-4 py-3 bg-secondary/30 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-primary" 
                                      value={newStudent.password}
                                      onChange={e => setNewStudent({...newStudent, password: e.target.value})}
                                    />
                                </div>
                            )}
                            <button type="submit" className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg mt-4 shadow-xl shadow-primary/20">
                                {isEditingStudent ? "SAVE CHANGES" : "CREATE ACCOUNT"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ENROLL COURSE MODAL */}
            {showEnrollModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowEnrollModal(false)} />
                    <div className="relative w-full max-w-md bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-border flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black">Add Course</h2>
                                <p className="text-xs font-bold text-muted-foreground">To: {selectedStudent?.name}</p>
                            </div>
                            <button onClick={() => setShowEnrollModal(false)}><X /></button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Select Course Portfolio</label>
                                <select 
                                  className="w-full px-4 py-3 bg-secondary/30 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-primary"
                                  value={selectedCourseId}
                                  onChange={e => setSelectedCourseId(e.target.value)}
                                >
                                    <option value="">Choose a course...</option>
                                    {courses.map(c => (
                                        <option key={c._id} value={c._id}>{c.title} (${c.price})</option>
                                    ))}
                                </select>
                            </div>
                            <button 
                              onClick={handleEnrollStudent}
                              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
                            >
                                ADD COURSE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
