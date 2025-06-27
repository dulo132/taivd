'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  Activity,
  ArrowUpRight,
  Info
} from 'lucide-react';

export default function NewDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-up">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Mới
          </h1>
          <p className="text-gray-600">
            Chào mừng đến với phiên bản dashboard hiện đại hơn.
          </p>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          Beta Version
        </Badge>
      </div>

      {/* Info Alert */}
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Đây là phiên bản demo của dashboard mới. Các tính năng đang được phát triển.
          </AlertDescription>
        </Alert>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Tổng người dùng</p>
                <p className="text-2xl font-bold">2,847</p>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+18.5%</span>
                  <span className="text-gray-500">so với tháng trước</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Doanh thu</p>
                <p className="text-2xl font-bold">4.85M VND</p>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+12.8%</span>
                  <span className="text-gray-500">so với hôm qua</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Lượt tải</p>
                <p className="text-2xl font-bold">28,450</p>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+24.3%</span>
                  <span className="text-gray-500">so với tháng trước</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Download className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Hoạt động</p>
                <p className="text-2xl font-bold">1,923</p>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+15.2%</span>
                  <span className="text-gray-500">người dùng hoạt động</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <Activity className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Biểu đồ phân tích
            </CardTitle>
            <CardDescription>
              Dữ liệu thống kê chi tiết sẽ được hiển thị ở đây
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="text-gray-500">Biểu đồ sẽ được hiển thị ở đây</p>
                <p className="text-sm text-gray-400">Đang phát triển...</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Tính năng mới
            </CardTitle>
            <CardDescription>
              Các tính năng đang được phát triển
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Real-time Analytics</p>
                  <p className="text-sm text-blue-600">Phân tích dữ liệu thời gian thực</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Sắp ra mắt
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">Advanced Reporting</p>
                  <p className="text-sm text-green-600">Báo cáo chi tiết và xuất dữ liệu</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Đang phát triển
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-900">AI Insights</p>
                  <p className="text-sm text-purple-600">Phân tích thông minh với AI</p>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  Ý tưởng
                </Badge>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="outline" className="w-full gap-2" asChild>
                <a href="/admin">
                  Quay lại Dashboard chính
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
