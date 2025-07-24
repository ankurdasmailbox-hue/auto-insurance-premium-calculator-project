import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, Plus } from 'lucide-react';

const planTypes = [
  { id: 'third-party', name: 'Third Party Only', description: 'Basic legal coverage', basePrice: 2500 },
  { id: 'comprehensive', name: 'Comprehensive', description: 'Complete protection', basePrice: 8500 },
  { id: 'zero-dep', name: 'Zero Depreciation', description: 'No depreciation claims', basePrice: 12000 }
];

const addOns = [
  { id: 'roadside-assistance', name: 'Roadside Assistance', price: 500 },
  { id: 'engine-protection', name: 'Engine Protection Cover', price: 2000 },
  { id: 'consumables', name: 'Consumables Cover', price: 1500 },
  { id: 'key-replacement', name: 'Key Replacement Cover', price: 800 },
  { id: 'tyre-protection', name: 'Tyre & Rim Protection', price: 1200 },
  { id: 'passenger-cover', name: 'Personal Accident Cover', price: 300 },
  { id: 'return-to-invoice', name: 'Return to Invoice', price: 3000 }
];

const voluntaryDeductibles = [
  { value: 0, label: 'No Deductible', discount: 0 },
  { value: 2500, label: '₹2,500', discount: 15 },
  { value: 5000, label: '₹5,000', discount: 20 },
  { value: 7500, label: '₹7,500', discount: 25 },
  { value: 15000, label: '₹15,000', discount: 30 }
];

interface CoverageFormProps {
  data: {
    planType: string;
    idv: number;
    voluntaryDeductible: number;
    addOns: string[];
  };
  vehicleData: {
    make: string;
    model: string;
    year: number;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const CoverageForm: React.FC<CoverageFormProps> = ({ data, vehicleData, onUpdate, onNext, onPrev }) => {
  // Calculate estimated IDV based on vehicle details
  React.useEffect(() => {
    if (vehicleData.year && !data.idv) {
      const currentYear = new Date().getFullYear();
      const vehicleAge = currentYear - vehicleData.year;
      const estimatedIDV = Math.max(100000, 800000 - (vehicleAge * 50000)); // Basic estimation
      onUpdate({ ...data, idv: estimatedIDV });
    }
  }, [vehicleData.year]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.planType && data.idv > 0) {
      onNext();
    }
  };

  const handleAddOnToggle = (addOnId: string) => {
    const updatedAddOns = data.addOns.includes(addOnId)
      ? data.addOns.filter(id => id !== addOnId)
      : [...data.addOns, addOnId];
    onUpdate({ ...data, addOns: updatedAddOns });
  };

  const selectedPlan = planTypes.find(plan => plan.id === data.planType);
  const isValid = data.planType && data.idv > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Plan Selection */}
      <Card className="p-6 bg-gradient-to-br from-card to-muted/30">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Choose Your Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {planTypes.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  data.planType === plan.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onUpdate({ ...data, planType: plan.id })}
              >
                <div className="text-center">
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                  <Badge variant="secondary">From ₹{plan.basePrice.toLocaleString()}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IDV and Deductible */}
      <Card className="p-6">
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idv">Insured Declared Value (IDV) *</Label>
              <Input
                id="idv"
                type="number"
                placeholder="Enter IDV amount"
                value={data.idv}
                onChange={(e) => onUpdate({ ...data, idv: parseInt(e.target.value) || 0 })}
              />
              <p className="text-sm text-muted-foreground">
                Current market value of your {vehicleData.make} {vehicleData.model}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deductible">Voluntary Deductible</Label>
              <Select 
                value={data.voluntaryDeductible.toString()} 
                onValueChange={(value) => onUpdate({ ...data, voluntaryDeductible: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose deductible" />
                </SelectTrigger>
                <SelectContent>
                  {voluntaryDeductibles.map((deductible) => (
                    <SelectItem key={deductible.value} value={deductible.value.toString()}>
                      {deductible.label} {deductible.discount > 0 && `(${deductible.discount}% discount)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add-ons */}
      {data.planType === 'comprehensive' || data.planType === 'zero-dep' ? (
        <Card className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add-On Covers (Optional)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addOns.map((addOn) => (
                <div key={addOn.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                  <Checkbox
                    id={addOn.id}
                    checked={data.addOns.includes(addOn.id)}
                    onCheckedChange={() => handleAddOnToggle(addOn.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={addOn.id} className="cursor-pointer">
                      {addOn.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      +₹{addOn.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

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
          Continue to Credit Info
        </Button>
      </div>
    </form>
  );
};