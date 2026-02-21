import { quizzes } from '@/data/quizzes';

function getPassRateClass(rate) {
  if (rate >= 70) return 'high';
  if (rate >= 40) return 'mid';
  return 'low';
}

function getQuestionPreview(id) {
  const q = quizzes.find(q => q.id === id);
  return q ? q.question.replace(/_{2,}/g, '______').substring(0, 45) + '...' : `题目 ${id}`;
}

export default function QuestionTable({ rows }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="table-section">
        <div className="table-title">各题目详细统计</div>
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>暂无答题记录</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-section">
      <div className="table-title">各题目详细统计</div>
      <table className="data-table">
        <thead>
          <tr>
            <th>题目 ID</th>
            <th>题目预览</th>
            <th>语法点</th>
            <th>难度</th>
            <th>答题次数</th>
            <th>正确次数</th>
            <th>通过率</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const rateClass = getPassRateClass(row.pass_rate);
            return (
              <tr key={i}>
                <td><strong>Q{row.question_id}</strong></td>
                <td style={{ maxWidth: 240, fontSize: '0.82rem', color: '#6b7280' }}>
                  {getQuestionPreview(row.question_id)}
                </td>
                <td>{row.question_category}</td>
                <td>
                  <span className={`difficulty-pill ${row.question_difficulty}`}>
                    {row.question_difficulty}
                  </span>
                </td>
                <td>{row.total_attempts}</td>
                <td>{row.correct_count}</td>
                <td>
                  <span className={`pass-rate-pill ${rateClass}`}>
                    {row.pass_rate}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
