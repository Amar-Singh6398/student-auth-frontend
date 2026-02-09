export default function ExamCard({ exam }) {
    return (
      <div className="bg-white/5 p-5 rounded-xl border border-white/10">
  
        <h3 className="text-lg font-semibold">
          {exam.subject}
        </h3>
  
        <p className="text-white/60 mt-1">
          Date: {exam.date}
        </p>
  
      </div>
    );
  }
  