import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const occupations = [
  'Salaried Employee', 'Business Owner', 'Professional', 'Government Employee', 
  'Retired', 'Student', 'Homemaker', 'Self-Employed', 'Doctor', 'Engineer', 
  'Teacher', 'Lawyer', 'Consultant', 'Other'
];

interface DriverFormProps {
  data: {
    name: string;
    age: number;
    experience: number;
    gender: string;
    maritalStatus: string;
    occupation: string;
    previousClaims: number;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const DriverForm: React.FC<DriverFormProps> = ({ data, onUpdate, onNext, onPrev }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.name && data.age && data.experience && data.gender && data.maritalStatus && data.occupation) {
      onNext();
    }
  };

  const isValid = data.name && data.age >= 18 && data.experience >= 0 && data.gender && data.maritalStatus && data.occupation;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-card to-muted/30">
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={data.name}
                onChange={(e) => onUpdate({ ...data, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                min="18"
                max="100"
                value={data.age}
                onChange={(e) => onUpdate({ ...data, age: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={data.gender} onValueChange={(gender) => onUpdate({ ...data, gender })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Marital Status *</Label>
              <Select value={data.maritalStatus} onValueChange={(maritalStatus) => onUpdate({ ...data, maritalStatus })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Driving Experience (Years) *</Label>
              <Input
                id="experience"
                type="number"
                placeholder="Years of driving experience"
                min="0"
                max="50"
                value={data.experience}
                onChange={(e) => onUpdate({ ...data, experience: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousClaims">Previous Claims (Last 5 years)</Label>
              <Input
                id="previousClaims"
                type="number"
                placeholder="Number of claims"
                min="0"
                max="20"
                value={data.previousClaims}
                onChange={(e) => onUpdate({ ...data, previousClaims: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation *</Label>
            <Select value={data.occupation} onValueChange={(occupation) => onUpdate({ ...data, occupation })}>
              <SelectTrigger>
                <SelectValue placeholder="Select your occupation" />
              </SelectTrigger>
              <SelectContent>
                {occupations.map((occupation) => (
                  <SelectItem key={occupation} value={occupation}>
                    {occupation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        <Button 
          type="submit" 
          disabled={!isValid}
          className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
        >
          Continue to Coverage
        </Button>
      </div>
    </form>
  );
};