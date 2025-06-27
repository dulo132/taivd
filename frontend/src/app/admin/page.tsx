'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import {
  Users,
  DollarSign,
  Download,
  Activity,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Server,
  Database,
  Wifi,
  HardDrive,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowUpRight,
  BarChart3,
  UserPlus,
  Settings
} from 'lucide-react';

// CSS Animation classes will be used instead of framer-motion

// Types
interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalDownloads: number;
  revenueToday: number;
  newUsersToday: number;
  downloadsToday: number;
  systemStatus: 'healthy' | 'warning' | 'error';
  serverUptime: string;
  storageUsed: number;
  storageTotal: number;
  bandwidthUsed: number;
  bandwidthLimit: number;
  userGrowth: number;
  revenueGrowth: number;
  downloadGrowth: number;
}

interface SystemHealth {
  api: 'online' | 'degraded' | 'offline';
  database: 'online' | 'degraded' | 'offline';
  storage: 'online' | 'degraded' | 'offline';
  youtube: 'online' | 'degraded' | 'offline';
}

interface RecentActivity {
  id: string;
  type: 'user_register' | 'download' | 'payment' | 'system';
  message: string;
  timestamp: string;
  user?: {
    email: string;
    avatar?: string;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data generators
  const generateMockStats = (): DashboardStats => ({
    totalUsers: 1247,
    activeUsers: 892,
    totalDownloads: 15420,
    revenueToday: 2450000,
    newUsersToday: 23,
    downloadsToday: 156,
    systemStatus: 'healthy',
    serverUptime: '15 ngày 4 giờ',
    storageUsed: 75,
    storageTotal: 100,
    bandwidthUsed: 45,
    bandwidthLimit: 100,
    userGrowth: 12.5,
    revenueGrowth: 8.3,
    downloadGrowth: 15.7
  });

  const generateMockHealth = (): SystemHealth => ({
    api: 'online',
    database: 'online',
    storage: 'online',
    youtube: 'online'
  });

  const generateMockActivity = (): RecentActivity[] => [
    {
      id: '1',
      type: 'user_register',
      message: 'Người dùng mới đăng ký: user@example.com',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      user: { email: 'user@example.com' }
    },
    {
      id: '2',
      type: 'download',
      message: 'Video được tải xuống: "Sample Video Title"',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      type: 'payment',
      message: 'Thanh toán thành công: 299,000 VND',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      type: 'system',
      message: 'Hệ thống backup hoàn tất',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString()
    }
  ];

  // Data fetching
  const fetchDashboardData = useCallback(async () => {
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStats(generateMockStats());
      setSystemHealth(generateMockHealth());
      setRecentActivity(generateMockActivity());
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Không thể tải dữ liệu dashboard');
    }
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboardData();
    setIsRefreshing(false);
    toast.success('Dữ liệu đã được cập nhật');
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchDashboardData();
      setIsLoading(false);
    };

    loadData();
  }, [fetchDashboardData]);

  // Utility functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return CheckCircle;
      case 'degraded': return AlertTriangle;
      case 'offline': return XCircle;
      default: return Clock;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_register': return UserPlus;
      case 'download': return Download;
      case 'payment': return DollarSign;
      case 'system': return Settings;
      default: return Activity;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex-1 space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Tổng người dùng',
      value: formatNumber(stats?.totalUsers || 0),
      change: stats?.userGrowth || 0,
      changeLabel: 'so với tháng trước',
      icon: Users,
      color: 'blue',
      href: '/admin/users'
    },
    {
      title: 'Người dùng hoạt động',
      value: formatNumber(stats?.activeUsers || 0),
      change: (stats?.userGrowth || 0) * 0.8,
      changeLabel: 'so với tháng trước',
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Tổng lượt tải',
      value: formatNumber(stats?.totalDownloads || 0),
      change: stats?.downloadGrowth || 0,
      changeLabel: 'so với tháng trước',
      icon: Download,
      color: 'purple'
    },
    {
      title: 'Doanh thu hôm nay',
      value: formatCurrency(stats?.revenueToday || 0),
      change: stats?.revenueGrowth || 0,
      changeLabel: 'so với hôm qua',
      icon: DollarSign,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-up">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Chào mừng trở lại! Đây là tổng quan hệ thống của bạn.
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Đang tải...' : 'Làm mới'}
        </Button>
      </div>

      {/* System Status Alert */}
      {stats && (
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Alert className={`${
            stats.systemStatus === 'healthy'
              ? 'border-green-200 bg-green-50'
              : stats.systemStatus === 'warning'
              ? 'border-yellow-200 bg-yellow-50'
              : 'border-red-200 bg-red-50'
          }`}>
            {stats.systemStatus === 'healthy' ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            )}
            <AlertDescription className={
              stats.systemStatus === 'healthy'
                ? 'text-green-800'
                : stats.systemStatus === 'warning'
                ? 'text-yellow-800'
                : 'text-red-800'
            }>
              {stats.systemStatus === 'healthy'
                ? `Hệ thống đang hoạt động bình thường. Uptime: ${stats.serverUptime}`
                : stats.systemStatus === 'warning'
                ? 'Hệ thống có một số vấn đề cần chú ý.'
                : 'Hệ thống đang gặp sự cố nghiêm trọng.'
              }
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {statCards.map((card, index) => {
          const IconComponent = card.icon;
          const isPositive = card.change > 0;

          return (
            <div key={card.title} className="animate-slide-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <Card className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">{card.title}</p>
                      <p className="text-2xl font-bold">{card.value}</p>
                      <div className="flex items-center gap-1 text-xs">
                        {isPositive ? (
                          <TrendingUp className="h-3 w-3 text-green-600" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-600" />
                        )}
                        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                          {formatPercentage(card.change)}
                        </span>
                        <span className="text-gray-500">{card.changeLabel}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${
                      card.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      card.color === 'green' ? 'bg-green-100 text-green-600' :
                      card.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        {/* Left Column - Charts and Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resource Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Tài nguyên hệ thống
              </CardTitle>
              <CardDescription>
                Theo dõi tình trạng sử dụng tài nguyên server
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4" />
                    Dung lượng lưu trữ
                  </span>
                  <span>{stats?.storageUsed}% / {stats?.storageTotal}GB</span>
                </div>
                <Progress value={stats?.storageUsed || 0} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    Băng thông
                  </span>
                  <span>{stats?.bandwidthUsed}% / {stats?.bandwidthLimit}GB</span>
                </div>
                <Progress value={stats?.bandwidthUsed || 0} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats?.newUsersToday}</div>
                  <div className="text-sm text-blue-600">Người dùng mới hôm nay</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats?.downloadsToday}</div>
                  <div className="text-sm text-green-600">Lượt tải hôm nay</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Tình trạng hệ thống
              </CardTitle>
              <CardDescription>
                Trạng thái các dịch vụ chính của hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systemHealth && Object.entries(systemHealth).map(([service, status]) => {
                  const StatusIcon = getStatusIcon(status);
                  return (
                    <div key={service} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <StatusIcon className={`h-4 w-4 ${getStatusColor(status).split(' ')[0]}`} />
                        <span className="font-medium capitalize">
                          {service === 'api' ? 'API Server' :
                           service === 'database' ? 'Cơ sở dữ liệu' :
                           service === 'storage' ? 'Lưu trữ' :
                           service === 'youtube' ? 'YouTube API' : service}
                        </span>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(status)}>
                        {status === 'online' ? 'Hoạt động' :
                         status === 'degraded' ? 'Chậm' : 'Offline'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity Feed */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Hoạt động gần đây
              </CardTitle>
              <CardDescription>
                Các sự kiện mới nhất trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:translate-x-1"
                    >
                      <div className={`p-2 rounded-full ${
                        activity.type === 'user_register' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'download' ? 'bg-green-100 text-green-600' :
                        activity.type === 'payment' ? 'bg-orange-100 text-orange-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <ActivityIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTimeAgo(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Thao tác nhanh
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a href="/admin/users">
                  <Users className="h-4 w-4" />
                  Quản lý người dùng
                  <ArrowUpRight className="h-4 w-4 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a href="/admin/cookie">
                  <Settings className="h-4 w-4" />
                  Cài đặt Cookie
                  <ArrowUpRight className="h-4 w-4 ml-auto" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a href="/admin/settings">
                  <Settings className="h-4 w-4" />
                  Cài đặt hệ thống
                  <ArrowUpRight className="h-4 w-4 ml-auto" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
