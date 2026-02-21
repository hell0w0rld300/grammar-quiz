export default function StatsCard({ label, value, sub, accent = '#667eea' }) {
  return (
    <div className="stat-card" style={{ '--accent': accent }}>
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
      {sub && <div className="stat-card-sub">{sub}</div>}
    </div>
  );
}
