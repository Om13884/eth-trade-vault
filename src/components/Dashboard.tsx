import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WalletConnect from '@/components/WalletConnect';
import MarketOverview from '@/components/MarketOverview';
import CryptocurrencyList from '@/components/CryptocurrencyList';
import InvestmentRecommendations from '@/components/InvestmentRecommendations';
import InvestmentCalculator from '@/components/InvestmentCalculator';
import Portfolio from '@/components/Portfolio';
import Markets from '@/components/Markets';

interface DashboardProps {
  connectedWallet: { address: string; balance: string } | null;
  onWalletConnected: (address: string, balance: string) => void;
  ethPrice: number | null;
}

const Dashboard = ({ connectedWallet, onWalletConnected, ethPrice }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    return num.toFixed(4);
  };

  const balanceInUsd = connectedWallet && ethPrice 
    ? (parseFloat(connectedWallet.balance) * ethPrice).toFixed(2)
    : '0.00';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-accent">CryptoTrade Pro</h1>
              <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">Beta</Badge>
            </div>
            
            <div className="flex items-center gap-4">
              {connectedWallet ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Disconnected</span>
                </div>
              )}
              <WalletConnect onWalletConnected={onWalletConnected} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
              <p className="text-muted-foreground">Welcome to your trading dashboard</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Your Balance */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Your Balance</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-accent">
                    {connectedWallet ? formatBalance(connectedWallet.balance) : '0.0000'} ETH
                  </p>
                  <p className="text-muted-foreground">${balanceInUsd}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="bg-success hover:bg-success/90">Buy</Button>
                  <Button size="sm" variant="outline">Sell</Button>
                </div>
              </div>

              {/* Market Overview */}
              <MarketOverview />
            </div>

            {/* Top Cryptocurrencies */}
            <CryptocurrencyList />

            {/* Investment Recommendations */}
            <InvestmentRecommendations />
          </TabsContent>

          <TabsContent value="portfolio" className="mt-8">
            <Portfolio 
              connectedWallet={connectedWallet}
              ethPrice={ethPrice}
            />
          </TabsContent>

          <TabsContent value="markets" className="mt-8">
            <Markets />
          </TabsContent>

          <TabsContent value="calculator" className="mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Investment Calculator</h2>
              <p className="text-muted-foreground mb-8">Plan your investment strategy</p>
              <div className="max-w-2xl">
                <InvestmentCalculator 
                  ethPrice={ethPrice}
                  walletBalance={connectedWallet?.balance || ''}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;