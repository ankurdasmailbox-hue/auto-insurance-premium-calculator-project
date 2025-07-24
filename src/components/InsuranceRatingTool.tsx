import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, Car, User, MapPin, CreditCard, FileText } from 'lucide-react';
import { LocationForm } from './forms/LocationForm';
import { VehicleForm } from './forms/VehicleForm';
import { DriverForm } from './forms/DriverForm';
import { CoverageForm } from './forms/CoverageForm';
import { CreditForm } from './forms/CreditForm';
import { QuoteResults } from './QuoteResults';

export interface FormData {
  location: {
    state: string;
    city: string;
    pincode: string;
  };
  vehicle: {
    registrationNumber: string;
    make: string;
    model: string;
    year: number;
    fuelType: string;
    vehicleType: string;
    engineCapacity: string;
    rtoCode: string;
  };
  driver: {
    name: string;
    age: number;
    experience: number;
    gender: string;
    maritalStatus: string;
    occupation: string;
    previousClaims: number;
  };
  coverage: {
    planType: string;
    idv: number;
    voluntaryDeductible: number;
    addOns: string[];
  };
  credit: {
    creditScore: number;
    panVerified: boolean;
    aadharVerified: boolean;
  };
}

const steps = [
  { id: 'location', title: 'Location Details', icon: MapPin },
  { id: 'vehicle', title: 'Vehicle Information', icon: Car },
  { id: 'driver', title: 'Driver Details', icon: User },
  { id: 'coverage', title: 'Coverage Selection', icon: Shield },
  { id: 'credit', title: 'Credit Information', icon: CreditCard },
  { id: 'results', title: 'Insurance Quote', icon: FileText },
];

export const InsuranceRatingTool: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    location: { state: '', city: '', pincode: '' },
    vehicle: { registrationNumber: '', make: '', model: '', year: 2024, fuelType: '', vehicleType: '', engineCapacity: '', rtoCode: '' },
    driver: { name: '', age: 25, experience: 1, gender: '', maritalStatus: '', occupation: '', previousClaims: 0 },
    coverage: { planType: '', idv: 0, voluntaryDeductible: 0, addOns: [] },
    credit: { creditScore: 750, panVerified: false, aadharVerified: false },
  });

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'location':
        return <LocationForm data={formData.location} onUpdate={(data) => updateFormData('location', data)} onNext={nextStep} />;
      case 'vehicle':
        return <VehicleForm data={formData.vehicle} onUpdate={(data) => updateFormData('vehicle', data)} onNext={nextStep} onPrev={prevStep} />;
      case 'driver':
        return <DriverForm data={formData.driver} onUpdate={(data) => updateFormData('driver', data)} onNext={nextStep} onPrev={prevStep} />;
      case 'coverage':
        return <CoverageForm data={formData.coverage} vehicleData={formData.vehicle} onUpdate={(data) => updateFormData('coverage', data)} onNext={nextStep} onPrev={prevStep} />;
      case 'credit':
        return <CreditForm data={formData.credit} onUpdate={(data) => updateFormData('credit', data)} onNext={nextStep} onPrev={prevStep} />;
      case 'results':
        return <QuoteResults formData={formData} onPrev={prevStep} onRestart={() => setCurrentStep(0)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Auto Insurance Rating Tool</h1>
            <p className="text-xl opacity-90">Get instant quotes for your vehicle insurance in India</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Section */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl">Get Your Quote</CardTitle>
              <Badge variant="outline" className="text-sm">
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between gap-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : isCompleted 
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {React.createElement(steps[currentStep].icon, { className: "h-5 w-5" })}
              <span>{steps[currentStep].title}</span>
            </CardTitle>
            <CardDescription>
              Please provide accurate information for the best quote calculation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};