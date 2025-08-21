'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../../components/ui/Icon';

// モックデータ
const mockEngineers = [
  { id: '1', name: '田中太郎', skills: ['React', 'Node.js'], status: 'waiting', unitPrice: 80, waitingDays: 30, currentProject: null },
  { id: '2', name: '山田花子', skills: ['Vue.js', 'Python'], status: 'working', unitPrice: 75, waitingDays: null, currentProject: 'ECサイトリニューアル案件' },
  { id: '3', name: '佐藤次郎', skills: ['Angular', 'Java'], status: 'working', unitPrice: 85, waitingDays: null, currentProject: '在庫管理システム' },
  { id: '4', name: '伊藤美咲', skills: ['React', 'AWS'], status: 'waiting', unitPrice: 90, waitingDays: 15, currentProject: null },
];

const mockProjects = [
  { id: '1', name: 'ECサイトリニューアル', client: 'ABC商事', status: 'active', startDate: '2024-09-01', endDate: '2024-12-31', revenue: 12000000, engineers: ['山田花子'] },
  { id: '2', name: '在庫管理システム', client: 'DEF株式会社', status: 'active', startDate: '2024-10-01', endDate: '2025-03-31', revenue: 18000000, engineers: ['佐藤次郎'] },
  { id: '3', name: 'モバイルアプリ開発', client: 'GHI企業', status: 'planning', startDate: '2024-11-01', endDate: '2025-05-31', revenue: 15000000, engineers: [] },
];

