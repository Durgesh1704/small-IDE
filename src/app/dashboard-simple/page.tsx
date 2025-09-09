export default function SimpleDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Simple Dashboard Test</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">
            This is a simple test dashboard page to verify routing works correctly.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-green-100 rounded">
              <h2 className="text-green-800 font-semibold">✅ Dashboard Page Working</h2>
              <p className="text-green-700">The dashboard route is functioning properly.</p>
            </div>
            <div className="p-4 bg-blue-100 rounded">
              <h2 className="text-blue-800 font-semibold">📊 Stats Placeholder</h2>
              <p className="text-blue-700">Your environmental statistics would appear here.</p>
            </div>
            <div className="p-4 bg-purple-100 rounded">
              <h2 className="text-purple-800 font-semibold">🏆 Achievements Placeholder</h2>
              <p className="text-purple-700">Your badges and achievements would appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}