'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatsCard from './components/StatsCard';
import BarChart from './components/BarChart';
import QuestionTable from './components/QuestionTable';

function formatDate(iso) {
  if (!iso) return '-';
  return new Date(iso).toLocaleString('zh-CN', {
    month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

function getPassRateClass(rate) {
  if (rate >= 70) return 'high';
  if (rate >= 40) return 'mid';
  return 'low';
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleRefresh = () => {
    setLoading(true);
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  return (
    <div className="admin-body">
      {/* Nav */}
      <nav className="admin-nav">
        <div className="admin-nav-brand">
          <span>📚</span>
          <span>语法测验 · 后台管理</span>
        </div>
        <div className="admin-nav-actions">
          <a href="/" target="_blank">查看前台 ↗</a>
          <button className="btn-logout" onClick={handleLogout}>退出登录</button>
        </div>
      </nav>

      <main className="admin-main">
        <div className="dashboard-title">数据概览</div>
        <div className="dashboard-subtitle">
          实时统计学生答题数据 · 最近更新：{new Date().toLocaleString('zh-CN')}
          <button
            onClick={handleRefresh}
            style={{
              marginLeft: 12, padding: '3px 12px', fontSize: '0.8rem',
              background: '#667eea', color: 'white', border: 'none',
              borderRadius: 6, cursor: 'pointer'
            }}
          >
            刷新
          </button>
        </div>

        {/* DB Warning */}
        {!loading && data && !data.dbAvailable && (
          <div className="db-warning">
            ⚠️ 数据库未连接。请在 Vercel 中创建 Postgres 数据库，并设置环境变量 <code>POSTGRES_URL</code>。统计数据无法显示。
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>⏳</div>
            <p>加载统计数据中...</p>
          </div>
        )}

        {!loading && data && data.dbAvailable && (
          <>
            {/* Summary Cards */}
            <div className="stats-grid">
              <StatsCard
                label="总练习次数"
                value={data.overall?.total_sessions ?? 0}
                sub="已完成全套题目的学生数"
                accent="#667eea"
              />
              <StatsCard
                label="平均通过率"
                value={`${data.overall?.avg_pass_rate ?? 0}%`}
                sub="所有已完成学生的平均得分"
                accent="#10b981"
              />
              <StatsCard
                label="总答题次数"
                value={
                  data.byQuestion?.reduce((s, r) => s + (r.total_attempts || 0), 0) ?? 0
                }
                sub="所有单题作答记录数"
                accent="#f59e0b"
              />
              <StatsCard
                label="最难题目"
                value={
                  data.byQuestion?.length
                    ? (() => {
                        const min = data.byQuestion.reduce(
                          (prev, cur) => (cur.pass_rate < prev.pass_rate ? cur : prev),
                          data.byQuestion[0]
                        );
                        return `Q${min.question_id} · ${min.pass_rate}%`;
                      })()
                    : '-'
                }
                sub="通过率最低的题目"
                accent="#ef4444"
              />
            </div>

            {/* Bar Charts */}
            <div className="charts-grid">
              <BarChart
                title="各题目通过率"
                rows={data.byQuestion?.map(r => ({
                  label: `Q${r.question_id} ${r.question_category}`,
                  pass_rate: r.pass_rate,
                  ...r,
                }))}
                labelKey="label"
                valueKey="pass_rate"
              />
              <BarChart
                title="各难度通过率"
                rows={data.byDifficulty}
                labelKey="difficulty"
                valueKey="pass_rate"
              />
            </div>

            <BarChart
              title="各语法点通过率"
              rows={data.byCategory}
              labelKey="category"
              valueKey="pass_rate"
            />

            {/* Question Detail Table */}
            <QuestionTable rows={data.byQuestion} />

            {/* Recent Sessions Table */}
            <div className="table-section">
              <div className="table-title">最近答题记录（最新 20 条）</div>
              {data.recentSessions?.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🕒</div>
                  <p>暂无完整答题记录</p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>开始时间</th>
                      <th>完成时间</th>
                      <th>得分</th>
                      <th>通过率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentSessions?.map(s => (
                      <tr key={s.id}>
                        <td><strong>#{s.id}</strong></td>
                        <td>{formatDate(s.created_at)}</td>
                        <td>{formatDate(s.completed_at)}</td>
                        <td>{s.total_score} / {s.max_score}</td>
                        <td>
                          <span className={`pass-rate-pill ${getPassRateClass(s.pass_rate)}`}>
                            {s.pass_rate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div style={{
          textAlign: 'center', marginTop: 40, color: '#9ca3af',
          fontSize: '0.8rem', paddingBottom: 20,
        }}>
          英语语法填空练习系统 · 后台管理 · 数据仅供内部使用
        </div>
      </main>
    </div>
  );
}
