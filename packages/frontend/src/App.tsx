import { useState, useEffect } from 'react';

interface HealthData {
  status: string;
  version: string;
  uptime: number;
}

function App() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Cali Performance Detailing</h1>
      <p>AI Receptionist System</p>
      <section>
        <h2>API Status</h2>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {health && (
          <ul>
            <li>Status: <strong>{health.status}</strong></li>
            <li>Version: {health.version}</li>
            <li>Uptime: {Math.round(health.uptime)}s</li>
          </ul>
        )}
        {!health && !error && <p>Loading...</p>}
      </section>
    </main>
  );
}

export default App;