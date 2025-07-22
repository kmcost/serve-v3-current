import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ConnectionModal } from "@/components/data-sources/ConnectionModal";
import { User, CreditCard, Database, Bell, Trash2, Save, Edit, Globe, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { getDataSources } from '@/services/mockData';
import { DataSource } from '@/types/core';

const Settings = () => {
  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Sarah',
    lastName: 'Mitchell',
    email: 'sarah.mitchell@citycouncil.gov',
    phone: '(555) 123-4567',
    zipCode: '90210'
  });
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);

  // Data Sources State
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState({
    newIssues: true,
    weeklySummaries: true,
    pollResults: false,
    systemUpdates: true
  });

  // Load data on component mount
  useEffect(() => {
    // Load personal info from localStorage
    const savedPersonalInfo = localStorage.getItem('personalInfo');
    if (savedPersonalInfo) {
      setPersonalInfo(JSON.parse(savedPersonalInfo));
    }

    // Load notification preferences from localStorage
    const savedNotifications = localStorage.getItem('notificationPreferences');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    // Load data sources
    getDataSources().then(setDataSources);
  }, []);

  // Personal Information Handlers
  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const savePersonalInfo = () => {
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
    setIsEditingPersonal(false);
  };
  const cancelPersonalEdit = () => {
    const savedPersonalInfo = localStorage.getItem('personalInfo');
    if (savedPersonalInfo) {
      setPersonalInfo(JSON.parse(savedPersonalInfo));
    } else {
      setPersonalInfo({
        firstName: 'Sarah',
        lastName: 'Mitchell',
        email: 'sarah.mitchell@citycouncil.gov',
        phone: '(555) 123-4567',
        zipCode: '90210'
      });
    }
    setIsEditingPersonal(false);
  };

  // Data Sources Handlers
  const handleConnect = (id: string) => {
    const source = dataSources.find(ds => ds.id === id);
    if (source) {
      setSelectedSource(source);
      setIsModalOpen(true);
    }
  };
  const handleConnectionComplete = (id: string) => {
    setDataSources(prev => prev.map(ds => ds.id === id ? {
      ...ds,
      connected: true,
      status: 'connected' as const,
      issuesGenerated: 3,
      lastSync: 'just now'
    } : ds));
    setIsModalOpen(false);
    setSelectedSource(null);
  };

  // Notifications Handlers
  const handleNotificationChange = (key: string, value: boolean) => {
    const newNotifications = {
      ...notifications,
      [key]: value
    };
    setNotifications(newNotifications);
    localStorage.setItem('notificationPreferences', JSON.stringify(newNotifications));
  };
  const connectedCount = dataSources.filter(ds => ds.connected).length;
  const getSourceIcon = (type: DataSource['type']) => {
    switch (type) {
      case 'website':
        return Globe;
      case 'email':
        return Mail;
      case 'facebook':
        return MessageSquare;
      case 'crm':
        return Database;
      default:
        return Globe;
    }
  };
  const getSourceDescription = (type: DataSource['type']) => {
    switch (type) {
      case 'website':
        return "Automatically processes contact form submissions from your campaign website";
      case 'email':
        return "Monitor and analyze constituent emails for common issues and concerns";
      case 'facebook':
        return "Track mentions and discussions in community Facebook groups";
      case 'crm':
        return "Connect your existing CRM system to import contact data and track constituent interactions";
      default:
        return "Connect to monitor constituent feedback";
    }
  };

  const notificationItems = [
    {
      key: 'newIssues',
      title: 'New Issues',
      description: 'Get notified when new constituent issues are detected',
      checked: notifications.newIssues
    },
    {
      key: 'weeklySummaries', 
      title: 'Weekly Summaries',
      description: 'Receive weekly summary reports of constituent activity',
      checked: notifications.weeklySummaries
    },
    {
      key: 'pollResults',
      title: 'Poll Results', 
      description: 'Get notified when polls receive new responses',
      checked: notifications.pollResults
    },
    {
      key: 'systemUpdates',
      title: 'System Updates',
      description: 'Receive notifications about platform updates and maintenance', 
      checked: notifications.systemUpdates
    }
  ];

  return <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Personal Information Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2">
              
              <CardTitle>Personal Information</CardTitle>
            </div>
            {!isEditingPersonal ? <Button variant="outline" size="sm" onClick={() => setIsEditingPersonal(true)} className="hidden sm:flex">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button> : <div className="hidden sm:flex space-x-2">
                <Button variant="outline" size="sm" onClick={cancelPersonalEdit}>
                  Cancel
                </Button>
                <Button size="sm" onClick={savePersonalInfo}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={personalInfo.firstName} onChange={e => handlePersonalInfoChange('firstName', e.target.value)} disabled={!isEditingPersonal} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={personalInfo.lastName} onChange={e => handlePersonalInfoChange('lastName', e.target.value)} disabled={!isEditingPersonal} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={personalInfo.email} onChange={e => handlePersonalInfoChange('email', e.target.value)} disabled={!isEditingPersonal} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={personalInfo.phone} onChange={e => handlePersonalInfoChange('phone', e.target.value)} disabled={!isEditingPersonal} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input id="zipCode" value={personalInfo.zipCode} onChange={e => handlePersonalInfoChange('zipCode', e.target.value)} disabled={!isEditingPersonal} />
            </div>
          </div>
          
          {/* Mobile buttons */}
          <div className="flex sm:hidden justify-end">
            {!isEditingPersonal ? <Button variant="outline" size="sm" onClick={() => setIsEditingPersonal(true)} className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button> : <div className="flex space-x-2 w-full">
                <Button variant="outline" size="sm" onClick={cancelPersonalEdit} className="flex-1">
                  Cancel
                </Button>
                <Button size="sm" onClick={savePersonalInfo} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>}
          </div>
        </CardContent>
      </Card>

      {/* Account Details Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            
            <CardTitle>Account Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Current Plan</h4>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Basic Plan</p>
                  <p className="text-sm text-muted-foreground">Access to core features</p>
                </div>
                <Button variant="outline">Upgrade Plan</Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Password</h4>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 border rounded-lg">
                <div>
                  <p className="text-sm">Password last updated 3 months ago</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            
            <CardTitle>Data Sources</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {dataSources.map((dataSource, index) => {
            const IconComponent = getSourceIcon(dataSource.type);
            const isLast = index === dataSources.length - 1;
            return <div key={dataSource.id} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 ${!isLast ? 'border-b border-border' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">{dataSource.name}</h4>
                        {dataSource.connected && <div className="flex items-center space-x-1">
                            
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                              Connected
                            </Badge>
                          </div>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {getSourceDescription(dataSource.type)}
                      </p>
                      {dataSource.connected && dataSource.issuesGenerated && <p className="text-xs text-green-700 mt-1">
                          {dataSource.issuesGenerated} issues generated • Last sync: {dataSource.lastSync}
                        </p>}
                    </div>
                  </div>
                  <div className="w-full sm:w-auto">
                    {dataSource.connected ? <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Disconnect
                      </Button> : <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => handleConnect(dataSource.id)}>
                        Connect
                      </Button>}
                  </div>
                </div>;
          })}
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            
            <CardTitle>Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {notificationItems.map((item, index) => {
              const isLast = index === notificationItems.length - 1;
              return (
                <div key={item.key} className={`flex items-center justify-between gap-2 sm:gap-4 py-6 ${!isLast ? 'border-b border-border' : ''}`}>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch 
                    checked={item.checked} 
                    onCheckedChange={checked => handleNotificationChange(item.key, checked)} 
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Delete Account Section */}
      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-medium text-foreground mb-2">
                Permanently delete your account and all of its content.
              </p>
              <p className="text-sm text-muted-foreground">
                This action is not reversible - proceed with caution
              </p>
            </div>
            <Button variant="destructive">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Connection Modal */}
      <ConnectionModal isOpen={isModalOpen} onClose={() => {
      setIsModalOpen(false);
      setSelectedSource(null);
    }} dataSource={selectedSource} onConnectionComplete={handleConnectionComplete} />
    </div>;
};

export default Settings;
