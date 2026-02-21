'use client';

export default function ResultsPage({ totalScore, maxScore, quizzes, onReset }) {
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getEncouragement = (percent) => {
    if (percent === 100) {
      return '🏆 完美答卷！你已掌握这些语法知识点，继续保持！';
    } else if (percent >= 80) {
      return '🎉 优秀！你对这些语法结构有较好的理解，再加强巩固就更完美了！';
    } else if (percent >= 60) {
      return '✨ 不错！你已掌握了大部分内容，建议重点复习错题中的语法规则。';
    } else if (percent >= 40) {
      return '💪 还需努力，建议多做练习题，加强对语法结构的理解。';
    } else {
      return '🚀 继续加油！这是学习过程的一部分，重新学习和练习后会有进步。';
    }
  };

  const getRecommendations = (percent) => {
    const recommendations = [];

    if (quizzes.some(q => q.category === '非谓语动词' && !q.completed)) {
      recommendations.push({
        title: '非谓语动词基础',
        link: '#'
      });
    }
    if (quizzes.some(q => q.category === '定语从句')) {
      recommendations.push({
        title: '定语从句详解',
        link: '#'
      });
    }
    if (quizzes.some(q => q.category === '状语从句')) {
      recommendations.push({
        title: '状语从句专项训练',
        link: '#'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        title: '英语高级语法合集',
        link: '#'
      });
      recommendations.push({
        title: '英文写作技巧指南',
        link: '#'
      });
    }

    return recommendations;
  };

  return (
    <div className="results-container">
      <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#333' }}>
        🎓 练习完成！
      </h2>

      <div className="score-display">{totalScore}/{maxScore}</div>

      <div style={{
        fontSize: '1.3rem',
        marginBottom: '10px',
        color: '#667eea',
        fontWeight: 'bold'
      }}>
        正确率: {percentage}%
      </div>

      <div className="score-label">{getEncouragement(percentage)}</div>

      <div className="encouragement-message">
        <p>感谢你的参与！这次练习让你有机会发现自己的学习重点。</p>
      </div>

      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#333' }}>
          📊 答题统计
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {quizzes.map(quiz => (
            <div
              key={quiz.id}
              style={{
                background: 'white',
                padding: '12px',
                borderRadius: '6px',
                textAlign: 'left'
              }}
            >
              <div style={{
                fontSize: '0.9rem',
                color: '#666',
                marginBottom: '5px'
              }}>
                题目 {quiz.id}: {quiz.category}
              </div>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: quiz.completed && quiz.score === quiz.maxScore ? '#28a745' : '#667eea'
              }}>
                {quiz.completed ? `${quiz.score}/${quiz.maxScore}` : '未做'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="related-resources">
        <h3>📚 推荐学习资源</h3>
        <p style={{ color: '#666', marginBottom: '15px', fontSize: '0.95rem' }}>
          根据你的练习情况，以下资源可能对你有帮助:
        </p>
        <div className="resource-links">
          {getRecommendations(percentage).map((resource, idx) => (
            <a key={idx} href={resource.link} className="resource-link">
              📖 {resource.title}
            </a>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: '30px',
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button className="btn btn-primary" onClick={onReset}>
          重新练习所有题目
        </button>
        <button className="btn btn-secondary" onClick={() => window.print()}>
          打印结果
        </button>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        background: '#e7f3ff',
        borderRadius: '8px',
        color: '#0056b3',
        fontSize: '0.9rem',
        lineHeight: '1.6'
      }}>
        💡 <strong>学习建议：</strong>
        <ul style={{
          marginTop: '10px',
          paddingLeft: '20px',
          listStyle: 'disc'
        }}>
          <li>对于错误的题目，仔细阅读詳解卡片中的语法规则</li>
          <li>在错题中的例句基础上，尝试造自己的例句</li>
          <li>定期复习这些语法知识点，形成长期记忆</li>
          <li>结合阅读理解，在真实语境中应用这些语法结构</li>
        </ul>
      </div>
    </div>
  );
}
