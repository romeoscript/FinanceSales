import React, { useState } from 'react';
import { Camera, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReportType } from '../types';

const reportTypes = [
  { type: 'theft', label: 'Theft', description: 'Report stolen property or burglary' },
  { type: 'vandalism', label: 'Vandalism', description: 'Report damage to property' },
  { type: 'assault', label: 'Assault', description: 'Report physical altercations' },
  { type: 'suspicious_activity', label: 'Suspicious Activity', description: 'Report unusual behavior' },
  { type: 'other', label: 'Other', description: 'Other types of incidents' }
];

export const ReportModal: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [reportType, setReportType] = useState<ReportType | null>(null);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');

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

      const { latitude, longitude } = position.coords;
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${'AIzaSyBQcXOQ98ZheEx_5BJ5R2_n_JhBtN-ScW8'}`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const result = data.results[0];
        setLocation(result.formatted_address);

        // Extract detailed components for additional display
        const addressComponents = result.address_components;
        const details = {
          street: '',
          area: '',
          city: '',
          state: '',
          landmark: ''
        };

        addressComponents.forEach((component: any) => {
          const type = component.types[0];
          if (type === 'route') details.street = component.long_name;
          if (type === 'sublocality_level_1') details.area = component.long_name;
          if (type === 'locality') details.city = component.long_name;
          if (type === 'administrative_area_level_1') details.state = component.long_name;
        });

        const detailedText = `${details.street}${details.area ? `, ${details.area}` : ''}${details.city ? `, ${details.city}` : ''}${details.state ? `, ${details.state}` : ''}`;
        setDetailedAddress(detailedText);
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
    const reportData = {
      type: reportType,
      description,
      location,
      detailedAddress,
      files,
      timestamp: new Date()
    };
    
    console.log('Submitting report:', reportData);
    // Add your API call here
  };

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
                setReportType(type);
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
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide detailed description of the incident..."
                className="h-32"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium">Location</label>
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
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
              >
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </DialogContent>
  );
};