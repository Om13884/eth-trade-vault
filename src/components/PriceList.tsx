import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PriceData {
  usd: number;
  usd_24h_change: number;
  last_updated_at: number;
}

interface PriceListProps {
  onPriceUpdate: (price: number) => void;
}

const PriceList = ({ onPriceUpdate }: PriceListProps) => {
  const [ethPrice, setEthPrice] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchPrice = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true'
      );
      const data = await response.json();
      
      if (data.ethereum) {
        const priceData: PriceData = {
          usd: data.ethereum.usd,
          usd_24h_change: data.ethereum.usd_24h_change,
          last_updated_at: data.ethereum.last_updated_at
        };
        setEthPrice(priceData);
        setLastUpdate(new Date());
        onPriceUpdate(priceData.usd);
      }
    } catch (error) {
      console.error('Error fetching price:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const isPositive = ethPrice?.usd_24h_change && ethPrice.usd_24h_change >= 0;

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              ETH/USD Price
              {isPositive ? (
                <TrendingUp className="h-5 w-5 text-success" />
              ) : (
                <TrendingDown className="h-5 w-5 text-destructive" />
              )}
            </CardTitle>
            <CardDescription>Live Ethereum price from CoinGecko</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchPrice}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {ethPrice ? (
          <>
            <div>
              <p className="text-3xl font-bold text-foreground">
                {formatPrice(ethPrice.usd)}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge 
                variant={isPositive ? "default" : "destructive"}
                className={isPositive ? "bg-success text-success-foreground" : ""}
              >
                {formatChange(ethPrice.usd_24h_change)}
              </Badge>
              <span className="text-sm text-muted-foreground">24h change</span>
            </div>
            
            {lastUpdate && (
              <p className="text-xs text-muted-foreground">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            )}
          </>
        ) : (
          <div className="space-y-2">
            <div className="h-9 bg-muted animate-pulse rounded" />
            <div className="h-6 bg-muted animate-pulse rounded w-24" />
            <div className="h-4 bg-muted animate-pulse rounded w-32" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceList;