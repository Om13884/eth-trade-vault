import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';

interface PortfolioProps {
  connectedWallet: { address: string; balance: string } | null;
  ethPrice: number | null;
}

const Portfolio = ({ connectedWallet, ethPrice }: PortfolioProps) => {
  // Mock portfolio data
  const holdings = [
    { 
      symbol: 'ETH', 
      name: 'Ethereum', 
      amount: connectedWallet ? parseFloat(connectedWallet.balance) : 0,
      value: connectedWallet && ethPrice ? parseFloat(connectedWallet.balance) * ethPrice : 0,
      change: -1.23,
      allocation: 45
    },
    { 
      symbol: 'BTC', 
      name: 'Bitcoin', 
      amount: 0.025, 
      value: 1081.27, 
      change: 2.45,
      allocation: 35
    },
    { 
      symbol: 'ADA', 
      name: 'Cardano', 
      amount: 1250, 
      value: 612.5, 
      change: 3.67,
      allocation: 12
    },
    { 
      symbol: 'SOL', 
      name: 'Solana', 
      amount: 2.5, 
      value: 239.45, 
      change: 5.23,
      allocation: 8
    }
  ];

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalPnL = totalValue * 0.1097; // Mock 10.97% gain
  const isPositivePnL = totalPnL >= 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Portfolio</h2>
        <p className="text-muted-foreground">Track your crypto investments</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {isPositivePnL ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <p className="text-2xl font-bold">
                {isPositivePnL ? '+' : ''}${Math.abs(totalPnL).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <Badge 
              variant={isPositivePnL ? "default" : "destructive"}
              className={isPositivePnL ? "bg-success text-success-foreground mt-2" : "mt-2"}
            >
              {isPositivePnL ? '+' : ''}{((totalPnL / (totalValue - totalPnL)) * 100).toFixed(2)}%
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{holdings.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Cryptocurrencies</p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="font-bold text-accent">{holding.symbol}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{holding.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {holding.amount.toFixed(holding.symbol === 'ADA' ? 0 : 6)} {holding.symbol}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${holding.value.toFixed(2)}</p>
                  <Badge 
                    variant={holding.change >= 0 ? "default" : "destructive"}
                    className={holding.change >= 0 ? "bg-success text-success-foreground" : ""}
                  >
                    {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Asset Allocation */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-accent" />
            Asset Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{holding.symbol}</span>
                  <span className="text-sm text-muted-foreground">{holding.allocation}%</span>
                </div>
                <Progress value={holding.allocation} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart Placeholder */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle>Performance Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive chart coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;