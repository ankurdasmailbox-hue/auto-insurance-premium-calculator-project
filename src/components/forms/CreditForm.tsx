import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const creditScoreRanges = [
  { min: 800, max: 900, label: 'Excellent', color: 'success-green', discount: 15 },
  { min: 750, max: 799, label: 'Very Good', color: 'primary', discount: 10 },
  { min: 700, max: 749, label: 'Good', color: 'secondary', discount: 5 },
  { min: 650, max: 699, label: 'Fair', color: 'warning-orange', discount: 0 },
  { min: 300, max: 649, label: 'Poor', color: 'destructive', discount: -10 }
];

interface CreditFormProps {
  data: {
    creditScore: number;
    panVerified: boolean;
    aadharVerified: boolean;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const CreditForm: React.FC<CreditFormProps> = ({ data, onUpdate, onNext, onPrev }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const getCreditScoreInfo = (score: number) => {
    return creditScoreRanges.find(range => score >= range.min && score <= range.max) || creditScoreRanges[creditScoreRanges.length - 1];
  };

  const creditInfo = getCreditScoreInfo(data.creditScore);
  const verificationBonus = (data.panVerified && data.aadharVerified) ? 5 : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Credit Score Section */}
      <Card className="p-6 bg-gradient-to-br from-card to-muted/30">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Credit Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="space-y-2">
            <Label htmlFor="creditScore">Credit Score</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="creditScore"
                type="number"
                placeholder="Enter your credit score"
                min="300"
                max="900"
                value={data.creditScore}
                onChange={(e) => onUpdate({ ...data, creditScore: parseInt(e.target.value) || 0 })}
                className="max-w-xs"
              />
              <Badge 
                variant="outline" 
                className={`px-3 py-1 ${
                  creditInfo.label === 'Excellent' ? 'border-success-green text-success-green' :
                  creditInfo.label === 'Very Good' ? 'border-primary text-primary' :
                  creditInfo.label === 'Good' ? 'border-secondary text-secondary' :
                  creditInfo.label === 'Fair' ? 'border-warning-orange text-warning-orange' :
                  'border-destructive text-destructive'
                }`}
              >
                {creditInfo.label}
              </Badge>
            </div>
            
            {/* Credit Score Visualization */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>300</span>
                <span>Credit Score: {data.creditScore}</span>
                <span>900</span>
              </div>
              <Progress 
                value={((data.creditScore - 300) / 600) * 100} 
                className="h-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>

            {creditInfo.discount !== 0 && (
              <div className={`mt-2 p-3 rounded-lg ${
                creditInfo.discount > 0 ? 'bg-success-green/10 text-success-green' : 'bg-destructive/10 text-destructive'
              }`}>
                <p className="text-sm font-medium">
                  {creditInfo.discount > 0 ? '✓' : '⚠'} Credit Score Impact: 
                  {creditInfo.discount > 0 ? ` ${creditInfo.discount}% discount` : ` ${Math.abs(creditInfo.discount)}% surcharge`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Document Verification */}
      <Card className="p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle>Document Verification</CardTitle>
          <p className="text-sm text-muted-foreground">Verified documents can help reduce your premium</p>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 rounded-lg border">
              <Checkbox
                id="panVerified"
                checked={data.panVerified}
                onCheckedChange={(checked) => onUpdate({ ...data, panVerified: !!checked })}
              />
              <div className="flex-1">
                <Label htmlFor="panVerified" className="cursor-pointer flex items-center space-x-2">
                  <span>PAN Card Verified</span>
                  {data.panVerified ? (
                    <CheckCircle className="h-4 w-4 text-success-green" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                </Label>
                <p className="text-sm text-muted-foreground">
                  Identity verification through PAN
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg border">
              <Checkbox
                id="aadharVerified"
                checked={data.aadharVerified}
                onCheckedChange={(checked) => onUpdate({ ...data, aadharVerified: !!checked })}
              />
              <div className="flex-1">
                <Label htmlFor="aadharVerified" className="cursor-pointer flex items-center space-x-2">
                  <span>Aadhar Card Verified</span>
                  {data.aadharVerified ? (
                    <CheckCircle className="h-4 w-4 text-success-green" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                </Label>
                <p className="text-sm text-muted-foreground">
                  Address verification through Aadhar
                </p>
              </div>
            </div>
          </div>

          {verificationBonus > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-success-green/10 text-success-green">
              <p className="text-sm font-medium">
                ✓ Document Verification Bonus: {verificationBonus}% additional discount
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        <Button 
          type="submit"
          className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
        >
          Get Insurance Quote
        </Button>
      </div>
    </form>
  );
};