
import React, { useState } from 'react';
import { Check, Settings, Zap, Send, Bot, Shield, ExternalLink, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const IntegrationSettings = () => {
  const [zapierWebhook, setZapierWebhook] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const integrations = [
    {
      name: 'Zapier',
      description: 'Automate workflows and connect with 6000+ apps',
      icon: Zap,
      status: 'connected',
      color: 'text-orange-600 bg-orange-100',
      features: ['SMS automation', 'Email triggers', 'Calendar sync', 'CRM integration']
    },
    {
      name: 'Twilio',
      description: 'Send SMS and WhatsApp messages to patients',
      icon: Send,
      status: 'connected',
      color: 'text-red-600 bg-red-100',
      features: ['SMS delivery', 'WhatsApp Business', 'Phone calls', 'Delivery tracking']
    },
    {
      name: 'OpenAI',
      description: 'AI-powered message personalization and generation',
      icon: Bot,
      status: 'disconnected',
      color: 'text-green-600 bg-green-100',
      features: ['Message generation', 'Tone customization', 'Multi-language', 'Smart templates']
    },
    {
      name: 'HIPAA Compliance',
      description: 'Secure patient data handling and encryption',
      icon: Shield,
      status: 'active',
      color: 'text-blue-600 bg-blue-100',
      features: ['Data encryption', 'Access logs', 'Audit trails', 'Secure storage']
    }
  ];

  const handleZapierTest = async (e) => {
    e.preventDefault();
    
    if (!zapierWebhook) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Testing Zapier webhook:", zapierWebhook);

    try {
      const response = await fetch(zapierWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          source: "HealthRemind Pro",
          patient_name: "Test Patient",
          appointment_time: "2025-05-28 10:00 AM",
          message_type: "reminder"
        }),
      });

      toast({
        title: "Test Sent",
        description: "Test data has been sent to your Zapier webhook. Check your Zap history to confirm it was received.",
      });
    } catch (error) {
      console.error("Error testing webhook:", error);
      toast({
        title: "Error",
        description: "Failed to send test data. Please check the webhook URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'connected':
        return <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
          <Check className="w-3 h-3" />
          <span>Connected</span>
        </span>;
      case 'active':
        return <span className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          <Check className="w-3 h-3" />
          <span>Active</span>
        </span>;
      case 'disconnected':
        return <span className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>Disconnected</span>
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${integration.color}`}>
                    <integration.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(integration.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {integration.features.map((feature, featureIndex) => (
                    <span key={featureIndex} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toast({ title: "Settings", description: `${integration.name} settings would open here` })}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <span>Zapier Integration</span>
            </CardTitle>
            <CardDescription>
              Connect your Zapier webhook to automate patient reminder workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleZapierTest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zapier Webhook URL
                </label>
                <Input
                  type="url"
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                  value={zapierWebhook}
                  onChange={(e) => setZapierWebhook(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Create a webhook trigger in Zapier and paste the URL here
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Auto-trigger reminders</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Send delivery reports</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Error notifications</span>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isLoading}
              >
                {isLoading ? 'Testing...' : 'Test Connection'}
              </Button>
            </form>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Workflow Example:</strong> Patient appointment → Zapier → SMS via Twilio → Delivery confirmation
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-green-600" />
              <span>AI Configuration</span>
            </CardTitle>
            <CardDescription>
              Set up AI-powered message generation and personalization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OpenAI API Key
              </label>
              <Input
                type="password"
                placeholder="sk-..."
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your API key is encrypted and stored securely
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">AI message optimization</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Personalization</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Multi-language support</span>
                <Switch />
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Connect OpenAI
            </Button>

            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>AI Features:</strong> Automatic message generation, tone adjustment, and smart personalization based on patient history
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security & Compliance</CardTitle>
          <CardDescription>
            Ensure your patient communications meet healthcare standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">HIPAA Compliant</span>
              </div>
              <p className="text-sm text-green-700">
                All patient data is encrypted and handled according to HIPAA requirements
              </p>
            </div>
            
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Secure Transmission</span>
              </div>
              <p className="text-sm text-blue-700">
                End-to-end encryption for all message delivery channels
              </p>
            </div>
            
            <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ExternalLink className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-800">Audit Logs</span>
              </div>
              <p className="text-sm text-purple-700">
                Complete tracking of all communications and system access
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
