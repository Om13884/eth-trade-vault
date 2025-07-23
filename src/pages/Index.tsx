import { useState } from 'react';
import WalletConnect from '@/components/WalletConnect';
import PriceList from '@/components/PriceList';
import InvestmentCalculator from '@/components/InvestmentCalculator';
import { TrendingUp } from 'lucide-react';

const Index = () => {
  const [connectedWallet, setConnectedWallet] = useState<{
    address: string;
    balance: string;
  } | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  const handleWalletConnected = (address: string, balance: string) => {
    setConnectedWallet({ address, balance });
  };

  const handlePriceUpdate = (price: number) => {
    setEthPrice(price);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Web3 Trading Vault
                </h1>
                <p className="text-sm text-muted-foreground">
                  Ethereum Trading Dashboard
                </p>
              </div>
            </div>
            {connectedWallet && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Connected</p>
                <p className="font-mono text-sm text-accent">
                  {connectedWallet.address.slice(0, 6)}...{connectedWallet.address.slice(-4)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Wallet Connection */}
          <div className="lg:col-span-1">
            <WalletConnect onWalletConnected={handleWalletConnected} />
          </div>
          
          {/* Price Display */}
          <div className="lg:col-span-1">
            <PriceList onPriceUpdate={handlePriceUpdate} />
          </div>
          
          {/* Investment Calculator */}
          <div className="lg:col-span-1">
            <InvestmentCalculator 
              ethPrice={ethPrice}
              walletBalance={connectedWallet?.balance || ''}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            This is a demo trading dashboard. Connect your MetaMask wallet to view real ETH balance and calculate potential investments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
