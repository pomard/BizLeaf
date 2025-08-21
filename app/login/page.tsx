'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../../components/ui/Icon';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // デモ用アカウント情報
  const demoAccount = {
    email: 'demo@bizleaf.com',
    password: 'demo123'
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setIsLoading(true);
    setError('');

    // 簡単な認証チェック
    if (email === demoAccount.email && password === demoAccount.password) {
      // 認証成功
      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 1000);
    } else if (email === '' || password === '') {
      setError('メールアドレスとパスワードを入力してください');
      setIsLoading(false);
    } else {
      setError('メールアドレスまたはパスワードが正しくありません');
      setIsLoading(false);
    }
  };

  const fillDemoAccount = () => {
    setEmail(demoAccount.email);
    setPassword(demoAccount.password);
    setError('');
  };

  return (
    <div className="login-container">
      {/* 左側 - イラストレーション エリア */}
      <div className="login-left">
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <h1 style={{fontSize: '40px', fontWeight: 'bold', background: 'linear-gradient(to right, #166534, #15803d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px'}}>
            BizLeaf
          </h1>
          <p style={{fontSize: '20px', fontWeight: '500', color: '#166534', marginBottom: '8px'}}>営業効率化ダッシュボード</p>
          <p style={{color: '#16a34a'}}>ビジネスの成長を育てる</p>
        </div>

      </div>

      {/* 右側 - ログインフォーム */}
      <div className="login-right">
        <div className="login-form-container">
          
          {/* ヘッダー - モバイル用 */}
          <div className="mobile-header">
            <h1>
              <Icon name="leaf" size={32} style={{color: 'var(--plant-green)', marginRight: '8px'}} />
              BizLeaf
            </h1>
            <p>営業効率化ダッシュボード</p>
          </div>

          {/* ログインタブ */}
          <div className="login-tabs">
            <div className="login-tab-nav">
              <button className="login-tab active">
                ログイン
              </button>
              <button className="login-tab" style={{marginLeft: '32px'}}>
                新規登録
              </button>
            </div>
          </div>

          {/* ログインフォーム */}
          <form onSubmit={handleLogin}>
            {/* メールアドレス入力欄 */}
            <div className="login-form-group">
              <label className="login-form-label">
                メールアドレス
              </label>
              <input
                type="email"
                className="login-form-input"
                placeholder="メールアドレスを入力"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* パスワード入力欄 */}
            <div className="login-form-group">
              <label className="login-form-label">
                パスワード
              </label>
              <input
                type="password"
                className="login-form-input"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* エラーメッセージ */}
            {error && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Icon name="warning" size={16} style={{color: '#dc2626', marginRight: '8px'}} />
                <span style={{color: '#dc2626', fontSize: '14px'}}>{error}</span>
              </div>
            )}

            {/* ログインリンク */}
            <div className="login-links">
              <a href="#" className="login-link">ログインID・パスワードを忘れた方へ</a>
            </div>

            {/* ログインボタン */}
            <button
              type="submit"
              className="login-button primary"
              disabled={isLoading}
              style={{
                opacity: isLoading ? 0.6 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px'
                  }}></div>
                  ログイン中...
                </>
              ) : (
                'ログインする'
              )}
            </button>

          </form>

          {/* デモ情報 */}
          <div className="demo-info">
            <div className="demo-card">
              <div className="demo-card-icon">
                <Icon name="lightbulb" size={20} style={{color: 'var(--plant-green)'}} />
              </div>
              <div className="demo-card-content">
                <h3>デモアカウント情報</h3>
                <p style={{marginBottom: '12px'}}>
                  以下のアカウントでログインできます：
                </p>
                <div style={{backgroundColor: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #d1fae5', marginBottom: '12px'}}>
                  <div style={{fontSize: '12px', marginBottom: '4px'}}>
                    <strong>メール:</strong> {demoAccount.email}
                  </div>
                  <div style={{fontSize: '12px'}}>
                    <strong>パスワード:</strong> {demoAccount.password}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={fillDemoAccount}
                  style={{
                    backgroundColor: 'var(--plant-green)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--plant-green-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--plant-green)';
                  }}
                >
                  自動入力する
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}