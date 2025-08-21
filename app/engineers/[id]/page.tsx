'use client';

import { useRouter, useParams } from 'next/navigation';
import Icon from '../../../components/ui/Icon';

// モックエンジニアデータ（詳細版）
const mockEngineersDetail = {
  '1': {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    phone: '090-1234-5678',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    certifications: ['AWS Solutions Architect', 'React Developer'],
    status: 'waiting',
    unitPrice: 80,
    waitingDays: 30,
    joinDate: '2022-04-01',
    experience: 5,
    currentProject: null,
    pastProjects: [
      {
        name: 'ECサイトリニューアル',
        client: 'ABC商事',
        period: '2023-01-15 〜 2023-06-30',
        role: 'フロントエンド開発'
      },
      {
        name: '在庫管理システム',
        client: 'XYZ株式会社',
        period: '2022-08-01 〜 2022-12-31',
        role: 'フルスタック開発'
      }
    ],
    profileImage: null,
    bio: 'フロントエンド開発を中心に、フルスタック開発も対応可能。特にReactを使用したSPAの開発経験が豊富です。',
    strengths: ['UI/UX設計', '高速な開発', 'チームコミュニケーション'],
    availability: '即日対応可能'
  },
  '2': {
    id: '2',
    name: '山田花子',
    email: 'yamada@example.com',
    phone: '090-9876-5432',
    skills: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Git'],
    certifications: ['Python Engineer', 'Vue.js Developer'],
    status: 'working',
    unitPrice: 75,
    waitingDays: null,
    joinDate: '2021-03-15',
    experience: 6,
    currentProject: {
      name: 'ECサイトリニューアル案件',
      client: 'ABC商事',
      startDate: '2024-09-01',
      endDate: '2024-12-31',
      role: 'バックエンド開発'
    },
    pastProjects: [
      {
        name: '顧客管理システム',
        client: 'DEF企業',
        period: '2023-03-01 〜 2023-08-31',
        role: 'バックエンド開発'
      }
    ],
    profileImage: null,
    bio: 'バックエンド開発が専門で、特にPythonとDjangoを使用したWebアプリケーション開発を得意としています。',
    strengths: ['データベース設計', 'API開発', '問題解決能力'],
    availability: '2024年12月末以降対応可能'
  }
};

