import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import PriceList from '@/components/PriceList';

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
    <>
      {/* Hidden price updater */}
      <div className="hidden">
        <PriceList onPriceUpdate={handlePriceUpdate} />
      </div>
      
      <Dashboard 
        connectedWallet={connectedWallet}
        onWalletConnected={handleWalletConnected}
        ethPrice={ethPrice}
      />
    </>
  );
};

export default Index;
