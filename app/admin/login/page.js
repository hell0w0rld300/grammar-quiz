'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || '密码错误，请重试');
      }
    } catch {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <div style={{ fontSize: '2.5rem' }}>📚</div>
          <h1>后台管理</h1>
          <p>英语语法填空练习系统</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div style={{ marginBottom: '20px' }}>
            <label>管理员密码</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="请输入管理员密码"
              autoFocus
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? '验证中...' : '登录'}
          </button>
        </form>

        <p className="login-hint">
          默认密码：admin123（请在环境变量中修改 ADMIN_PASSWORD）
        </p>
      </div>
    </div>
  );
}
