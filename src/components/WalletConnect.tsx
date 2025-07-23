import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Web3 from 'web3';

interface WalletConnectProps {
  onWalletConnected: (address: string, balance: string) => void;
}

const WalletConnect = ({ onWalletConnected }: WalletConnectProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [ethBalance, setEthBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          setIsConnected(true);
          await getBalance(address);
          onWalletConnected(address, ethBalance);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      const address = accounts[0];
      setWalletAddress(address);
      setIsConnected(true);
      await getBalance(address);
      onWalletConnected(address, ethBalance);
      
      toast({
        title: "Wallet connected!",
        description: "Successfully connected to MetaMask.",
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to MetaMask.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBalance = async (address: string) => {
    try {
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(address);
      const ethBalance = web3.utils.fromWei(balance, 'ether');
      setEthBalance(parseFloat(ethBalance).toFixed(6));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard.",
    });
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setEthBalance('');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-accent" />
            Wallet Connected
          </CardTitle>
          <CardDescription>Your MetaMask wallet is connected</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono">
                  {formatAddress(walletAddress)}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyAddress}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://etherscan.io/address/${walletAddress}`, '_blank')}
                  className="h-8 w-8 p-0"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">ETH Balance</p>
            <p className="text-2xl font-bold text-accent">{ethBalance} ETH</p>
          </div>
          
          <Button 
            variant="destructive" 
            onClick={disconnectWallet}
            className="w-full"
          >
            Disconnect Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Wallet className="h-6 w-6 text-primary" />
          Connect Wallet
        </CardTitle>
        <CardDescription>
          Connect your MetaMask wallet to start trading
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={connectWallet}
          disabled={isLoading}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          {isLoading ? 'Connecting...' : 'Connect MetaMask'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;