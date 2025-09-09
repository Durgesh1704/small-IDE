export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">
            Welcome to your EARTH Platform dashboard!
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-green-100 rounded">
              <h2 className="text-green-800 font-semibold">✅ Dashboard Working</h2>
              <p className="text-green-700">The dashboard is loading correctly.</p>
            </div>
            <div className="p-4 bg-blue-100 rounded">
              <h2 className="text-blue-800 font-semibold">📊 Your Stats</h2>
              <p className="text-blue-700">Your environmental impact statistics will appear here.</p>
            </div>
            <div className="p-4 bg-purple-100 rounded">
              <h2 className="text-purple-800 font-semibold">🏆 Achievements</h2>
              <p className="text-purple-700">Your badges and achievements will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}