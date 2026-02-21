'use client';

import { useState } from 'react';
import { quizzes as initialQuizzes } from '@/data/quizzes';
import Quiz from './components/Quiz';
import QuizList from './components/QuizList';
import ResultsPage from './components/ResultsPage';

export default function Home() {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [allCompleted, setAllCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const handleSelectQuiz = (id) => {
    setSelectedQuizId(id);
  };

  const handleQuizComplete = (feedback) => {
    const score = feedback.results.filter(r => r.isCorrect).length;

    setQuizzes(prevQuizzes =>
      prevQuizzes.map(q =>
        q.id === selectedQuizId
          ? { ...q, completed: true, score: score, maxScore: feedback.results.length }
          : q
      )
    );

    const newTotal = totalScore + score;
    setTotalScore(newTotal);

    const allDone = quizzes.every(
      q => (q.id === selectedQuizId ? true : q.completed)
    );

    if (allDone) {
      setAllCompleted(true);
    } else {
      setTimeout(() => {
        setSelectedQuizId(null);
      }, 1500);
    }
  };

  const handleReset = () => {
    setQuizzes(initialQuizzes);
    setSelectedQuizId(null);
    setAllCompleted(false);
    setTotalScore(0);
  };

  const completedCount = quizzes.filter(q => q.completed).length;
  const maxPossibleScore = quizzes.reduce((sum, q) => sum + q.maxScore, 0);

  return (
    <div className="container">
      <header className="header">
        <h1>英语语法填空练习</h1>
        <p>选择语法结构，强化复杂句法理解</p>
      </header>

      {allCompleted ? (
        <ResultsPage
          totalScore={totalScore}
          maxScore={maxPossibleScore}
          quizzes={quizzes}
          onReset={handleReset}
        />
      ) : selectedQuizId ? (
        <div className="quiz-container">
          <div style={{
            marginBottom: '20px',
            padding: '12px',
            background: '#e7f3ff',
            borderRadius: '8px',
            color: '#0056b3',
            textAlign: 'center'
          }}>
            已完成: {completedCount}/{quizzes.length}
          </div>
          <Quiz
            quiz={quizzes.find(q => q.id === selectedQuizId)}
            onQuizComplete={handleQuizComplete}
          />
        </div>
      ) : (
        <div className="quiz-container">
          <div style={{
            marginBottom: '25px',
            padding: '15px',
            background: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>
              进度: <strong>{completedCount}/{quizzes.length}</strong> 题
              {totalScore > 0 && ` | 得分: ${totalScore}/${maxPossibleScore}`}
            </p>
          </div>
          <QuizList quizzes={quizzes} onSelectQuiz={handleSelectQuiz} />
        </div>
      )}
    </div>
  );
}
