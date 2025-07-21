
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Mail, MessageSquare, Phone } from 'lucide-react';
import { DataSource } from '@/types/core';

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataSource: DataSource | null;
  onConnectionComplete: (id: string) => void;
}

export const ConnectionModal: React.FC<ConnectionModalProps> = ({
  isOpen,
  onClose,
  dataSource,
  onConnectionComplete
}) => {
  const [step, setStep] = useState<'setup' | 'connecting' | 'success'>('setup');
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    facebookGroups: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (step === 'connecting') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setStep('success');
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleConnect = () => {
    setStep('connecting');
    setProgress(0);
  };

  const handleComplete = () => {
    if (dataSource) {
      onConnectionComplete(dataSource.id);
    }
    onClose();
    setStep('setup');
    setProgress(0);
  };

  const handleClose = () => {
    onClose();
    setStep('setup');
    setProgress(0);
  };

  if (!dataSource) return null;

  const getIcon = () => {
    switch (dataSource.type) {
      case 'email':
        return <Mail className="h-8 w-8 text-blue-600" />;
      case 'facebook':
        return <MessageSquare className="h-8 w-8 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            {getIcon()}
            <div>
              <DialogTitle>Connect {dataSource.name}</DialogTitle>
              <DialogDescription>
                Set up your {dataSource.type} integration to start monitoring constituent feedback
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {step === 'setup' && (
          <div className="space-y-4">
            {dataSource.type === 'email' && (
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  We'll monitor this email for constituent messages and feedback
                </p>
              </div>
            )}

            {dataSource.type === 'facebook' && (
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook Group URLs</Label>
                <Input
                  id="facebook"
                  placeholder="https://facebook.com/groups/community-name"
                  value={formData.facebookGroups}
                  onChange={(e) => setFormData(prev => ({ ...prev, facebookGroups: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Enter public group URLs to monitor community discussions
                </p>
              </div>
            )}


            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm">
                Your data will be analyzed to identify common issues and concerns, helping you better serve your constituents.
              </p>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleConnect} className="flex-1">
                Connect & Analyze
              </Button>
            </div>
          </div>
        )}

        {step === 'connecting' && (
          <div className="space-y-4 py-6">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold">Connecting...</h3>
              <p className="text-muted-foreground">Analyzing your data and setting up monitoring</p>
            </div>
            
            <Progress value={progress} className="w-full" />
            
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-center">
                {progress < 30 && "Establishing connection..."}
                {progress >= 30 && progress < 60 && "Processing historical data..."}
                {progress >= 60 && progress < 90 && "Identifying common issues..."}
                {progress >= 90 && "Finalizing setup..."}
              </p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-4 py-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Successfully Connected!</h3>
              <p className="text-muted-foreground">
                {dataSource.name} is now monitoring constituent feedback
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 text-sm">
                We've found <strong>3 new issues</strong> from your {dataSource.type} data. 
                Check your dashboard to see the insights.
              </p>
            </div>

            <Button onClick={handleComplete} className="w-full">
              View Dashboard
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
