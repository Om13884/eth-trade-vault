import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CryptocurrencyList = () => {
  const cryptocurrencies = [
    {
      symbol: '₿',
      name: 'Bitcoin',
      code: 'BTC',
      price: '$43,250.67',
      change: '+2.45%',
      isPositive: true
    },
    {
      symbol: 'Ξ',
      name: 'Ethereum',
      code: 'ETH',
      price: '$2,650.33',
      change: '-1.23%',
      isPositive: false
    },
    {
      symbol: '₳',
      name: 'Cardano',
      code: 'ADA',
      price: '$0.49',
      change: '+3.67%',
      isPositive: true
    },
    {
      symbol: '◎',
      name: 'Solana',
      code: 'SOL',
      price: '$95.78',
      change: '+5.23%',
      isPositive: true
    },
    {
      symbol: '⬡',
      name: 'Polygon',
      code: 'MATIC',
      price: '$0.87',
      change: '-0.89%',
      isPositive: false
    },
    {
      symbol: '⬢',
      name: 'Chainlink',
      code: 'LINK',
      price: '$14.25',
      change: '+1.87%',
      isPositive: true
    }
  ];

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle>Top Cryptocurrencies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cryptocurrencies.map((crypto, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  {crypto.symbol}
                </div>
                <div>
                  <p className="font-semibold">{crypto.name}</p>
                  <p className="text-sm text-muted-foreground">{crypto.code}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{crypto.price}</p>
                <Badge 
                  variant={crypto.isPositive ? "default" : "destructive"}
                  className={crypto.isPositive ? "bg-success text-success-foreground" : ""}
                >
                  {crypto.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptocurrencyList;