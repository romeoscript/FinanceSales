import React from 'react';
import { Phone, Shield, Clock, AlertCircle, FileText, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Feature } from '../types';
import { FeatureCard } from '../components/FeatureCard';
import { StatusTracker } from '../components/StatusTracker';
import { ReportModal } from '../components/ReportModal';

// Emergency Modal Component
// Modified EmergencyModal Component
const EmergencyModal: React.FC = () => {
  const [description, setDescription] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError('Please describe the emergency situation');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5001/api/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit emergency report');
      }

      setSuccess(true);
      setDescription('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit emergency report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-red-600">
          Emergency Report
        </DialogTitle>
      </DialogHeader>
      <div className="p-4 space-y-4">
        <Alert className="bg-red-50 border-red-200">
          <AlertDescription className="text-red-800">
            This is for immediate emergency situations only. If you're in immediate danger, call 911 directly.
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Emergency report submitted successfully. Authorities have been notified.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <Textarea
            placeholder="Describe the emergency situation..."
            className="h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting || success}
          />
          <Button 
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            onClick={handleSubmit}
            disabled={isSubmitting || success}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Emergency Report'}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

const Homepage: React.FC = () => {
  const features: Feature[] = [
    {
      icon: Phone,
      title: 'Quick Reporting',
      description: 'Report incidents instantly through our mobile-friendly platform'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your information is protected with enterprise-grade security'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get immediate updates on your reported incidents'
    },
    {
      icon: AlertCircle,
      title: 'Emergency Alerts',
      description: 'Send immediate alerts to law enforcement in emergencies'
    },
    {
      icon: FileText,
      title: 'Digital Evidence',
      description: 'Upload photos and documents to support your report'
    },
    {
      icon: Users,
      title: 'Community Safety',
      description: 'Work together with law enforcement to keep communities safe'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px_16px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6">Report Crime in Real-Time</h1>
            <p className="text-xl mb-12 text-blue-100">
              Empowering citizens with secure and efficient crime reporting
            </p>
            <div className="flex gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    variant="destructive"
                    className="text-lg px-8 py-6 h-auto"
                  >
                    Emergency Report
                  </Button>
                </DialogTrigger>
                <EmergencyModal />
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 py-6 h-auto"
                  >
                    File Report
                  </Button>
                </DialogTrigger>
                <ReportModal />
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4">Key Features</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Our platform provides powerful tools to help keep your community safe and secure
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* Status Tracker Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4">Track Your Report</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Stay updated on the progress of your report through our transparent tracking system
          </p>
          <StatusTracker />
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">24/7 Support Available</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Our team is always ready to assist you with your reports. Get help anytime, anywhere.
          </p>
          <Button 
            size="lg"
            className="text-lg px-8 py-6 h-auto"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;