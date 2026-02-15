import { modulesData } from "../mock/moduleData";

export default function CourseDetails() {

 
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
      45% Completed
    </span>
  </div>

  {/* Progress Bar */}
  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
      style={{ width: "45%" }}
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

      {/* MODULES */}
      <div className="space-y-3">

  {modulesData.map((module) => (
    <div
      key={module.id}
      className={`rounded-xl border border-white/10 overflow-hidden
        ${module.unlocked ? "bg-slate-800" : "bg-slate-800/50"}
      `}
    >

      {/* Header */}
      <details className="group">
        <summary
          className="list-none cursor-pointer flex justify-between items-center p-4"
        >
          <span className="font-medium">{module.title}</span>

          {module.unlocked ? (
            <span className="text-green-400 text-sm">Start</span>
          ) : (
            <span className="text-gray-400 text-sm">Locked</span>
          )}
        </summary>

        {/* Content */}
        <div className="px-4 pb-4 space-y-2">

          {module.lessons.map((lesson, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 text-sm p-2 rounded-lg
                ${module.unlocked
                  ? "bg-slate-900 hover:bg-slate-700 cursor-pointer"
                  : "bg-slate-900/40 text-gray-500 cursor-not-allowed"}
              `}
            >
              ▶ {lesson}
            </div>
          ))}

        </div>
      </details>

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
