import { useState } from "react";
import { modulesData as initialModules } from "../mock/moduleData";

export default function CourseDetails() {

  const [modules, setModules] = useState(initialModules);
  const [activeVideo, setActiveVideo] = useState(null);

  const isModuleUnlocked = (index) =>{
    if(index===0) return true;

    return modules[index - 1].lessons.every(
      (lesson) => lesson.completed 
    )
  }

  const toggleLessonCompleted = (moduleId, lessonIndex) => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== moduleId) return mod;
  
        const updatedLessons = mod.lessons.map((lesson, i) =>
          i === lessonIndex
            ? { ...lesson, completed: true }
            : lesson
        );
  
        return { ...mod, lessons: updatedLessons };
      })
    );
  };
  

 
  return (
   
    
    <div className="max-w-6xl mx-auto space-y-6">

      {/* HEADER SECTION */}
      {/* 🔹 Sticky Header */}
<div className="sticky top-0 z-20 bg-[#020617]/80 backdrop-blur-xl border-b border-white/10">

<div className="px-6 py-4 space-y-3">

  {/* Course Title */}
  <div className="flex items-center justify-between">
    <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
      MERN Stack Development
    </h1>

    <span className="text-xs text-gray-400">
      25% Completed
    </span>
  </div>

  {/* Progress Bar */}
  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
      style={{ width: "25%" }}
    />
  </div>

</div>

</div>


      {/* TECH STACK + WHAT YOU LEARN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="font-semibold mb-4">Tech Stack</h2>
          <div className="flex gap-3 flex-wrap">
            <span className="px-3 py-1 bg-gray-700 rounded">React</span>
            <span className="px-3 py-1 bg-gray-700 rounded">Node</span>
            <span className="px-3 py-1 bg-gray-700 rounded">MongoDB</span>
            <span className="px-3 py-1 bg-gray-700 rounded">Express</span>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="font-semibold mb-4">What You'll Learn</h2>
          <ul className="list-disc ml-5 text-gray-400 space-y-1">
            <li>Build full stack apps</li>
            <li>Create REST APIs</li>
            <li>Authentication & Authorization</li>
          </ul>
        </div>

      </div>

      {activeVideo && (
      <div className="mb-6">
        <iframe
          src={activeVideo}
          className="w-full h-[400px] rounded-xl"
          allowFullScreen
        />
      </div>
    )}

      {/* MODULES */}
      <div className="space-y-3">
      {modules.map((module, moduleIndex) => (
  <div key={module.id} className="bg-slate-800 rounded-xl p-4 mb-4">

    {/* MODULE HEADER */}
    <div className="flex justify-between items-center">
      <h3 className="font-semibold">{module.title}</h3>

      {module.lessons.every(l => l.completed)
        ? <span className="text-green-400 text-sm">Completed</span>
        : module.unlocked
        ? <span className="text-blue-400 text-sm">Start</span>
        : <span className="text-gray-400 text-sm">Locked</span>
      }
    </div>

    {/* LESSONS */}
    <div className="mt-3 space-y-2">
      {module.lessons.map((lesson, idx) => (
        <div
          key={idx}
          onClick={() => {
            if (!module.unlocked){
               alert("Finish previous module");
               return
            }

            setActiveVideo(lesson.videoUrl);
          }}
          className={`p-2 rounded-lg flex justify-between items-center
            ${module.unlocked
              ? "bg-slate-900 hover:bg-slate-700 cursor-pointer"
              : "bg-slate-900/40 text-gray-500 cursor-not-allowed"}
          `}
        >
          <span>{lesson.title}</span>

          <input
            type="checkbox"
            checked={lesson.completed}
            onChange={(e) => {
              const updated = [...modules];
              updated[moduleIndex].lessons[idx].completed = e.target.checked;

              const allCompleted = 
              (updated[moduleIndex].lessons.every(l => l.completed)) 

                if (updated[moduleIndex + 1]) {
                  updated[moduleIndex + 1 ].unlocked = allCompleted;
                }
              

              setModules(updated);
            }}
          />
        </div>
      ))}
    </div>
  </div>
))}

</div>


      {/* ACHIEVEMENTS */}
      <div className="bg-slate-900 rounded-xl p-6">
  <h3 className="text-lg font-semibold mb-2">Achievements</h3>
  <p className="text-gray-400 mb-4">
    Complete quizzes to earn badges
  </p>

  <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm">
    View Badges
  </button>
</div>


    </div>
  );
}
