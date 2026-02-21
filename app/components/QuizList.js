'use client';

export default function QuizList({ quizzes, onSelectQuiz }) {
  return (
    <div>
      <div className="quiz-list">
        {quizzes.map(quiz => (
          <div
            key={quiz.id}
            className="quiz-item"
            onClick={() => onSelectQuiz(quiz.id)}
          >
            <h3>题目 {quiz.id}</h3>
            <p className="question-preview">{quiz.question.substring(0, 50)}...</p>
            <div className="quiz-badges">
              <span className={`difficulty-badge ${quiz.difficulty}`}>
                {quiz.difficulty}
              </span>
              <span className="category-badge">{quiz.category}</span>
            </div>
            {quiz.completed && (
              <div style={{
                marginTop: '12px',
                padding: '8px',
                background: '#d4edda',
                borderRadius: '6px',
                fontSize: '0.9rem',
                color: '#155724',
                fontWeight: '600'
              }}>
                ✓ 已完成
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
