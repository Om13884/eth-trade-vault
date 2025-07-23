import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InvestmentCalculatorProps {
  ethPrice: number | null;
  walletBalance: string;
}

const InvestmentCalculator = ({ ethPrice, walletBalance }: InvestmentCalculatorProps) => {
  const [usdAmount, setUsdAmount] = useState('');
  const [ethAmount, setEthAmount] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (usdAmount && ethPrice) {
      const calculatedEth = parseFloat(usdAmount) / ethPrice;
      setEthAmount(calculatedEth.toFixed(8));
    } else {
      setEthAmount('');
    }
  }, [usdAmount, ethPrice]);

  const handleUsdChange = (value: string) => {
    // Only allow numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setUsdAmount(value);
    }
  };

  const handleQuickAmount = (amount: number) => {
    setUsdAmount(amount.toString());
  };

  const simulateInvestment = async () => {
    if (!usdAmount || !ethAmount) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid USD amount.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Investment Calculated!",
        description: `You can buy ${ethAmount} ETH for $${usdAmount}`,
      });
      setIsCalculating(false);
    }, 1000);
  };

  const formatBalance = (balance: string) => {
    return parseFloat(balance).toFixed(6);
  };

  const balanceInUsd = walletBalance && ethPrice 
    ? (parseFloat(walletBalance) * ethPrice).toFixed(2)
    : '0.00';

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-accent" />
          Investment Calculator
        </CardTitle>
        <CardDescription>Calculate how much ETH you can buy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {walletBalance && (
          <div className="p-4 rounded-lg bg-muted/50 border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Balance</span>
              <div className="text-right">
                <p className="font-semibold">{formatBalance(walletBalance)} ETH</p>
                <p className="text-sm text-muted-foreground">${balanceInUsd}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="usd-amount">USD Amount</Label>
          <Input
            id="usd-amount"
            type="text"
            placeholder="Enter USD amount"
            value={usdAmount}
            onChange={(e) => handleUsdChange(e.target.value)}
            className="text-lg"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[100, 500, 1000, 5000].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAmount(amount)}
              className="hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              ${amount}
            </Button>
          ))}
        </div>

        {ethPrice && usdAmount && (
          <div className="p-4 rounded-lg bg-gradient-accent/10 border border-accent/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">You will receive</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent">{ethAmount} ETH</p>
                <p className="text-sm text-muted-foreground">
                  at ${ethPrice.toFixed(2)} per ETH
                </p>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={simulateInvestment}
          disabled={!usdAmount || !ethPrice || isCalculating}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          {isCalculating ? (
            <>
              <Zap className="mr-2 h-4 w-4 animate-pulse" />
              Calculating...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Investment
            </>
          )}
        </Button>

        {!ethPrice && (
          <p className="text-sm text-muted-foreground text-center">
            Waiting for ETH price data...
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestmentCalculator;