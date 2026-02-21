'use client';

export default function FeedbackCard({ result, blank }) {
  return (
    <div className={`feedback-card ${result.isCorrect ? 'success' : 'error'}`}>
      <div className="feedback-title">
        {result.isCorrect ? '✓ 正确' : '✗ 错误'}
      </div>

      {!result.isCorrect && (
        <div className="feedback-section">
          <h4>您的答案</h4>
          <p><strong>{result.selected}</strong> - 这不是正确答案</p>
        </div>
      )}

      <div className="feedback-section">
        <h4>正确答案</h4>
        <p><strong>{result.correct}</strong></p>
      </div>

      <div className="feedback-section">
        <h4>语法规则</h4>
        <p>{result.rule}</p>
      </div>

      <div className="feedback-section">
        <h4>正确例句</h4>
        <p><em>"{result.correctExample}"</em></p>
      </div>

      {result.commonMistakes && result.commonMistakes.length > 0 && (
        <div className="feedback-section">
          <h4>常见错误辨析</h4>
          <ul className="feedback-list mistakes">
            {result.commonMistakes.map((mistake, idx) => (
              <li key={idx}>
                <strong>{mistake.wrong}</strong> - {mistake.reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
