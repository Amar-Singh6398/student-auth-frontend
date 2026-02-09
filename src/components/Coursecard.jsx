export default function CourseCard({ course }) {
    return (
      <div className="bg-white/5 p-5 rounded-xl border border-white/10">
  
        <h3 className="text-lg font-semibold mb-2">
          {course.title}
        </h3>
  
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-btn_color h-2 rounded-full"
            style={{ width: `${course.progress}%` }}
          />
        </div>
  
        <p className="text-sm text-white/60 mt-2">
          {course.progress}% completed
        </p>
  
      </div>
    );
  }
  