import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const vehicleMakes = [
  'Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota', 'Ford', 
  'Chevrolet', 'Volkswagen', 'Skoda', 'Nissan', 'Renault', 'BMW', 'Mercedes-Benz', 
  'Audi', 'Jaguar', 'Land Rover', 'Volvo', 'Kia', 'MG Motor'
];

const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'LPG', 'Electric', 'Hybrid'];
const vehicleTypes = ['Hatchback', 'Sedan', 'SUV', 'MUV', 'Coupe', 'Convertible', 'Pickup Truck'];

interface VehicleFormProps {
  data: {
    registrationNumber: string;
    make: string;
    model: string;
    year: number;
    fuelType: string;
    vehicleType: string;
    engineCapacity: string;
    rtoCode: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({ data, onUpdate, onNext, onPrev }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.registrationNumber && data.make && data.model && data.year && data.fuelType && data.vehicleType) {
      onNext();
    }
  };

  const isValid = data.registrationNumber && data.make && data.model && data.year && data.fuelType && data.vehicleType;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-card to-muted/30">
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number *</Label>
              <Input
                id="registrationNumber"
                type="text"
                placeholder="e.g., MH12AB1234"
                value={data.registrationNumber}
                onChange={(e) => onUpdate({ ...data, registrationNumber: e.target.value.toUpperCase() })}
                className="uppercase"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rtoCode">RTO Code</Label>
              <Input
                id="rtoCode"
                type="text"
                placeholder="e.g., MH12"
                value={data.rtoCode}
                onChange={(e) => onUpdate({ ...data, rtoCode: e.target.value.toUpperCase() })}
                className="uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Vehicle Make *</Label>
              <Select value={data.make} onValueChange={(make) => onUpdate({ ...data, make })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle make" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleMakes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                type="text"
                placeholder="e.g., Swift, City, Creta"
                value={data.model}
                onChange={(e) => onUpdate({ ...data, model: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Manufacturing Year *</Label>
              <Select value={data.year.toString()} onValueChange={(year) => onUpdate({ ...data, year: parseInt(year) })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelType">Fuel Type *</Label>
              <Select value={data.fuelType} onValueChange={(fuelType) => onUpdate({ ...data, fuelType })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((fuel) => (
                    <SelectItem key={fuel} value={fuel}>
                      {fuel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type *</Label>
              <Select value={data.vehicleType} onValueChange={(vehicleType) => onUpdate({ ...data, vehicleType })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="engineCapacity">Engine Capacity (CC)</Label>
            <Input
              id="engineCapacity"
              type="text"
              placeholder="e.g., 1200, 1500"
              value={data.engineCapacity}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                onUpdate({ ...data, engineCapacity: value });
              }}
              className="max-w-xs"
            />
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
          Continue to Driver Details
        </Button>
      </div>
    </form>
  );
};