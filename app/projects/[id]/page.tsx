'use client';

import { useRouter, useParams } from 'next/navigation';
import Icon from '../../../components/ui/Icon';

// モック案件データ（詳細版）
const mockProjectsDetail = {
  '1': {
    id: '1',
    name: 'ECサイトリニューアル',
    client: 'ABC商事',
    clientContact: {
      name: '佐藤部長',
      email: 'sato@abc-trading.co.jp',
      phone: '03-1234-5678'
    },
    status: 'active',
    priority: 'high',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    revenue: 12000000,
    budget: 15000000,
    engineers: ['山田花子'],
    requiredSkills: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
    description: '既存のECサイトを最新技術でリニューアルし、ユーザビリティとパフォーマンスを向上させるプロジェクトです。モバイル対応の強化とAPI設計の見直しが主な要件となります。',
    requirements: [
      'レスポンシブデザインの実装',
      'ページ読み込み速度の50%改善',
      '決済システムの刷新',
      '管理画面のUI/UX改善',
      'SEO対策の強化'
    ],
    deliverables: [
      'フロントエンド開発（React）',
      'バックエンドAPI開発（Node.js）',
      'データベース設計・構築',
      'インフラ構築（AWS）',
      'テスト・デバッグ',
      '運用ドキュメント作成'
    ],
    progress: 45,
    milestones: [
      {
        name: '要件定義・設計',
        dueDate: '2024-09-30',
        status: 'completed',
        description: 'システム要件の定義と基本設計の完了'
      },
      {
        name: 'フロントエンド開発',
        dueDate: '2024-10-31',
        status: 'in_progress',
        description: 'React による UI コンポーネント開発'
      },
      {
        name: 'バックエンド開発',
        dueDate: '2024-11-15',
        status: 'pending',
        description: 'API 開発とデータベース構築'
      },
      {
        name: 'テスト・デプロイ',
        dueDate: '2024-12-15',
        status: 'pending',
        description: '統合テストと本番環境デプロイ'
      }
    ],
    risks: [
      {
        level: 'medium',
        description: 'クライアント側の要件変更によるスケジュール遅延リスク',
        mitigation: '週次レビューでの要件確認を徹底'
      },
      {
        level: 'low',
        description: '外部API連携での技術的課題',
        mitigation: '事前検証とバックアップ案の準備'
      }
    ],
    communications: [
      {
        date: '2024-10-15',
        type: 'meeting',
        title: '進捗確認ミーティング',
        summary: 'フロントエンド開発の進捗確認。UI デザインの軽微な修正要請あり。'
      },
      {
        date: '2024-10-08',
        type: 'email',
        title: '要件変更の相談',
        summary: '決済システムの仕様について追加要件の相談。検討後回答予定。'
      }
    ]
  },
  '2': {
    id: '2',
    name: '在庫管理システム',
    client: 'DEF株式会社',
    clientContact: {
      name: '田中課長',
      email: 'tanaka@def-corp.jp',
      phone: '03-9876-5432'
    },
    status: 'active',
    priority: 'medium',
    startDate: '2024-10-01',
    endDate: '2025-03-31',
    revenue: 18000000,
    budget: 20000000,
    engineers: ['佐藤次郎'],
    requiredSkills: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
    description: '製造業向けの在庫管理システムの新規開発。リアルタイムでの在庫追跡と自動発注機能を備えた包括的なシステムです。',
    requirements: [
      'リアルタイム在庫追跡',
      '自動発注機能の実装',
      'バーコードスキャナー連携',
      'レポート機能の充実',
      'モバイルアプリ対応'
    ],
    deliverables: [
      'システム設計書',
      'バックエンドシステム開発',
      'Webフロントエンド開発',
      'モバイルアプリ開発',
      'データベース構築',
      'システムテスト'
    ],
    progress: 25,
    milestones: [
      {
        name: '基本設計',
        dueDate: '2024-10-31',
        status: 'in_progress',
        description: 'システム全体の基本設計とアーキテクチャ定義'
      },
      {
        name: 'バックエンド開発',
        dueDate: '2024-12-31',
        status: 'pending',
        description: 'Spring Boot によるバックエンド開発'
      },
      {
        name: 'フロントエンド開発',
        dueDate: '2025-02-28',
        status: 'pending',
        description: 'Web フロントエンドとモバイルアプリ開発'
      }
    ],
    risks: [
      {
        level: 'high',
        description: '他システムとの連携仕様が未確定',
        mitigation: 'クライアントとの技術ミーティングを週次で実施'
      }
    ],
    communications: [
      {
        date: '2024-10-10',
        type: 'meeting',
        title: 'キックオフミーティング',
        summary: 'プロジェクト開始。要件の詳細確認と開発スケジュールの合意。'
      }
    ]
  },
  '3': {
    id: '3',
    name: 'モバイルアプリ開発',
    client: 'GHI企業',
    clientContact: {
      name: '鈴木マネージャー',
      email: 'suzuki@ghi-company.com',
      phone: '03-5555-1234'
    },
    status: 'planning',
    priority: 'low',
    startDate: '2024-11-01',
    endDate: '2025-05-31',
    revenue: 15000000,
    budget: 17000000,
    engineers: [],
    requiredSkills: ['React Native', 'TypeScript', 'Firebase', 'iOS', 'Android'],
    description: '顧客向けモバイルアプリの新規開発。IoSとAndroid両プラットフォーム対応で、プッシュ通知やオフライン機能を含む高機能アプリです。',
    requirements: [
      'iOS/Android対応',
      'プッシュ通知機能',
      'オフライン対応',
      'ユーザー認証システム',
      '決済機能統合'
    ],
    deliverables: [
      'UI/UXデザイン',
      'モバイルアプリ開発',
      'バックエンドAPI開発',
      'アプリストア公開',
      '運用保守マニュアル'
    ],
    progress: 0,
    milestones: [
      {
        name: 'UI/UXデザイン',
        dueDate: '2024-12-15',
        status: 'pending',
        description: 'アプリのデザインとユーザー体験設計'
      },
      {
        name: 'アプリ開発',
        dueDate: '2025-03-31',
        status: 'pending',
        description: 'React Native によるアプリ開発'
      },
      {
        name: 'ストア申請・公開',
        dueDate: '2025-05-15',
        status: 'pending',
        description: 'App Store / Google Play での公開'
      }
    ],
    risks: [
      {
        level: 'medium',
        description: 'アプリストアの審査で時間がかかる可能性',
        mitigation: '事前にガイドラインを詳細確認し、余裕を持ったスケジューリング'
      }
    ],
    communications: [
      {
        date: '2024-10-20',
        type: 'meeting',
        title: '初回打ち合わせ',
        summary: 'アプリの概要と要件の初期確認。デザイン方向性についてディスカッション。'
      }
    ]
  }
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const project = mockProjectsDetail[projectId as keyof typeof mockProjectsDetail];

  if (!project) {
    return (
      <div className="container">
        <div className="card" style={{textAlign: 'center', padding: '60px 20px'}}>
          <Icon name="warning-circle" size={48} style={{color: 'var(--text-muted)', marginBottom: '16px'}} />
          <h2 style={{color: 'var(--text-secondary)', marginBottom: '8px'}}>案件が見つかりません</h2>
          <p style={{color: 'var(--text-muted)', marginBottom: '24px'}}>指定された案件は存在しないか、削除された可能性があります。</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="button"
          >
            ダッシュボードに戻る
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    router.push(`/projects/${projectId}/edit`);
  };

  const handleDelete = () => {
    if (confirm('この案件を削除しますか？この操作は取り消せません。')) {
      alert('案件が削除されました（デモ）');
      router.push('/dashboard');
    }
  };

  const handleAssignEngineer = () => {
    alert('エンジニアアサイン機能（未実装）');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#16a34a';
      default: return 'var(--text-muted)';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '-';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'var(--plant-green)';
      case 'in_progress': return '#f59e0b';
      case 'pending': return '#6b7280';
      default: return 'var(--text-muted)';
    }
  };

  const getMilestoneStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '完了';
      case 'in_progress': return '進行中';
      case 'pending': return '未着手';
      default: return '-';
    }
  };

  return (
    <div className="container">
      {/* パンくずリスト */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px',
        fontSize: '14px',
        color: 'var(--text-muted)'
      }}>
        <button 
          onClick={() => router.push('/dashboard')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--plant-green)',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          ダッシュボード
        </button>
        <span style={{margin: '0 8px'}}>/</span>
        <button 
          onClick={() => router.push('/dashboard')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--plant-green)',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          案件管理
        </button>
        <span style={{margin: '0 8px'}}>/</span>
        <span>{project.name}</span>
      </div>

      {/* ヘッダーセクション */}
      <div className="card" style={{marginBottom: '20px'}}>
        <div className="detail-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px'}}>
          <div className="detail-info">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px'}}>
              <h1 style={{fontSize: '28px', fontWeight: 'bold', color: 'var(--text-primary)'}}>
                {project.name}
              </h1>
              <span style={{
                backgroundColor: getPriorityColor(project.priority),
                color: 'white',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                優先度: {getPriorityText(project.priority)}
              </span>
            </div>
            
            <div className="detail-stats" style={{display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '16px', marginBottom: '12px', alignItems: 'center'}}>
              <span className={`status ${project.status}`} style={{fontSize: '14px'}}>
                {project.status === 'active' ? '進行中' : 
                 project.status === 'planning' ? '企画中' : '完了'}
              </span>
              <span style={{fontSize: '18px', fontWeight: 'bold', color: 'var(--plant-green)'}}>
                ¥{(project.revenue / 10000).toFixed(0)}万円
              </span>
              <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>
                予算: ¥{(project.budget / 10000).toFixed(0)}万円
              </span>
            </div>
            
            <div style={{color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5'}}>
              <div>期間: {project.startDate} 〜 {project.endDate}</div>
              <div>クライアント: {project.client}</div>
            </div>
          </div>
          
          <div className="detail-actions" style={{display: 'flex', gap: '12px'}}>
            <button onClick={handleEdit} className="button secondary">
              <Icon name="folder" size={16} className="mr-2" />
              編集
            </button>
            {project.engineers.length === 0 && (
              <button onClick={handleAssignEngineer} className="button">
                <Icon name="users" size={16} className="mr-2" />
                エンジニアアサイン
              </button>
            )}
            <button onClick={handleDelete} className="button danger">
              <Icon name="warning" size={16} className="mr-2" />
              削除
            </button>
          </div>
        </div>

        {/* 進捗バー */}
        <div style={{marginBottom: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
            <span style={{fontSize: '14px', fontWeight: '500'}}>プロジェクト進捗</span>
            <span style={{fontSize: '16px', fontWeight: 'bold', color: 'var(--plant-green)'}}>
              {project.progress}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '12px',
            backgroundColor: '#f1f5f9',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${project.progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--plant-green), var(--plant-green-light))',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* アサイン済みエンジニア */}
        <div>
          <span style={{fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block'}}>
            担当エンジニア
          </span>
          {project.engineers.length > 0 ? (
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {project.engineers.map((engineer, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: 'var(--plant-green)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                  onClick={() => router.push(`/engineers/${index + 1}`)}
                >
                  {engineer}
                </span>
              ))}
            </div>
          ) : (
            <div className="alert warning" style={{margin: '0'}}>
              <Icon name="warning-circle" size={20} style={{marginRight: '12px'}} />
              <div>
                <strong>エンジニア未アサイン</strong>
                <p style={{fontSize: '14px', marginTop: '4px'}}>
                  この案件にはまだエンジニアがアサインされていません。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid-2">
        {/* 左カラム */}
        <div>
          {/* 案件概要 */}
          <div className="card" style={{marginBottom: '20px'}}>
            <h2>
              <Icon name="folder" size={20} className="mr-2" />
              案件概要
            </h2>
            <p style={{lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '20px'}}>
              {project.description}
            </p>
            
            <h3 style={{marginBottom: '12px', fontSize: '16px'}}>必要スキル</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {project.requiredSkills.map((skill, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: 'rgba(92, 130, 26, 0.1)',
                    color: 'var(--plant-green)',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* クライアント情報 */}
          <div className="card" style={{marginBottom: '20px'}}>
            <h2>
              <Icon name="phone" size={20} className="mr-2" />
              クライアント情報
            </h2>
            <div style={{display: 'grid', gridTemplateColumns: '100px 1fr', gap: '12px', alignItems: 'center'}}>
              <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>会社名:</span>
              <span style={{fontWeight: '500'}}>{project.client}</span>
              
              <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>担当者:</span>
              <span>{project.clientContact.name}</span>
              
              <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>メール:</span>
              <span style={{color: 'var(--plant-green)'}}>{project.clientContact.email}</span>
              
              <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>電話:</span>
              <span>{project.clientContact.phone}</span>
            </div>
          </div>

          {/* 要件・成果物 */}
          <div className="card" style={{marginBottom: '20px'}}>
            <h2>
              <Icon name="target" size={20} className="mr-2" />
              要件・成果物
            </h2>
            
            <h3 style={{marginBottom: '12px', fontSize: '16px'}}>主要要件</h3>
            <ul style={{marginBottom: '20px', paddingLeft: '20px'}}>
              {project.requirements.map((req, index) => (
                <li key={index} style={{marginBottom: '4px', color: 'var(--text-secondary)'}}>
                  {req}
                </li>
              ))}
            </ul>
            
            <h3 style={{marginBottom: '12px', fontSize: '16px'}}>成果物</h3>
            <ul style={{paddingLeft: '20px'}}>
              {project.deliverables.map((deliverable, index) => (
                <li key={index} style={{marginBottom: '4px', color: 'var(--text-secondary)'}}>
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 右カラム */}
        <div>
          {/* マイルストーン */}
          <div className="card" style={{marginBottom: '20px'}}>
            <h2>
              <Icon name="target" size={20} className="mr-2" />
              マイルストーン
            </h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {project.milestones.map((milestone, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '16px',
                    backgroundColor: 'rgba(92, 130, 26, 0.02)',
                    borderRadius: '8px',
                    border: `1px solid rgba(92, 130, 26, 0.1)`,
                    borderLeft: `4px solid ${getMilestoneStatusColor(milestone.status)}`
                  }}
                >
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                    <h3 style={{fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)'}}>
                      {milestone.name}
                    </h3>
                    <span style={{
                      backgroundColor: getMilestoneStatusColor(milestone.status),
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {getMilestoneStatusText(milestone.status)}
                    </span>
                  </div>
                  <p style={{color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px'}}>
                    {milestone.description}
                  </p>
                  <div style={{color: 'var(--text-muted)', fontSize: '12px'}}>
                    期日: {milestone.dueDate}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* リスク管理 */}
          <div className="card" style={{marginBottom: '20px'}}>
            <h2>
              <Icon name="warning-circle" size={20} className="mr-2" />
              リスク管理
            </h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {project.risks.map((risk, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '12px',
                    backgroundColor: risk.level === 'high' ? 'rgba(220, 38, 38, 0.05)' : 
                                   risk.level === 'medium' ? 'rgba(245, 158, 11, 0.05)' : 
                                   'rgba(22, 163, 74, 0.05)',
                    border: `1px solid ${risk.level === 'high' ? '#fecaca' : 
                                        risk.level === 'medium' ? '#fde68a' : 
                                        '#bbf7d0'}`,
                    borderRadius: '6px'
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                    <span style={{
                      backgroundColor: risk.level === 'high' ? '#dc2626' : 
                                     risk.level === 'medium' ? '#f59e0b' : 
                                     '#16a34a',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      marginRight: '8px'
                    }}>
                      {risk.level === 'high' ? '高' : risk.level === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                  <p style={{fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px'}}>
                    {risk.description}
                  </p>
                  <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>
                    <strong>対策:</strong> {risk.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* コミュニケーション履歴 */}
      <div className="card">
        <h2>
          <Icon name="phone" size={20} className="mr-2" />
          コミュニケーション履歴
        </h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {project.communications.map((comm, index) => (
            <div 
              key={index}
              style={{
                padding: '16px',
                backgroundColor: comm.type === 'meeting' ? 'rgba(92, 130, 26, 0.02)' : 'rgba(99, 102, 241, 0.02)',
                borderRadius: '8px',
                border: `1px solid ${comm.type === 'meeting' ? 'rgba(92, 130, 26, 0.1)' : 'rgba(99, 102, 241, 0.1)'}`
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                <h3 style={{fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)'}}>
                  {comm.title}
                </h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{
                    backgroundColor: comm.type === 'meeting' ? 'var(--plant-green)' : '#6366f1',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {comm.type === 'meeting' ? '会議' : 'メール'}
                  </span>
                  <span style={{color: 'var(--text-muted)', fontSize: '12px'}}>
                    {comm.date}
                  </span>
                </div>
              </div>
              <p style={{color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5'}}>
                {comm.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}