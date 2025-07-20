
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataSourceCard } from "@/components/data-sources/DataSourceCard";
import { ConnectionModal } from "@/components/data-sources/ConnectionModal";
import { BarChart3, CheckCircle } from 'lucide-react';
import { getDataSources } from '@/services/mockData';
import { DataSource } from '@/types/core';

const DataSources = () => {
  const navigate = useNavigate();
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getDataSources().then(setDataSources);
  }, []);

  const handleConnect = (id: string) => {
    const source = dataSources.find(ds => ds.id === id);
    if (source) {
      setSelectedSource(source);
      setIsModalOpen(true);
    }
  };

  const handleConnectionComplete = (id: string) => {
    setDataSources(prev => prev.map(ds => 
      ds.id === id 
        ? { ...ds, connected: true, status: 'connected' as const, issuesGenerated: 3, lastSync: 'just now' }
        : ds
    ));
    setIsModalOpen(false);
    setSelectedSource(null);
  };

  const connectedCount = dataSources.filter(ds => ds.connected).length;
  const totalIssues = dataSources.reduce((sum, ds) => sum + (ds.issuesGenerated || 0), 0);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Connect Your Data Sources</h1>
        <p className="text-muted-foreground mt-1">
          Centralize constituent feedback from all your communication channels
        </p>
      </div>

      {/* Connection Status Summary */}
      {connectedCount > 0 && (
        <Card className="mb-8 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-green-800">
                    {connectedCount} of 4 sources connected
                  </h3>
                  <p className="text-sm sm:text-base text-green-700">
                    Monitoring {totalIssues} constituent issues across all channels
                  </p>
                </div>
              </div>
              <Button
                onClick={() => navigate('/')}
                className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                size="sm"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {dataSources.map((dataSource) => (
          <DataSourceCard
            key={dataSource.id}
            dataSource={dataSource}
            onConnect={handleConnect}
          />
        ))}
      </div>

      {/* Getting Started Section */}
      {connectedCount === 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-blue-700">
                Connect your first data source to start centralizing constituent feedback. 
                We recommend starting with your most active communication channel.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-1">Email Integration</h4>
                  <p className="text-blue-600">Best for ongoing constituent conversations</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-1">Facebook Groups</h4>
                  <p className="text-blue-600">Monitor community discussions and sentiment</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <ConnectionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSource(null);
        }}
        dataSource={selectedSource}
        onConnectionComplete={handleConnectionComplete}
      />
    </div>
  );
};

export default DataSources;
