
import React, { useState } from 'react';
import { Plus, Users, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PatientList from './PatientList';
import MessageTemplates from './MessageTemplates';
import IntegrationSettings from './IntegrationSettings';
import Analytics from './Analytics';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Patients',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Reminders Sent',
      value: '3,456',
      change: '+8%',
      icon: MessageSquare,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Pending Follow-ups',
      value: '89',
      change: '-15%',
      icon: Clock,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      title: 'Response Rate',
      value: '87%',
      change: '+5%',
      icon: CheckCircle,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'patients':
        return <PatientList />;
      case 'templates':
        return <MessageTemplates />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'analytics':
        return <Analytics />;
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <span>Urgent Follow-ups</span>
                  </CardTitle>
                  <CardDescription>Patients requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah Johnson', appointment: 'Tomorrow 9:00 AM', type: 'Consultation' },
                      { name: 'Michael Chen', appointment: 'Today 3:30 PM', type: 'Follow-up' },
                      { name: 'Emma Davis', appointment: 'Tomorrow 11:00 AM', type: 'Check-up' }
                    ].map((patient, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-600">{patient.appointment}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                          {patient.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest reminder activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'SMS sent to John Smith', time: '2 minutes ago', status: 'success' },
                      { action: 'WhatsApp reminder delivered', time: '15 minutes ago', status: 'success' },
                      { action: 'Email failed to deliver', time: '1 hour ago', status: 'error' },
                      { action: 'Follow-up scheduled', time: '2 hours ago', status: 'info' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-500' :
                          activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600">Manage your patient reminders and follow-ups</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Reminder
          </Button>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'patients', label: 'Patients' },
              { id: 'templates', label: 'Templates' },
              { id: 'integrations', label: 'Integrations' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
