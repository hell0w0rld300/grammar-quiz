export default function BarChart({ title, rows, labelKey, valueKey, suffix = '%' }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="chart-section">
        <div className="chart-title">{title}</div>
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <p>暂无数据</p>
        </div>
      </div>
    );
  }

  const getBarClass = (val) => {
    if (val >= 70) return 'high';
    if (val >= 40) return 'mid';
    return 'low';
  };

  return (
    <div className="chart-section">
      <div className="chart-title">{title}</div>
      {rows.map((row, i) => {
        const label = row[labelKey];
        const value = parseFloat(row[valueKey]) || 0;
        return (
          <div key={i} className="chart-row">
            <div className="chart-label" title={label}>{label}</div>
            <div className="chart-bar-track">
              <div
                className={`chart-bar-fill ${getBarClass(value)}`}
                style={{ width: `${Math.max(value, 2)}%` }}
              />
            </div>
            <div className="chart-value">{value}{suffix}</div>
          </div>
        );
      })}
    </div>
  );
}
