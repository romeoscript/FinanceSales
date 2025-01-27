import React, { useState } from 'react';
import { Camera, MapPin, Check } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReportType } from '../types';

const reportTypes = [
  { type: 'THEFT', label: 'Theft', description: 'Report stolen property or burglary' },
  { type: 'VANDALISM', label: 'Vandalism', description: 'Report damage to property' },
  { type: 'ASSAULT', label: 'Assault', description: 'Report physical altercations' },
  { type: 'SUSPICIOUS_ACTIVITY', label: 'Suspicious Activity', description: 'Report unusual behavior' },
  { type: 'OTHER', label: 'Other', description: 'Other types of incidents' }
];

export const ReportModal: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [reportType, setReportType] = useState<ReportType | null>(null);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<{
    trackingNumber: string;
    status: string;
    message: string;
  } | null>(null);

  const handleLocationAccess = async () => {
    setIsLoadingLocation(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude: lat, longitude: lng } = position.coords;
      setLatitude(lat);
      setLongitude(lng);
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${'AIzaSyBQcXOQ98ZheEx_5BJ5R2_n_JhBtN-ScW8'}`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const result = data.results[0];
        setLocation(result.formatted_address);
        setDetailedAddress(result.formatted_address);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Unable to get location. Please enter address manually.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!reportType || !description || !location || !latitude || !longitude) {
        alert('Please fill in all required fields');
        return;
      }

      const formData = new FormData();
      formData.append('type', reportType);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('latitude', latitude.toString());
      formData.append('longitude', longitude.toString());
      formData.append('detailedAddress', detailedAddress);

      // Append each file to the formData
      files.forEach((file) => {
        formData.append('evidence', file);
      });

      const response = await fetch('http://localhost:5001/api/reports', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit report');
      }

      setSubmitSuccess(true);
      setTrackingInfo({
        trackingNumber: data.data.trackingNumber,
        status: data.data.status,
        message: data.data.message
      });

    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess && trackingInfo) {
    return (
      <DialogContent className="sm:max-w-[600px]">
        <div className="p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-green-100 mx-auto flex items-center justify-center">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Report Submitted Successfully</h2>
          <div className="space-y-2">
            <p className="text-gray-600">Your tracking number is:</p>
            <p className="text-lg font-bold text-blue-600">{trackingInfo.trackingNumber}</p>
            <p className="text-sm text-gray-500">
              Status: {trackingInfo.status}
            </p>
          </div>
          <Alert>
            <AlertDescription>
              {trackingInfo.message}
              <br />
              Please save your tracking number for future reference.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          {step === 1 ? 'Select Incident Type' : 'Incident Details'}
        </DialogTitle>
      </DialogHeader>
      
      {step === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {reportTypes.map(({ type, label, description }) => (
            <button
              key={type}
              onClick={() => {
                setReportType(type as ReportType);
                setStep(2);
              }}
              className={`p-4 rounded-lg border-2 text-left hover:border-blue-500 transition-all
                ${reportType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              <h3 className="font-semibold mb-1">{label}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6 p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide detailed description of the incident..."
                className="h-32"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium">Location *</label>
                <Button
                  onClick={handleLocationAccess}
                  variant="outline"
                  size="sm"
                  disabled={isLoadingLocation}
                >
                  <MapPin className={`h-4 w-4 mr-2 ${isLoadingLocation ? 'animate-spin' : ''}`} />
                  Use My Location
                </Button>
              </div>

              <div className="space-y-2">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter the location of the incident"
                  className="w-full"
                  required
                />
                {detailedAddress && (
                  <p className="text-sm text-gray-600 mt-1">
                    Detailed Location: {detailedAddress}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Evidence (Optional)</label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept="image/*,video/*"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm text-gray-600">
                    {files.length > 0 
                      ? `${files.length} files selected` 
                      : 'Upload photos or videos'}
                  </p>
                </label>
              </div>
            </div>

            <Alert>
              <AlertDescription>
                Your report will be reviewed by law enforcement. You'll receive a tracking number for follow-up.
              </AlertDescription>
            </Alert>

            <div className="flex gap-3 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DialogContent>
  );
};