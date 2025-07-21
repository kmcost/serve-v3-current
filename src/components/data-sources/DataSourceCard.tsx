import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Globe, Mail, MessageSquare, Database } from 'lucide-react';
import { DataSource } from '@/types/core';

interface DataSourceCardProps {
  dataSource: DataSource;
  onConnect: (id: string) => void;
}

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

const getStatusBadge = (status: DataSource['status']) => {
  switch (status) {
    case 'connected':
      return <Badge className="bg-green-100 text-green-800 border-green-200">Connected</Badge>;
    case 'analyzing':
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Analyzing...</Badge>;
    case 'disconnected':
      return <Badge variant="outline">Not Connected</Badge>;
    case 'error':
      return <Badge variant="destructive">Error</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export const DataSourceCard: React.FC<DataSourceCardProps> = ({ dataSource, onConnect }) => {
  const IconComponent = getSourceIcon(dataSource.type);

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-muted rounded-lg">
              <IconComponent className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">{dataSource.name}</CardTitle>
              <div className="mt-1">
                {getStatusBadge(dataSource.status)}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {dataSource.type === 'website' && "Automatically processes contact form submissions from your campaign website"}
            {dataSource.type === 'email' && "Monitor and analyze constituent emails for common issues and concerns"}
            {dataSource.type === 'facebook' && "Track mentions and discussions in community Facebook groups"}
            {dataSource.type === 'crm' && "Connect your existing CRM system to import contact data and track constituent interactions"}
          </p>

          {dataSource.connected ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span>Connected and monitoring</span>
              </div>
              
              {dataSource.issuesGenerated && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-800 font-medium">{dataSource.issuesGenerated} issues generated</span>
                    {dataSource.lastSync && (
                      <span className="text-green-600">Last sync: {dataSource.lastSync}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : dataSource.status === 'analyzing' ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-blue-700">
                <Clock className="h-4 w-4 animate-spin" />
                <span>Analyzing your data...</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-sm">Processing historical data and setting up monitoring...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Button 
                onClick={() => onConnect(dataSource.id)}
                className="w-full"
                size="lg"
              >
                Connect {dataSource.name}
              </Button>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  {dataSource.type === 'website' && "Connect your website forms to automatically capture constituent feedback"}
                  {dataSource.type === 'email' && "Connect your email to analyze constituent concerns and generate insights"}
                  {dataSource.type === 'facebook' && "Monitor community discussions and track public sentiment"}
                  {dataSource.type === 'crm' && "Integrate with your CRM to centralize constituent management and issue tracking"}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
