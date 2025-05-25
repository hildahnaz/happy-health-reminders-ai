
import React, { useState } from 'react';
import { Plus, Edit, Copy, Trash, Sparkles, MessageSquare, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MessageTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const templates = [
    {
      id: 1,
      name: 'Appointment Reminder - 24hr',
      type: 'SMS',
      category: 'Reminder',
      content: 'Hi {patientName}! This is a friendly reminder about your appointment with Dr. {doctorName} tomorrow at {appointmentTime}. Please reply CONFIRM or call us at {clinicPhone} if you need to reschedule. Thank you!',
      variables: ['patientName', 'doctorName', 'appointmentTime', 'clinicPhone'],
      aiOptimized: true
    },
    {
      id: 2,
      name: 'WhatsApp Follow-up',
      type: 'WhatsApp',
      category: 'Follow-up',
      content: 'Hello {patientName}! 👋\n\nHow are you feeling after your visit with Dr. {doctorName}? We hope your recovery is going well.\n\nIf you have any questions or concerns, please don\'t hesitate to reach out.\n\nBest regards,\n{clinicName} Team',
      variables: ['patientName', 'doctorName', 'clinicName'],
      aiOptimized: true
    },
    {
      id: 3,
      name: 'Email Confirmation',
      type: 'Email',
      category: 'Confirmation',
      content: 'Dear {patientName},\n\nYour appointment has been confirmed for {appointmentDate} at {appointmentTime} with Dr. {doctorName}.\n\nLocation: {clinicAddress}\n\nPlease arrive 15 minutes early and bring your insurance card and any relevant medical records.\n\nIf you need to cancel or reschedule, please contact us at least 24 hours in advance.\n\nThank you,\n{clinicName}',
      variables: ['patientName', 'appointmentDate', 'appointmentTime', 'doctorName', 'clinicAddress', 'clinicName'],
      aiOptimized: false
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'SMS': return <Phone className="w-4 h-4" />;
      case 'WhatsApp': return <MessageSquare className="w-4 h-4" />;
      case 'Email': return <Mail className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'SMS': return 'bg-blue-100 text-blue-800';
      case 'WhatsApp': return 'bg-green-100 text-green-800';
      case 'Email': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Message Templates</span>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Template
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      {template.aiOptimized && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          <Sparkles className="w-3 h-3" />
                          <span>AI Optimized</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getTypeColor(template.type)}`}>
                        {getTypeIcon(template.type)}
                        <span>{template.type}</span>
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {template.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{template.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-wrap gap-1">
                      {template.variables.slice(0, 3).map((variable) => (
                        <span key={variable} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {`{${variable}}`}
                        </span>
                      ))}
                      {template.variables.length > 3 && (
                        <span className="text-xs text-gray-500">+{template.variables.length - 3} more</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {selectedTemplate && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Template Preview</span>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                    <Input defaultValue={selectedTemplate.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <Select defaultValue={selectedTemplate.type}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SMS">SMS</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <Textarea
                      rows={6}
                      defaultValue={selectedTemplate.content}
                      className="resize-none"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedTemplate.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getTypeColor(selectedTemplate.type)}`}>
                        {getTypeIcon(selectedTemplate.type)}
                        <span>{selectedTemplate.type}</span>
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {selectedTemplate.category}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Content</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                      {selectedTemplate.content}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Variables</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.variables.map((variable) => (
                        <span key={variable} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {`{${variable}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-600" />
              <span>AI Message Generator</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select message type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reminder">Appointment Reminder</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                  <SelectItem value="confirmation">Confirmation</SelectItem>
                  <SelectItem value="cancellation">Cancellation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="caring">Caring</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Instructions</label>
              <Textarea
                placeholder="Any specific requirements or details to include..."
                rows={3}
                className="resize-none"
              />
            </div>

            <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate with AI
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessageTemplates;
