'use client';
import { useState, useEffect } from 'react';

type Metrics = {
  totalWords: number;
  totalSettings: number;
  totalActivitiesGenerated: number;
  successfulGenerations: number;
  failedGenerations: number;
  mostUsedActivityType: string;
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [healthStatus, setHealthStatus] = useState('Checking...');

  const fetchDashboardData = async () => {
    // Fetch Health
    try {
      const healthRes = await fetch('/api/health');
      if (healthRes.ok) setHealthStatus('Healthy (200 OK)');
      else setHealthStatus('Unhealthy');
    } catch {
      setHealthStatus('Offline');
    }

    // Fetch Metrics
    try {
      const metricsRes = await fetch('/api/metrics');
      if (metricsRes.ok) {
        const data = await metricsRes.json();
        setMetrics(data);
      }
    } catch {
      console.error('Failed to fetch metrics');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Operational Dashboard</h2>
        <button 
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
        >
          Refresh Stats
        </button>
      </div>

      {/* Warning Indicators / Alerts */}
      <div className="mb-6 space-y-4">
        {metrics && metrics.totalWords === 0 && (
          <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded shadow-sm">
            <strong className="font-bold">Warning:</strong>
            <p className="text-sm">Empty word list detected. Teachers cannot generate activities. Please add words in the Admin Dashboard.</p>
          </div>
        )}
        {metrics && metrics.failedGenerations > 0 && (
          <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded shadow-sm">
            <strong className="font-bold">Alert:</strong>
            <p className="text-sm">{metrics.failedGenerations} failed generation(s) detected. Check for invalid data or missing word selections.</p>
          </div>
        )}
      </div>

      {/* Health Status Card */}
      <div className="mb-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow flex items-center gap-4">
        <div className={`w-4 h-4 rounded-full ${healthStatus.includes('Healthy') ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <div>
          <h3 className="text-xl font-bold">System Health</h3>
          <p className="text-gray-500 dark:text-gray-400">{healthStatus}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2 text-gray-500 dark:text-gray-400">Total Words Stored</h3>
          <p className="text-4xl font-bold">{metrics?.totalWords || 0}</p>
        </div>
        
        {/* Card 2 */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2 text-gray-500 dark:text-gray-400">Activity Settings Saved</h3>
          <p className="text-4xl font-bold">{metrics?.totalSettings || 0}</p>
        </div>

        {/* Card 3 */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2 text-gray-500 dark:text-gray-400">Total Activities Generated</h3>
          <p className="text-4xl font-bold">{metrics?.totalActivitiesGenerated || 0}</p>
        </div>

        {/* Card 4 */}
        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2 text-green-800 dark:text-green-200">Successful Generations</h3>
          <p className="text-4xl font-bold text-green-600 dark:text-green-400">{metrics?.successfulGenerations || 0}</p>
        </div>

        {/* Card 5 */}
        <div className="p-6 bg-red-100 dark:bg-red-900 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2 text-red-800 dark:text-red-200">Failed Generations</h3>
          <p className="text-4xl font-bold text-red-600 dark:text-red-400">{metrics?.failedGenerations || 0}</p>
        </div>

        {/* Card 6 */}
        <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2 text-blue-800 dark:text-blue-200">Most Used Activity</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{metrics?.mostUsedActivityType || 'None'}</p>
        </div>
      </div>
    </div>
  );
}