const mockStats = {
  operationRate: 87.5,
  workingEngineers: 2,
  totalEngineers: 4,
  waitingEngineers: 2,
  activeProjects: 3,
  totalRevenue: 10500000
};

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [engineerFilter, setEngineerFilter] = useState('all'); // all, waiting, working
  const [projectFilter, setProjectFilter] = useState('all'); // all, active, planning
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: string, type: string, message: string, visible: boolean}>>([]);
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const filteredEngineers = mockEngineers.filter(engineer => {
    const matchesSearch = engineer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         engineer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = engineerFilter === 'all' || engineer.status === engineerFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = projectFilter === 'all' || project.status === projectFilter;
    return matchesSearch && matchesFilter;
  });

  const showNotification = (type: string, message: string) => {
    const id = Date.now().toString();
    const newNotification = { id, type, message, visible: true };
    setNotifications(prev => [...prev, newNotification]);
    
    setTimeout(() => {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, visible: false } : n)
      );
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 300);
    }, 3000);
  };

  const handleDeleteEngineer = (engineerId: string, engineerName: string) => {
    if (confirm(`${engineerName}さんを削除しますか？この操作は取り消せません。`)) {
      // 削除処理のモック
      showNotification('success', `${engineerName}さんが削除されました`);
    }
  };

  // const handleAssignProject = (engineerId: string, engineerName: string) => {
  //   showNotification('info', `${engineerName}さんの案件アサイン画面を準備中です`);
  //   // 実際の実装では案件アサイン画面に遷移
  // };

  const renderHeader = () => (
    <header className="header">
      <div>
        <h1>BizLeaf</h1>
        <p>営業効率化ダッシュボード - ビジネスの成長を育てる</p>
      </div>
      <div className="header-actions">
        <div className="search-box">
          <input
            type="text"
            placeholder="エンジニア・案件を検索..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <span className="search-icon">
            <Icon name="magnifying-glass" size={16} />
          </span>
          {showSearchResults && (
            <div className="search-results">
              <div className="search-results-header">
                <span>検索結果: &quot;{searchQuery}&quot;</span>
                <button onClick={() => setShowSearchResults(false)}>
                  <Icon name="x" size={14} />
                </button>
              </div>
              {filteredEngineers.length > 0 && (
                <div className="search-section">
                  <h4>エンジニア ({filteredEngineers.length}件)</h4>
                  {filteredEngineers.slice(0, 3).map(engineer => (
                    <div key={engineer.id} className="search-item" onClick={() => router.push(`/engineers/${engineer.id}`)}>
                      <div className="search-item-title">{engineer.name}</div>
                      <div className="search-item-subtitle">{engineer.skills.join(', ')}</div>
                    </div>
                  ))}
                </div>
              )}
              {filteredProjects.length > 0 && (
                <div className="search-section">
                  <h4>案件 ({filteredProjects.length}件)</h4>
                  {filteredProjects.slice(0, 3).map(project => (
                    <div key={project.id} className="search-item" onClick={() => router.push(`/projects/${project.id}`)}>
                      <div className="search-item-title">{project.name}</div>
                      <div className="search-item-subtitle">{project.client}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <button className="button">
          新規エンジニア登録
        </button>
        <button onClick={handleLogout} className="logout-button" title="ログアウト">
          <Icon name="sign-out" size={18} />
        </button>
      </div>
    </header>
  );

  const renderNavigation = () => (
    <nav className="nav">
      <ul>
        <li>
          <a 
            href="#" 
            className={currentPage === 'dashboard' ? 'active' : ''} 
            onClick={(e) => {e.preventDefault(); setCurrentPage('dashboard');}}
          >
            <Icon name="house-line" size={18} className="mr-2" />
            ダッシュボード
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={currentPage === 'engineers' ? 'active' : ''} 
            onClick={(e) => {e.preventDefault(); setCurrentPage('engineers');}}
          >
            <Icon name="users" size={18} className="mr-2" />
            エンジニア管理
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={currentPage === 'projects' ? 'active' : ''} 
            onClick={(e) => {e.preventDefault(); setCurrentPage('projects');}}
          >
            <Icon name="folder" size={18} className="mr-2" />
            案件管理
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={currentPage === 'reports' ? 'active' : ''} 
            onClick={(e) => {e.preventDefault(); setCurrentPage('reports');}}
          >
            <Icon name="chart-line" size={18} className="mr-2" />
            レポート
          </a>
        </li>
      </ul>
    </nav>
  );

  const renderPriorityAlert = () => (
    <div className="priority-alert-section">
      <div className="priority-alert critical">
        <div className="priority-icon">
          <Icon name="warning" size={24} />
        </div>
        <div className="priority-content">
          <h3>緊急対応が必要です</h3>
          <p>田中太郎さんが30日間待機中。今日中にアクションが必要です。</p>
          <div className="priority-actions">
            <button className="button danger">
              <Icon name="target" size={16} className="mr-2" />
              即座にマッチング
            </button>
            <button 
              className="button secondary small"
              onClick={() => router.push('/engineers/1')}
            >
              詳細確認
            </button>
          </div>
        </div>
        <button className="priority-close" onClick={() => {}}>
          <Icon name="x" size={16} />
        </button>
      </div>
    </div>
  );

  const renderQuickInsights = () => (
    <div className="quick-insights">
      <div className="insight-card warning">
        <Icon name="warning-circle" size={20} />
        <div>
          <span className="insight-number">3件</span>
          <span className="insight-label">契約終了予定</span>
        </div>
        <button className="insight-action">対応</button>
      </div>
      
      <div className="insight-card success">
        <Icon name="lightbulb" size={20} />
        <div>
          <span className="insight-number">2件</span>
          <span className="insight-label">新規案件チャンス</span>
        </div>
        <button className="insight-action">確認</button>
      </div>
      
      <div className="insight-card info">
        <Icon name="leaf" size={20} />
        <div>
          <span className="insight-number">1件</span>
          <span className="insight-label">今日の成果</span>
        </div>
        <button className="insight-action">詳細</button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="notifications-container">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`notification ${notification.type} ${notification.visible ? 'show' : 'hide'}`}
        >
          <div className="notification-content">
            <Icon name={notification.type === 'success' ? 'check-circle' : notification.type === 'danger' ? 'warning' : 'lightbulb'} size={16} />
            <span>{notification.message}</span>
          </div>
          <button 
            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            className="notification-close"
          >
            <Icon name="x" size={14} />
          </button>
        </div>
      ))}
    </div>
  );

  const renderDashboard = () => (
    <>
      {renderPriorityAlert()}
      {renderQuickInsights()}
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="chart-bar-horizontal" size={24} />
          </div>
          <div className="value">{mockStats.operationRate}%</div>
          <div className="label">稼働率</div>
          <div className="trend up">↗ +3.2% 前月比</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="users" size={24} />
          </div>
          <div className="value">{mockStats.workingEngineers}</div>
          <div className="label">稼働中エンジニア</div>
          <div className="trend up">/{mockStats.totalEngineers}名中</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="target" size={24} />
          </div>
          <div className="value">¥{(mockStats.totalRevenue / 1000000).toFixed(1)}M</div>
          <div className="label">月次売上</div>
          <div className="trend up">↗ +5.8% 前月比</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="folder" size={24} />
          </div>
          <div className="value">{mockStats.activeProjects}</div>
          <div className="label">進行中案件</div>
          <div className="trend up">新規3件</div>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <div className="card">
            <h2>
              <Icon name="folder" size={20} className="mr-2" />
              今日やるべきこと 
              <span className="priority-badge high">優先度: 高</span>
            </h2>
            
            {/* 最優先タスク */}
            <div className="alert danger">
              <div>
                <strong>【最優先】田中太郎さんのマッチング</strong>
                <br />30日間待機 → 今日中に案件提案必要
              </div>
              <button className="button danger small">今すぐ対応</button>
            </div>

            <div className="alert warning">
              <div>
                <strong>契約更新手続き（ABC商事）</strong>
                <br />9月末終了 → 更新確認が必要
              </div>
              <button className="button small">連絡する</button>
            </div>

            <div className="alert info">
              <div>
                <strong>新規案件レビュー</strong>
                <br />在庫管理システム → エンジニア選定
              </div>
              <button className="button small secondary">確認する</button>
            </div>
          </div>

          <div className="card">
            <h2>
              <Icon name="phone" size={20} className="mr-2" />
              最近の営業活動
            </h2>
            <div style={{color: '#666', fontSize: '14px', lineHeight: '1.6'}}>
              <div style={{padding: '12px 0', borderBottom: '1px solid #f1f5f9'}}>
                <strong style={{color: '#333'}}>
                  <Icon name="leaf" size={14} className="mr-2" />
                  山田花子さんアサイン完了
                </strong>
                <div style={{fontSize: '12px', color: '#6b7280'}}>ECサイトリニューアル案件 - 2時間前</div>
              </div>
              <div style={{padding: '12px 0', borderBottom: '1px solid #f1f5f9'}}>
                <strong style={{color: '#333'}}>
                  <Icon name="phone" size={14} className="mr-2" />
                  DEF株式会社との商談
                </strong>
                <div style={{fontSize: '12px', color: '#6b7280'}}>モバイルアプリ開発 - 5時間前</div>
              </div>
              <div style={{padding: '12px 0', borderBottom: '1px solid #f1f5f9'}}>
                <strong style={{color: '#333'}}>
                  <Icon name="users" size={14} className="mr-2" />
                  伊藤美咲さんスキル更新
                </strong>
                <div style={{fontSize: '12px', color: '#6b7280'}}>AWS認定資格追加 - 1日前</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <h2>
              <Icon name="clock" size={20} className="mr-2" />
              待機エンジニア ({mockStats.waitingEngineers}名)
              <button className="button small">全員に一括提案</button>
            </h2>
            <div className="engineer-list">
              {mockEngineers
                .filter(e => e.status === 'waiting')
                .map(engineer => (
                  <div key={engineer.id} className="engineer-item">
                    <div className="engineer-info">
                      <h4 
                        style={{cursor: 'pointer', color: 'var(--plant-green)'}}
                        onClick={() => router.push(`/engineers/${engineer.id}`)}
                      >
                        {engineer.name}
                      </h4>
                      <div className="skills">{engineer.skills.join(', ')} • ¥{engineer.unitPrice}万</div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <div className={`waiting-days ${engineer.waitingDays && engineer.waitingDays > 20 ? 'critical' : engineer.waitingDays && engineer.waitingDays > 10 ? 'warning' : 'normal'}`}>
                        {engineer.waitingDays}日待機
                      </div>
                      <button className="button small" style={{marginTop: '5px'}}>案件提案</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="card">
            <h2>
              <Icon name="target" size={20} className="mr-2" />
              今月の目標達成状況
            </h2>
            <div style={{marginBottom: '20px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px'}}>
                <span><strong>稼働率目標</strong></span>
                <span><strong>{mockStats.operationRate}% / 95%</strong></span>
              </div>
              <div style={{background: '#f1f5f9', height: '12px', borderRadius: '6px', overflow: 'hidden'}}>
                <div style={{
                  background: 'linear-gradient(90deg, #667eea, #764ba2)', 
                  height: '100%', 
                  width: `${Math.min((mockStats.operationRate / 95) * 100, 100)}%`,
                  transition: 'width 0.5s'
                }}></div>
              </div>
              <div style={{fontSize: '12px', color: '#10b981', marginTop: '4px'}}>
                目標まで残り {Math.max(0, 95 - mockStats.operationRate).toFixed(1)}%
              </div>
            </div>
            
            <div style={{marginBottom: '20px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px'}}>
                <span><strong>売上目標</strong></span>
                <span><strong>¥{(mockStats.totalRevenue / 1000000).toFixed(1)}M / ¥15M</strong></span>
              </div>
              <div style={{background: '#f1f5f9', height: '12px', borderRadius: '6px', overflow: 'hidden'}}>
                <div style={{
                  background: 'linear-gradient(90deg, #10b981, #059669)', 
                  height: '100%', 
                  width: `${Math.min((mockStats.totalRevenue / 15000000) * 100, 100)}%`,
                  transition: 'width 0.5s'
                }}></div>
              </div>
              <div style={{fontSize: '12px', color: '#10b981', marginTop: '4px'}}>
                目標まで ¥{Math.max(0, (15000000 - mockStats.totalRevenue) / 1000000).toFixed(1)}M
              </div>
            </div>

            <button className="button" style={{width: '100%'}}>目標達成プランを確認</button>
          </div>
        </div>
      </div>
    </>
  );

  const renderEngineers = () => (
    <div className="card">
      <h2>
        <Icon name="users" size={20} className="mr-2" />
        エンジニア一覧管理 
        <div style={{display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap'}}>
          <div className="filter-group">
            <select 
              value={engineerFilter} 
              onChange={(e) => setEngineerFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">全て</option>
              <option value="waiting">待機中</option>
              <option value="working">稼働中</option>
            </select>
          </div>
          <button className="button small">新規登録</button>
          <button className="button small secondary">CSVエクスポート</button>
        </div>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>名前</th>
            <th>スキル</th>
            <th>ステータス</th>
            <th>単価</th>
            <th>現在の状況</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {filteredEngineers.map(engineer => (
            <tr key={engineer.id}>
              <td>
                <strong 
                  style={{cursor: 'pointer', color: 'var(--plant-green)'}}
                  onClick={() => router.push(`/engineers/${engineer.id}`)}
                >
                  {engineer.name}
                </strong>
              </td>
              <td>{engineer.skills.join(', ')}</td>
              <td>
                <span className={`status ${engineer.status}`}>
                  {engineer.status === 'working' ? '稼働中' : 
                   engineer.status === 'waiting' ? '待機中' : '予定'}
                </span>
              </td>
              <td><strong>¥{engineer.unitPrice}万</strong></td>
              <td>
                {engineer.status === 'working' ? (
                  <span style={{color: '#10b981', fontWeight: '600'}}>{engineer.currentProject}</span>
                ) : engineer.status === 'waiting' ? (
                  <span className={`waiting-days ${engineer.waitingDays && engineer.waitingDays > 20 ? 'critical' : engineer.waitingDays && engineer.waitingDays > 10 ? 'warning' : 'normal'}`}>
                    {engineer.waitingDays}日間待機
                  </span>
                ) : '-'}
              </td>
              <td>
                <div style={{display: 'flex', gap: '8px'}}>
                  <button 
                    onClick={() => router.push(`/engineers/${engineer.id}`)}
                    className="button small secondary"
                  >
                    詳細
                  </button>
                  <button 
                    onClick={() => handleDeleteEngineer(engineer.id, engineer.name)}
                    className="button small danger"
                  >
                    削除
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* モバイル用カード表示 */}
      <div className="mobile-cards">
        {filteredEngineers.map(engineer => (
          <div key={engineer.id} className="mobile-card">
            <div className="mobile-card-header">
              <div 
                className="mobile-card-title"
                onClick={() => router.push(`/engineers/${engineer.id}`)}
              >
                {engineer.name}
              </div>
              <span className={`status ${engineer.status}`}>
                {engineer.status === 'working' ? '稼働中' : 
                 engineer.status === 'waiting' ? '待機中' : '予定'}
              </span>
            </div>
            <div className="mobile-card-info">
              <div className="mobile-card-info-item">
                <span className="mobile-card-info-label">スキル</span>
                <span className="mobile-card-info-value">{engineer.skills.join(', ')}</span>
              </div>
              <div className="mobile-card-info-item">
                <span className="mobile-card-info-label">単価</span>
                <span className="mobile-card-info-value">¥{engineer.unitPrice}万</span>
              </div>
              <div className="mobile-card-info-item" style={{gridColumn: '1 / -1'}}>
                <span className="mobile-card-info-label">現在の状況</span>
                <span className="mobile-card-info-value">
                  {engineer.status === 'working' ? (
                    <span style={{color: '#10b981', fontWeight: '600'}}>{engineer.currentProject}</span>
                  ) : engineer.status === 'waiting' ? (
                    <span className={`waiting-days ${engineer.waitingDays && engineer.waitingDays > 20 ? 'critical' : engineer.waitingDays && engineer.waitingDays > 10 ? 'warning' : 'normal'}`}>
                      {engineer.waitingDays}日間待機
                    </span>
                  ) : '-'}
                </span>
              </div>
            </div>
            <div className="mobile-card-actions">
              <button 
                onClick={() => router.push(`/engineers/${engineer.id}`)}
                className="button small secondary"
              >
                詳細
              </button>
              <button 
                onClick={() => handleDeleteEngineer(engineer.id, engineer.name)}
                className="button small danger"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="card">
      <h2>
        <Icon name="folder" size={20} className="mr-2" />
        案件管理
        <div style={{display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap'}}>
          <div className="filter-group">
            <select 
              value={projectFilter} 
              onChange={(e) => setProjectFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">全て</option>
              <option value="active">進行中</option>
              <option value="planning">企画中</option>
            </select>
          </div>
          <button className="button small">新規案件</button>
          <button className="button small secondary">マッチング提案</button>
        </div>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>案件名</th>
            <th>クライアント</th>
            <th>ステータス</th>
            <th>期間</th>
            <th>予定売上</th>
            <th>担当エンジニア</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map(project => (
            <tr key={project.id}>
              <td>
                <strong 
                  style={{cursor: 'pointer', color: 'var(--plant-green)'}}
                  onClick={() => router.push(`/projects/${project.id}`)}
                >
                  {project.name}
                </strong>
              </td>
              <td>{project.client}</td>
              <td>
                <span className={`status ${project.status}`}>
                  {project.status === 'active' ? '進行中' : 
                   project.status === 'planning' ? '企画中' : '完了'}
                </span>
              </td>
              <td style={{fontSize: '12px'}}>
                {project.startDate}<br/>〜 {project.endDate}
              </td>
              <td><strong>¥{(project.revenue / 10000).toFixed(0)}万</strong></td>
              <td>
                {project.engineers.length > 0 ? (
                  <span style={{color: '#10b981', fontWeight: '600'}}>
                    {project.engineers.join(', ')}
                  </span>
                ) : (
                  <span style={{color: '#ef4444', fontWeight: '600'}}>未アサイン</span>
                )}
              </td>
              <td>
                <div style={{display: 'flex', gap: '8px'}}>
                  <button 
                    onClick={() => router.push(`/projects/${project.id}`)}
                    className="button small secondary"
                  >
                    詳細
                  </button>
                  {project.engineers.length === 0 ? (
                    <button className="button small danger">エンジニア配置</button>
                  ) : (
                    <button className="button small">管理</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* モバイル用カード表示 */}
      <div className="mobile-cards">
        {filteredProjects.length === 0 && (
          <div style={{textAlign: 'center', padding: '40px', color: 'var(--text-muted)'}}>
            フィルタ条件に一致する案件がありません
          </div>
        )}
        {filteredProjects.map(project => (
          <div key={project.id} className="mobile-card">
            <div className="mobile-card-header">
              <div 
                className="mobile-card-title"
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                {project.name}
              </div>
              <span className={`status ${project.status}`}>
                {project.status === 'active' ? '進行中' : 
                 project.status === 'planning' ? '企画中' : '完了'}
              </span>
            </div>
            <div className="mobile-card-info">
              <div className="mobile-card-info-item">
                <span className="mobile-card-info-label">クライアント</span>
                <span className="mobile-card-info-value">{project.client}</span>
              </div>
              <div className="mobile-card-info-item">
                <span className="mobile-card-info-label">予定売上</span>
                <span className="mobile-card-info-value">¥{(project.revenue / 10000).toFixed(0)}万</span>
              </div>
              <div className="mobile-card-info-item">
                <span className="mobile-card-info-label">期間</span>
                <span className="mobile-card-info-value">{project.startDate} 〜 {project.endDate}</span>
              </div>
              <div className="mobile-card-info-item">
                <span className="mobile-card-info-label">担当エンジニア</span>
                <span className="mobile-card-info-value">
                  {project.engineers.length > 0 ? (
                    <span style={{color: '#10b981', fontWeight: '600'}}>
                      {project.engineers.join(', ')}
                    </span>
                  ) : (
                    <span style={{color: '#ef4444', fontWeight: '600'}}>未アサイン</span>
                  )}
                </span>
              </div>
            </div>
            <div className="mobile-card-actions">
              <button 
                onClick={() => router.push(`/projects/${project.id}`)}
                className="button small secondary"
              >
                詳細
              </button>
              {project.engineers.length === 0 ? (
                <button className="button small danger">エンジニア配置</button>
              ) : (
                <button className="button small">管理</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div>
      <div className="card">
        <h2>
          <Icon name="chart-line" size={20} className="mr-2" />
          営業実績レポート
        </h2>
        <div className="grid-3">
          <div style={{textAlign: 'center', padding: '20px'}}>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#667eea', marginBottom: '8px'}}>
              {mockStats.totalRevenue / 10000}万
            </div>
            <div style={{color: '#6b7280'}}>今月売上</div>
            <div style={{fontSize: '12px', color: '#10b981', marginTop: '4px'}}>+15.2% 前月比</div>
          </div>
          <div style={{textAlign: 'center', padding: '20px'}}>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px'}}>
              {mockStats.operationRate}%
            </div>
            <div style={{color: '#6b7280'}}>稼働率</div>
            <div style={{fontSize: '12px', color: '#10b981', marginTop: '4px'}}>+3.2% 前月比</div>
          </div>
          <div style={{textAlign: 'center', padding: '20px'}}>
            <div style={{fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px'}}>
              {mockStats.waitingEngineers}名
            </div>
            <div style={{color: '#6b7280'}}>待機エンジニア</div>
            <div style={{fontSize: '12px', color: '#ef4444', marginTop: '4px'}}>要対応</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>
          <Icon name="chart-bar-horizontal" size={20} className="mr-2" />
          月別売上推移
        </h2>
        <div style={{display: 'flex', alignItems: 'end', gap: '15px', height: '250px', padding: '20px 0'}}>
          {['6月', '7月', '8月', '9月', '10月'].map((month, index) => {
            const values = [8500, 9200, 10100, 9800, 10500];
            const height = (values[index] / 12000) * 180;
            return (
              <div key={month} style={{textAlign: 'center', flex: 1}}>
                <div 
                  style={{
                    background: 'linear-gradient(to top, #667eea, #764ba2)',
                    height: `${height}px`,
                    marginBottom: '12px',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.8s',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-25px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#667eea'
                  }}>
                    ¥{values[index]}万
                  </div>
                </div>
                <div style={{fontSize: '14px', color: '#6b7280', fontWeight: '600'}}>{month}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      {renderNotifications()}
      {renderHeader()}
      {renderNavigation()}

      {currentPage === 'dashboard' && renderDashboard()}
      {currentPage === 'engineers' && renderEngineers()}
      {currentPage === 'projects' && renderProjects()}
      {currentPage === 'reports' && renderReports()}
    </div>
  );
}