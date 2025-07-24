import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, PieChart, Plus, Target, AlertTriangle, Download, Search, BarChart3 } from 'lucide-react';

interface PortfolioProps {
  connectedWallet: { address: string; balance: string } | null;
  ethPrice: number | null;
}

const Portfolio = ({ connectedWallet, ethPrice }: PortfolioProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [newAsset, setNewAsset] = useState({ symbol: '', amount: '' });

  // Mock portfolio data
  const [holdings, setHoldings] = useState([
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
  ]);

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalPnL = totalValue * 0.1097; // Mock 10.97% gain
  const isPositivePnL = totalPnL >= 0;

  // Risk analysis
  const portfolioRisk = (() => {
    const ethWeight = holdings.find(h => h.symbol === 'ETH')?.allocation || 0;
    if (ethWeight > 60) return { level: 'High', color: 'destructive', score: 85 };
    if (ethWeight > 40) return { level: 'Medium', color: 'warning', score: 65 };
    return { level: 'Low', color: 'success', score: 35 };
  })();

  // Performance metrics
  const metrics = {
    volatility: '24.3%',
    sharpeRatio: '1.42',
    maxDrawdown: '-12.8%',
    winRate: '68%'
  };

  const handleAddAsset = () => {
    if (newAsset.symbol && newAsset.amount) {
      const mockPrice = Math.random() * 100 + 10;
      const amount = parseFloat(newAsset.amount);
      const newHolding = {
        symbol: newAsset.symbol.toUpperCase(),
        name: newAsset.symbol,
        amount,
        value: amount * mockPrice,
        change: (Math.random() - 0.5) * 10,
        allocation: 5
      };
      setHoldings([...holdings, newHolding]);
      setNewAsset({ symbol: '', amount: '' });
      setShowAddAsset(false);
    }
  };

  const filteredHoldings = holdings.filter(holding =>
    holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holding.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Portfolio</h2>
          <p className="text-muted-foreground">Track your crypto investments</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showAddAsset} onOpenChange={setShowAddAsset}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Asset Symbol (e.g., BTC)"
                  value={newAsset.symbol}
                  onChange={(e) => setNewAsset({...newAsset, symbol: e.target.value})}
                />
                <Input
                  placeholder="Amount"
                  type="number"
                  value={newAsset.amount}
                  onChange={(e) => setNewAsset({...newAsset, amount: e.target.value})}
                />
                <Button onClick={handleAddAsset} className="w-full">Add Asset</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className={`h-4 w-4 ${portfolioRisk.level === 'High' ? 'text-destructive' : portfolioRisk.level === 'Medium' ? 'text-yellow-500' : 'text-success'}`} />
              <p className="text-2xl font-bold">{portfolioRisk.level}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Risk Score: {portfolioRisk.score}/100</p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Analytics */}
      <Tabs defaultValue="holdings" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="rebalance">Rebalance</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="mt-6">
          <Card className="bg-card border border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Holdings</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search assets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredHoldings.map((holding, index) => (
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
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volatility</span>
                  <span className="font-medium">{metrics.volatility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sharpe Ratio</span>
                  <span className="font-medium">{metrics.sharpeRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Drawdown</span>
                  <span className="font-medium text-destructive">{metrics.maxDrawdown}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Win Rate</span>
                  <span className="font-medium text-success">{metrics.winRate}</span>
                </div>
              </CardContent>
            </Card>

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
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card className="bg-card border border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Performance Chart</CardTitle>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1D">1D</SelectItem>
                    <SelectItem value="1W">1W</SelectItem>
                    <SelectItem value="1M">1M</SelectItem>
                    <SelectItem value="3M">3M</SelectItem>
                    <SelectItem value="1Y">1Y</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive chart for {selectedTimeframe} coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rebalance" className="mt-6">
          <Card className="bg-card border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                Portfolio Rebalancing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Recommended Actions</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">• Consider reducing ETH allocation from 45% to 35%</p>
                    <p className="text-muted-foreground">• Increase BTC allocation from 35% to 40%</p>
                    <p className="text-muted-foreground">• Add stablecoin allocation for risk management</p>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-3">Current Allocation</h4>
                    <div className="space-y-2">
                      {holdings.map((holding, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{holding.symbol}</span>
                          <span>{holding.allocation}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Target Allocation</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>ETH</span>
                        <span className="text-accent">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>BTC</span>
                        <span className="text-accent">40%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ADA</span>
                        <span className="text-accent">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>USDC</span>
                        <span className="text-accent">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Apply Rebalancing Strategy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;