export default function EngineerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const engineerId = params.id as string;
  const engineer = mockEngineersDetail[engineerId as keyof typeof mockEngineersDetail];

  if (!engineer) {
    return (
      <div className="container">
        <div className="card" style={{textAlign: 'center', padding: '60px 20px'}}>
          <Icon name="warning-circle" size={48} style={{color: 'var(--text-muted)', marginBottom: '16px'}} />
          <h2 style={{color: 'var(--text-secondary)', marginBottom: '8px'}}>エンジニアが見つかりません</h2>
          <p style={{color: 'var(--text-muted)', marginBottom: '24px'}}>指定されたエンジニアは存在しないか、削除された可能性があります。</p>
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
    router.push(`/engineers/${engineerId}/edit`);
  };

  const handleDelete = () => {
    if (confirm('このエンジニアを削除しますか？この操作は取り消せません。')) {
      // 削除処理のモック
      alert('エンジニアが削除されました（デモ）');
      router.push('/dashboard');
    }
  };

  const handleAssignProject = () => {
    alert('案件アサイン機能（未実装）');
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
          エンジニア管理
        </button>
        <span style={{margin: '0 8px'}}>/</span>
        <span>{engineer.name}</span>
      </div>

      {/* ヘッダーセクション */}
      <div className="card" style={{marginBottom: '20px'}}>
        <div className="detail-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px'}}>
          <div className="detail-info" style={{display: 'flex', alignItems: 'center'}}>
            <div className="profile-avatar" style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--plant-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '24px',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              {engineer.name.charAt(0)}
            </div>
            <div>
              <h1 style={{fontSize: '28px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px'}}>
                {engineer.name}
              </h1>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px'}}>
                <span className={`status ${engineer.status}`} style={{fontSize: '14px'}}>
                  {engineer.status === 'working' ? '稼働中' : 
                   engineer.status === 'waiting' ? '待機中' : '予定'}
                </span>
                <span style={{fontSize: '18px', fontWeight: 'bold', color: 'var(--plant-green)'}}>
                  ¥{engineer.unitPrice}万/月
                </span>
              </div>
              <div style={{color: 'var(--text-muted)', fontSize: '14px'}}>
                経験年数: {engineer.experience}年 | 参画日: {engineer.joinDate}
              </div>
            </div>
          </div>
          
          <div className="detail-actions" style={{display: 'flex', gap: '12px'}}>
            <button onClick={handleEdit} className="button secondary">
              <Icon name="users" size={16} className="mr-2" />
              編集
            </button>
            {engineer.status === 'waiting' && (
              <button onClick={handleAssignProject} className="button">
                <Icon name="folder" size={16} className="mr-2" />
                案件アサイン
              </button>
            )}
            <button onClick={handleDelete} className="button danger">
              <Icon name="warning" size={16} className="mr-2" />
              削除
            </button>
          </div>
        </div>

        {/* ステータス詳細 */}
        {engineer.status === 'waiting' && engineer.waitingDays && (
          <div className="alert warning" style={{marginBottom: '0'}}>
            <Icon name="warning-circle" size={20} style={{marginRight: '12px'}} />
            <div>
              <strong>待機期間: {engineer.waitingDays}日</strong>
              <p style={{fontSize: '14px', marginTop: '4px'}}>
                長期待機中です。優先的に案件をアサインすることを推奨します。
              </p>
            </div>
          </div>
        )}

        {engineer.status === 'working' && engineer.currentProject && (
          <div className="alert info" style={{marginBottom: '0'}}>
            <Icon name="folder" size={20} style={{marginRight: '12px'}} />
            <div>
              <strong>現在のプロジェクト: {engineer.currentProject.name}</strong>
              <p style={{fontSize: '14px', marginTop: '4px'}}>
                {engineer.currentProject.client} | {engineer.currentProject.role}<br />
                期間: {engineer.currentProject.startDate} 〜 {engineer.currentProject.endDate}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid-2">
        {/* 左カラム */}
        <div>
          {/* 基本情報 */}
          <div className="card" style={{marginBottom: '20px'}}>
            <h2>
              <Icon name="users" size={20} className="mr-2" />
              基本情報
            </h2>
            <div style={{display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px', alignItems: 'center'}}>
              <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>メールアドレス:</span>
              <span>{engineer.email}</span>
              
              <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>電話番号:</span>
              <span>{engineer.phone}</span>
              
              <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>対応可能時期:</span>
              <span style={{color: engineer.status === 'waiting' ? 'var(--plant-green)' : 'var(--text-muted)'}}>
                {engineer.availability}
              </span>
            </div>
          </div>

          {/* プロフィール */}
          <div className="card" style={{marginBottom: '20px'}}>
            <h2>
              <Icon name="users" size={20} className="mr-2" />
              プロフィール
            </h2>
            <p style={{lineHeight: '1.6', color: 'var(--text-secondary)'}}>{engineer.bio}</p>
            
            <h3 style={{marginTop: '20px', marginBottom: '12px', fontSize: '16px'}}>強み・特徴</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {engineer.strengths.map((strength, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: 'rgba(92, 130, 26, 0.1)',
                    color: 'var(--plant-green)',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 右カラム */}
        <div>
          {/* スキル */}
          <div className="card" style={{marginBottom: '20px'}}>
            <h2>
              <Icon name="lightbulb" size={20} className="mr-2" />
              スキル
            </h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {engineer.skills.map((skill, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: 'var(--plant-green)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 認定資格 */}
          <div className="card" style={{marginBottom: '20px'}}>
            <h2>
              <Icon name="target" size={20} className="mr-2" />
              認定資格
            </h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              {engineer.certifications.map((cert, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: 'rgba(92, 130, 26, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(92, 130, 26, 0.1)'
                  }}
                >
                  <Icon name="check-circle" size={16} style={{color: 'var(--plant-green)', marginRight: '12px'}} />
                  <span style={{fontWeight: '500'}}>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* プロジェクト履歴 */}
      <div className="card">
        <h2>
          <Icon name="folder" size={20} className="mr-2" />
          プロジェクト履歴
        </h2>
        <div style={{display: 'grid', gap: '16px'}}>
          {engineer.pastProjects.map((project, index) => (
            <div 
              key={index}
              style={{
                padding: '20px',
                backgroundColor: 'rgba(92, 130, 26, 0.02)',
                borderRadius: '12px',
                border: '1px solid rgba(92, 130, 26, 0.1)'
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px'}}>
                <h3 style={{fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)'}}>{project.name}</h3>
                <span style={{
                  backgroundColor: 'rgba(92, 130, 26, 0.1)',
                  color: 'var(--plant-green)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  完了
                </span>
              </div>
              <p style={{color: 'var(--text-secondary)', marginBottom: '4px'}}>
                <strong>クライアント:</strong> {project.client}
              </p>
              <p style={{color: 'var(--text-secondary)', marginBottom: '4px'}}>
                <strong>期間:</strong> {project.period}
              </p>
              <p style={{color: 'var(--text-secondary)'}}>
                <strong>担当役割:</strong> {project.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}