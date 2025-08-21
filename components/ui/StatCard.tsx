'use client';

import Icon from './Icon';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  subtitle?: string;
  color?: 'green' | 'blue' | 'purple' | 'orange' | 'red';
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  subtitle,
  color = 'green' 
}: StatCardProps) {
  const colorClasses = {
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-100',
      border: 'border-green-200',
      icon: 'text-green-600',
      value: 'text-green-800',
      title: 'text-green-700'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-100',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      value: 'text-blue-800',
      title: 'text-blue-700'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-indigo-100',
      border: 'border-purple-200',
      icon: 'text-purple-600',
      value: 'text-purple-800',
      title: 'text-purple-700'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-yellow-100',
      border: 'border-orange-200',
      icon: 'text-orange-600',
      value: 'text-orange-800',
      title: 'text-orange-700'
    },
    red: {
      bg: 'bg-gradient-to-br from-red-50 to-pink-100',
      border: 'border-red-200',
      icon: 'text-red-600',
      value: 'text-red-800',
      title: 'text-red-700'
    }
  };

  const classes = colorClasses[color];

  return (
    <div className={`${classes.bg} ${classes.border} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm`}>
      {/* アイコン */}
      <div className="flex justify-center mb-4">
        <div className={`p-3 rounded-full bg-white/70 ${classes.icon}`}>
          <Icon name={icon} size={28} />
        </div>
      </div>

      {/* 値 */}
      <div className={`text-3xl font-bold text-center mb-2 ${classes.value}`}>
        {value}
      </div>

      {/* タイトル */}
      <div className={`text-sm font-medium text-center mb-3 ${classes.title}`}>
        {title}
      </div>

      {/* サブタイトル */}
      {subtitle && (
        <div className="text-xs text-center text-gray-600 mb-2">
          {subtitle}
        </div>
      )}

      {/* トレンド */}
      {trend && (
        <div className="text-center">
          <span className={`text-xs font-semibold ${
            trend.isPositive !== false ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive !== false ? '↗' : '↘'} {Math.abs(trend.value)}% {trend.label}
          </span>
        </div>
      )}
    </div>
  );
}