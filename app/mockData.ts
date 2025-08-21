export interface Engineer {
  id: number;
  name: string;
  skills: string[];
  status: 'active' | 'waiting' | 'completed';
  unitPrice: number;
  currentProject?: string;
  waitingDays?: number;
}

export interface Project {
  id: number;
  name: string;
  client: string;
  status: 'active' | 'planning' | 'completed';
  engineers: string[];
  startDate: string;
  endDate: string;
  revenue: number;
}

export const mockEngineers: Engineer[] = [
  {
    id: 1,
    name: '田中太郎',
    skills: ['React', 'TypeScript', 'Node.js'],
    status: 'waiting',
    unitPrice: 80,
    waitingDays: 30
  },
  {
    id: 2,
    name: '山田花子',
    skills: ['Vue.js', 'Python', 'AWS'],
    status: 'active',
    unitPrice: 85,
    currentProject: 'ECサイトリニューアル'
  },
  {
    id: 3,
    name: '佐藤次郎',
    skills: ['Java', 'Spring Boot', 'PostgreSQL'],
    status: 'active',
    unitPrice: 75,
    currentProject: 'CRMシステム開発'
  },
  {
    id: 4,
    name: '鈴木良子',
    skills: ['React Native', 'iOS', 'Android'],
    status: 'active',
    unitPrice: 90,
    currentProject: 'モバイルアプリ開発'
  },
  {
    id: 5,
    name: '高橋健一',
    skills: ['PHP', 'Laravel', 'MySQL'],
    status: 'waiting',
    unitPrice: 70,
    waitingDays: 5
  },
  {
    id: 6,
    name: '伊藤美咲',
    skills: ['Python', 'Django', 'Machine Learning'],
    status: 'active',
    unitPrice: 95,
    currentProject: 'AIチャットボット開発'
  }
];

export const mockProjects: Project[] = [
  {
    id: 1,
    name: 'ECサイトリニューアル',
    client: 'ABC商事株式会社',
    status: 'active',
    engineers: ['山田花子'],
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    revenue: 3200000
  },
  {
    id: 2,
    name: 'CRMシステム開発',
    client: 'XYZ企業',
    status: 'active',
    engineers: ['佐藤次郎'],
    startDate: '2024-07-15',
    endDate: '2024-11-30',
    revenue: 2800000
  },
  {
    id: 3,
    name: 'モバイルアプリ開発',
    client: 'DEF株式会社',
    status: 'active',
    engineers: ['鈴木良子'],
    startDate: '2024-08-01',
    endDate: '2025-01-31',
    revenue: 2100000
  },
  {
    id: 4,
    name: 'AIチャットボット開発',
    client: 'GHI会社',
    status: 'active',
    engineers: ['伊藤美咲'],
    startDate: '2024-05-01',
    endDate: '2024-10-31',
    revenue: 1900000
  },
  {
    id: 5,
    name: '在庫管理システム',
    client: 'JKL商店',
    status: 'planning',
    engineers: [],
    startDate: '2024-10-01',
    endDate: '2025-03-31',
    revenue: 1500000
  }
];

export const getDashboardStats = () => {
  const totalEngineers = mockEngineers.length;
  const activeEngineers = mockEngineers.filter(e => e.status === 'active').length;
  const waitingEngineers = mockEngineers.filter(e => e.status === 'waiting').length;
  const operationRate = Math.round((activeEngineers / totalEngineers) * 100 * 10) / 10;
  
  const activeProjects = mockProjects.filter(p => p.status === 'active').length;
  const totalRevenue = mockProjects
    .filter(p => p.status === 'active')
    .reduce((sum, p) => sum + p.revenue, 0);
  
  return {
    operationRate,
    totalEngineers,
    activeEngineers,
    waitingEngineers,
    activeProjects,
    totalRevenue
  };
};

export const getAlerts = () => {
  const alerts = [];
  
  // 長期待機エンジニア
  const longWaitingEngineers = mockEngineers.filter(e => 
    e.status === 'waiting' && e.waitingDays && e.waitingDays > 20
  );
  
  if (longWaitingEngineers.length > 0) {
    alerts.push({
      type: 'danger' as const,
      title: '長期待機エンジニア',
      message: `${longWaitingEngineers[0].name}さんが${longWaitingEngineers[0].waitingDays}日間待機中です`
    });
  }
  
  // 契約終了予定
  const endingSoonProjects = mockProjects.filter(p => {
    const endDate = new Date(p.endDate);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 60 && diffDays > 0;
  });
  
  if (endingSoonProjects.length > 0) {
    alerts.push({
      type: 'warning' as const,
      title: '契約終了予定',
      message: `${endingSoonProjects.length}件の案件が2ヶ月以内に終了予定です`
    });
  }
  
  // 新規案件
  const planningProjects = mockProjects.filter(p => p.status === 'planning');
  if (planningProjects.length > 0) {
    alerts.push({
      type: 'info' as const,
      title: '新規案件',
      message: `${planningProjects.length}件の新規案件が企画中です`
    });
  }
  
  return alerts;
};