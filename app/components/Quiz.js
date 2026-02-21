'use client';

import { useState } from 'react';
import FeedbackCard from './FeedbackCard';

export default function Quiz({ quiz, onQuizComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleOptionClick = (blankId, option) => {
    if (!submitted) {
      setAnswers(prev => ({
        ...prev,
        [blankId]: option
      }));
    }
  };

  const handleSubmit = () => {
    const allAnswered = quiz.blanks.every(blank => answers[blank.id]);

    if (!allAnswered) {
      alert('请填写所有空格后再提交');
      return;
    }

    const feedbackData = {
      correct: true,
      results: []
    };

    quiz.blanks.forEach(blank => {
      const isCorrect = answers[blank.id] === blank.correctAnswer;
      feedbackData.correct = feedbackData.correct && isCorrect;
      feedbackData.results.push({
        blankId: blank.id,
        isCorrect,
        selected: answers[blank.id],
        ...blank.explanation
      });
    });

    setFeedback(feedbackData);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setFeedback(null);
  };

  const handleNext = () => {
    if (onQuizComplete) {
      onQuizComplete(feedback);
    }
  };

  const score = feedback ? feedback.results.filter(r => r.isCorrect).length : 0;
  const totalScore = quiz.blanks.length;

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <div>
          <span className={`difficulty-badge ${quiz.difficulty}`}>
            {quiz.difficulty}
          </span>
          <span className="category-badge">{quiz.category}</span>
        </div>
      </div>

      <div className="question-text">
        {quiz.question}
      </div>

      {quiz.blanks.map((blank, index) => (
        <div key={blank.id} className="blank-container">
          <label className="blank-label">空格 {index + 1}:</label>

          <div className="options-grid">
            {blank.options.map(option => (
              <button
                key={option}
                className={`option-btn ${
                  answers[blank.id] === option ? 'selected' : ''
                } ${
                  submitted && answers[blank.id] === option
                    ? blank.correctAnswer === option ? 'correct' : 'incorrect'
                    : ''
                }`}
                onClick={() => handleOptionClick(blank.id, option)}
                disabled={submitted}
              >
                {option}
              </button>
            ))}
          </div>

          {answers[blank.id] && (
            <div className="selected-answer">
              您选择: <strong>{answers[blank.id]}</strong>
            </div>
          )}

          {submitted && feedback && (
            <FeedbackCard
              result={feedback.results[index]}
              blank={blank}
            />
          )}
        </div>
      ))}

      {!submitted ? (
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={handleSubmit}>
            提交答案
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            重置
          </button>
        </div>
      ) : (
        <div className="action-buttons">
          <button className="btn btn-success" onClick={handleNext}>
            下一题 →
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            重新做题
          </button>
        </div>
      )}

      {submitted && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <div className="score-display">{score}/{totalScore}</div>
          <div className="score-label">
            {score === totalScore
              ? '🎉 完美答题！'
              : score >= totalScore * 0.5
              ? '✨ 不错，继续加油！'
              : '💪 还需加强，再来一次！'}
          </div>
        </div>
      )}
    </div>
  );
}
