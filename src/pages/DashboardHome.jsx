export default function DashboardHome({ user }) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user?.name} 👋
        </h1>
  
        <p className="text-gray-400 mb-6">
          Here is your dashboard overview.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold">Courses</h2>
            <p className="text-2xl mt-2">5</p>
          </div>
  
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold">Assessments</h2>
            <p className="text-2xl mt-2">2</p>
          </div>
  
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold">Progress</h2>
            <p className="text-2xl mt-2">60%</p>
          </div>
        </div>
      </div>
    );
  }
  