
import React from 'react';
import { TrendingUp, TrendingDown, Users, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const weeklyData = [
    { day: 'Mon', sent: 45, delivered: 42, responses: 38 },
    { day: 'Tue', sent: 52, delivered: 48, responses: 41 },
    { day: 'Wed', sent: 38, delivered: 36, responses: 32 },
    { day: 'Thu', sent: 61, delivered: 58, responses: 52 },
    { day: 'Fri', sent: 48, delivered: 45, responses: 39 },
    { day: 'Sat', sent: 23, delivered: 22, responses: 19 },
    { day: 'Sun', sent: 15, delivered: 14, responses: 12 }
  ];

  const channelData = [
    { name: 'SMS', value: 45, color: '#3B82F6' },
    { name: 'WhatsApp', value: 35, color: '#10B981' },
    { name: 'Email', value: 20, color: '#8B5CF6' }
  ];

  const responseTimeData = [
    { time: '< 1hr', count: 25 },
    { time: '1-4hr', count: 42 },
    { time: '4-24hr', count: 18 },
    { time: '> 24hr', count: 8 }
  ];

  const metrics = [
    {
      title: 'Total Messages Sent',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: MessageSquare,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Delivery Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Response Rate',
      value: '76.8%',
      change: '-1.2%',
      trend: 'down',
      icon: Users,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Avg Response Time',
      value: '2.4hrs',
      change: '-0.8hrs',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last week</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Message Activity</CardTitle>
            <CardDescription>Messages sent, delivered, and responded to over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sent" fill="#3B82F6" name="Sent" />
                <Bar dataKey="delivered" fill="#10B981" name="Delivered" />
                <Bar dataKey="responses" fill="#8B5CF6" name="Responses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Channels</CardTitle>
            <CardDescription>Distribution of messages across different channels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Response Time Distribution</CardTitle>
            <CardDescription>How quickly patients respond to reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Key findings and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">High Engagement</span>
                </div>
                <p className="text-sm text-green-700">
                  WhatsApp messages have 25% higher response rates than SMS
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Optimal Timing</span>
                </div>
                <p className="text-sm text-blue-700">
                  Messages sent between 9-11 AM have the best response rates
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Growth Opportunity</span>
                </div>
                <p className="text-sm text-orange-700">
                  AI-generated messages show 15% better engagement than templates
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Patient Preference</span>
                </div>
                <p className="text-sm text-purple-700">
                  86% of patients prefer personalized reminders over generic ones
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
