'use client';

import { useState, useEffect } from 'react';
import { quizzes as initialQuizzes } from '@/data/quizzes';
import Quiz from './components/Quiz';
import QuizList from './components/QuizList';
import ResultsPage from './components/ResultsPage';

export default function Home() {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [allCompleted, setAllCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  // DB session tracking (gracefully degrades if DB is unavailable)
  const [sessionId, setSessionId] = useState(null);

  // Public stats banner
  const [pubStats, setPubStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(d => { if (d.dbAvailable) setPubStats(d); })
      .catch(() => {});
  }, []);

  // Create a session when the student starts their first quiz
  const handleSelectQuiz = async (id) => {
    let sid = sessionId;
    if (!sid) {
      try {
        const res = await fetch('/api/sessions', { method: 'POST' });
        const data = await res.json();
        if (data.id) {
          setSessionId(data.id);
          sid = data.id;
        }
      } catch { /* no DB — continue anyway */ }
    }
    setSelectedQuizId(id);
  };

  const handleQuizComplete = async (feedback) => {
    const score = feedback.results.filter(r => r.isCorrect).length;
    const currentQuiz = quizzes.find(q => q.id === selectedQuizId);

    // Record individual question attempts
    if (sessionId && currentQuiz) {
      try {
        await fetch(`/api/sessions/${sessionId}/attempts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId: currentQuiz.id,
            category:   currentQuiz.category,
            difficulty: currentQuiz.difficulty,
            results:    feedback.results,
          }),
        });
      } catch { /* ignore */ }
    }

    // Update local quiz state
    const updatedQuizzes = quizzes.map(q =>
      q.id === selectedQuizId
        ? { ...q, completed: true, score, maxScore: feedback.results.length }
        : q
    );
    setQuizzes(updatedQuizzes);

    const newTotal = totalScore + score;
    setTotalScore(newTotal);

    const allDone = updatedQuizzes.every(q => q.completed);

    if (allDone) {
      // Complete the session
      if (sessionId) {
        const maxPossible = updatedQuizzes.reduce((sum, q) => sum + q.maxScore, 0);
        try {
          await fetch(`/api/sessions/${sessionId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalScore: newTotal, maxScore: maxPossible }),
          });
        } catch { /* ignore */ }
      }
      setAllCompleted(true);
    } else {
      setTimeout(() => setSelectedQuizId(null), 1500);
    }
  };

  const handleReset = () => {
    setQuizzes(initialQuizzes);
    setSelectedQuizId(null);
    setAllCompleted(false);
    setTotalScore(0);
    setSessionId(null);
  };

  const completedCount = quizzes.filter(q => q.completed).length;
  const maxPossibleScore = quizzes.reduce((sum, q) => sum + q.maxScore, 0);

  return (
    <div className="container">
      <header className="header">
        <h1>英语语法填空练习</h1>
        <p>选择语法结构，强化复杂句法理解</p>

        {/* Public Stats Banner */}
        {pubStats && pubStats.totalSessions > 0 && (
          <div className="pub-stats-banner">
            <span>👥 已有 <strong>{pubStats.totalSessions}</strong> 位同学参与练习</span>
            <span className="pub-stats-sep">·</span>
            <span>📈 平均通过率 <strong>{pubStats.avgPassRate}%</strong></span>
            <span className="pub-stats-sep">·</span>
            <span>✏️ 共答题 <strong>{pubStats.totalAttempts}</strong> 次</span>
          </div>
        )}
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
            textAlign: 'center',
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
            textAlign: 'center',
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
