import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Share2, CheckCircle, Car, User, MapPin, Shield, CreditCard, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { FormData } from './InsuranceRatingTool';

interface QuoteResultsProps {
  formData: FormData;
  onPrev: () => void;
  onRestart: () => void;
}

export const QuoteResults: React.FC<QuoteResultsProps> = ({ formData, onPrev, onRestart }) => {
  // Insurance calculation logic
  const calculatePremium = () => {
    const basePremium = getBasePremium();
    const locationFactor = getLocationFactor();
    const ageFactor = getAgeFactor();
    const experienceFactor = getExperienceFactor();
    const creditFactor = getCreditFactor();
    const vehicleFactor = getVehicleFactor();
    const deductibleDiscount = getDeductibleDiscount();
    const addOnsCost = getAddOnsCost();
    const verificationDiscount = getVerificationDiscount();

    const adjustedPremium = basePremium * locationFactor * ageFactor * experienceFactor * creditFactor * vehicleFactor;
    const finalPremium = (adjustedPremium - deductibleDiscount + addOnsCost) * (1 - verificationDiscount);

    return Math.round(finalPremium);
  };

  const getBasePremium = () => {
    const planPrices = {
      'third-party': 2500,
      'comprehensive': 8500,
      'zero-dep': 12000
    };
    return planPrices[formData.coverage.planType as keyof typeof planPrices] || 8500;
  };

  const getLocationFactor = () => {
    const highRiskStates = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'];
    return highRiskStates.includes(formData.location.city) ? 1.2 : 1.0;
  };

  const getAgeFactor = () => {
    if (formData.driver.age < 25) return 1.3;
    if (formData.driver.age < 35) return 1.0;
    if (formData.driver.age < 50) return 0.9;
    return 1.1;
  };

  const getExperienceFactor = () => {
    if (formData.driver.experience < 2) return 1.2;
    if (formData.driver.experience < 5) return 1.0;
    return 0.85;
  };

  const getCreditFactor = () => {
    if (formData.credit.creditScore >= 800) return 0.85;
    if (formData.credit.creditScore >= 750) return 0.9;
    if (formData.credit.creditScore >= 700) return 0.95;
    if (formData.credit.creditScore >= 650) return 1.0;
    return 1.1;
  };

  const getVehicleFactor = () => {
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - formData.vehicle.year;
    if (vehicleAge < 2) return 1.1;
    if (vehicleAge < 5) return 1.0;
    return 0.9;
  };

  const getDeductibleDiscount = () => {
    const discountMap = { 0: 0, 2500: 0.15, 5000: 0.2, 7500: 0.25, 15000: 0.3 };
    return getBasePremium() * (discountMap[formData.coverage.voluntaryDeductible as keyof typeof discountMap] || 0);
  };

  const getAddOnsCost = () => {
    const addOnPrices = {
      'roadside-assistance': 500,
      'engine-protection': 2000,
      'consumables': 1500,
      'key-replacement': 800,
      'tyre-protection': 1200,
      'passenger-cover': 300,
      'return-to-invoice': 3000
    };
    return formData.coverage.addOns.reduce((total, addOn) => 
      total + (addOnPrices[addOn as keyof typeof addOnPrices] || 0), 0);
  };

  const getVerificationDiscount = () => {
    return (formData.credit.panVerified && formData.credit.aadharVerified) ? 0.05 : 0;
  };

  // Market comparison data
  const getMarketComparison = () => {
    const basePremium = getBasePremium();
    const marketData = [
      { company: 'ICICI Lombard', premium: Math.round(basePremium * 1.15) },
      { company: 'HDFC ERGO', premium: Math.round(basePremium * 1.08) },
      { company: 'Bajaj Allianz', premium: Math.round(basePremium * 1.12) },
      { company: 'TATA AIG', premium: Math.round(basePremium * 1.06) },
      { company: 'New India Insurance', premium: Math.round(basePremium * 1.18) },
      { company: 'Oriental Insurance', premium: Math.round(basePremium * 1.10) }
    ];

    const avgMarketPremium = Math.round(
      marketData.reduce((sum, item) => sum + item.premium, 0) / marketData.length
    );

    const ourPremium = finalPremium;
    const savings = avgMarketPremium - ourPremium;
    const savingsPercentage = Math.round((savings / avgMarketPremium) * 100);

    return {
      marketData,
      avgMarketPremium,
      savings,
      savingsPercentage,
      isLower: ourPremium < avgMarketPremium
    };
  };

  const finalPremium = calculatePremium();
  const gst = Math.round(finalPremium * 0.18);
  const totalAmount = finalPremium + gst;
  const comparison = getMarketComparison();

  return (
    <div className="space-y-6">
      {/* Quote Summary */}
      <Card className="p-6 bg-gradient-to-br from-success-green/10 to-primary/10 border-success-green/20">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="flex items-center space-x-2 text-success-green">
            <CheckCircle className="h-6 w-6" />
            <span>Your Insurance Quote is Ready!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">₹{totalAmount.toLocaleString()}</div>
            <div className="text-lg text-muted-foreground">Total Premium (Including GST)</div>
            <div className="flex justify-center space-x-4 text-sm">
              <span>Base Premium: ₹{finalPremium.toLocaleString()}</span>
              <span>GST (18%): ₹{gst.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Comparison */}
      <Card className="p-6 bg-gradient-to-br from-background to-muted/30">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="flex items-center space-x-2">
            {comparison.isLower ? (
              <TrendingDown className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingUp className="h-5 w-5 text-orange-500" />
            )}
            <span>Market Comparison</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          {comparison.isLower ? (
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-green-800 dark:text-green-200">
                    🎉 You're saving ₹{comparison.savings.toLocaleString()}!
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-300">
                    {comparison.savingsPercentage}% lower than market average
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                    ₹{finalPremium.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Our Premium</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-orange-800 dark:text-orange-200">
                    Premium above market average
                  </div>
                  <div className="text-sm text-orange-600 dark:text-orange-300">
                    {Math.abs(comparison.savingsPercentage)}% higher than average
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    ₹{finalPremium.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Our Premium</div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="text-sm font-medium text-muted-foreground">
              Market Average: ₹{comparison.avgMarketPremium.toLocaleString()}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {comparison.marketData.map((competitor) => (
                <div 
                  key={competitor.company}
                  className="bg-card border rounded-lg p-3 text-sm"
                >
                  <div className="font-medium text-xs text-muted-foreground mb-1">
                    {competitor.company}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">₹{competitor.premium.toLocaleString()}</span>
                    {competitor.premium > finalPremium ? (
                      <TrendingUp className="h-3 w-3 text-red-500" />
                    ) : competitor.premium < finalPremium ? (
                      <TrendingDown className="h-3 w-3 text-green-500" />
                    ) : (
                      <Minus className="h-3 w-3 text-gray-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            * Comparison based on similar coverage and profile. Actual premiums may vary.
          </div>
        </CardContent>
      </Card>

      {/* Coverage Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vehicle & Driver Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Car className="h-5 w-5" />
              <span>Coverage Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-medium">Vehicle</div>
              <div className="text-sm text-muted-foreground">
                {formData.vehicle.year} {formData.vehicle.make} {formData.vehicle.model}
              </div>
              <div className="text-sm text-muted-foreground">
                {formData.vehicle.registrationNumber}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="font-medium">Plan Type</div>
              <Badge variant="secondary" className="mt-1">
                {formData.coverage.planType.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
            
            <div>
              <div className="font-medium">IDV Amount</div>
              <div className="text-lg">₹{formData.coverage.idv.toLocaleString()}</div>
            </div>

            {formData.coverage.voluntaryDeductible > 0 && (
              <div>
                <div className="font-medium">Voluntary Deductible</div>
                <div className="text-sm">₹{formData.coverage.voluntaryDeductible.toLocaleString()}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Policy Holder Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Policy Holder</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-medium">Name</div>
              <div className="text-sm text-muted-foreground">{formData.driver.name}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium">Age</div>
                <div className="text-sm text-muted-foreground">{formData.driver.age} years</div>
              </div>
              <div>
                <div className="font-medium">Experience</div>
                <div className="text-sm text-muted-foreground">{formData.driver.experience} years</div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="font-medium flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Location</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {formData.location.city}, {formData.location.state} - {formData.location.pincode}
              </div>
            </div>

            <div>
              <div className="font-medium flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Credit Score</span>
              </div>
              <div className="text-sm text-muted-foreground">{formData.credit.creditScore}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add-ons */}
      {formData.coverage.addOns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Selected Add-ons</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {formData.coverage.addOns.map((addOn) => (
                <Badge key={addOn} variant="outline" className="justify-start">
                  {addOn.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button type="button" variant="outline" onClick={onPrev} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Quote</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Share2 className="h-4 w-4" />
            <span>Share Quote</span>
          </Button>
          <Button 
            onClick={onRestart}
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
          >
            Get New Quote
          </Button>
        </div>
      </div>
    </div>
  );
};