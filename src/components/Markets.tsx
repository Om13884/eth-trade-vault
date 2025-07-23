import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, TrendingUp, TrendingDown, Star, BarChart3 } from 'lucide-react';

const Markets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [filterBy, setFilterBy] = useState('all');

  const marketData = [
    {
      rank: 1,
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 43250.67,
      change24h: 2.45,
      volume24h: 28500000000,
      marketCap: 846000000000,
      supply: 19600000,
      isWatchlisted: true
    },
    {
      rank: 2,
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2650.33,
      change24h: -1.23,
      volume24h: 15200000000,
      marketCap: 318000000000,
      supply: 120000000,
      isWatchlisted: true
    },
    {
      rank: 3,
      symbol: 'BNB',
      name: 'BNB',
      price: 298.45,
      change24h: 0.87,
      volume24h: 890000000,
      marketCap: 46200000000,
      supply: 154800000,
      isWatchlisted: false
    },
    {
      rank: 4,
      symbol: 'SOL',
      name: 'Solana',
      price: 95.78,
      change24h: 5.23,
      volume24h: 2100000000,
      marketCap: 42800000000,
      supply: 447000000,
      isWatchlisted: false
    },
    {
      rank: 5,
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.49,
      change24h: 3.67,
      volume24h: 320000000,
      marketCap: 17200000000,
      supply: 35100000000,
      isWatchlisted: false
    },
    {
      rank: 6,
      symbol: 'XRP',
      name: 'XRP',
      price: 0.52,
      change24h: -2.15,
      volume24h: 1200000000,
      marketCap: 28300000000,
      supply: 54400000000,
      isWatchlisted: false
    },
    {
      rank: 7,
      symbol: 'MATIC',
      name: 'Polygon',
      price: 0.87,
      change24h: -0.89,
      volume24h: 340000000,
      marketCap: 8100000000,
      supply: 9300000000,
      isWatchlisted: false
    },
    {
      rank: 8,
      symbol: 'LINK',
      name: 'Chainlink',
      price: 14.25,
      change24h: 1.87,
      volume24h: 580000000,
      marketCap: 8900000000,
      supply: 624000000,
      isWatchlisted: false
    }
  ];

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(4)}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    }
    return `$${(volume / 1e6).toFixed(2)}M`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    }
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    }
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  };

  const filteredData = marketData.filter(coin => {
    const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'watchlist') {
      return matchesSearch && coin.isWatchlisted;
    }
    if (filterBy === 'gainers') {
      return matchesSearch && coin.change24h > 0;
    }
    if (filterBy === 'losers') {
      return matchesSearch && coin.change24h < 0;
    }
    
    return matchesSearch;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.price - a.price;
      case 'change':
        return Math.abs(b.change24h) - Math.abs(a.change24h);
      case 'volume':
        return b.volume24h - a.volume24h;
      case 'market_cap':
      default:
        return b.marketCap - a.marketCap;
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Markets</h2>
        <p className="text-muted-foreground">Explore cryptocurrency markets</p>
      </div>

      {/* Market Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-accent" />
              <p className="text-sm text-muted-foreground">Total Market Cap</p>
            </div>
            <p className="text-xl font-bold mt-1">$1.65T</p>
            <Badge variant="default" className="bg-success text-success-foreground mt-1">
              +2.1%
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="text-xl font-bold mt-1">$89.5B</p>
            <Badge variant="destructive" className="mt-1">
              -5.3%
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">BTC Dominance</p>
            <p className="text-xl font-bold mt-1">51.3%</p>
            <Badge variant="default" className="bg-warning text-warning-foreground mt-1">
              +0.8%
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Fear & Greed</p>
            <p className="text-xl font-bold mt-1">68</p>
            <p className="text-xs text-muted-foreground">Greed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Cryptocurrency Prices</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search coins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="watchlist">Watchlist</SelectItem>
                  <SelectItem value="gainers">Gainers</SelectItem>
                  <SelectItem value="losers">Losers</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market_cap">Market Cap</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="change">Change</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 p-3 text-sm font-medium text-muted-foreground border-b">
              <div className="col-span-2">Name</div>
              <div className="text-right">Price</div>
              <div className="text-right">24h %</div>
              <div className="text-right">Volume (24h)</div>
              <div className="text-right">Market Cap</div>
              <div className="text-center">Action</div>
            </div>

            {/* Table Rows */}
            {sortedData.map((coin, index) => (
              <div key={coin.symbol} className="grid grid-cols-7 gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="col-span-2 flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                  >
                    <Star className={`h-4 w-4 ${coin.isWatchlisted ? 'text-warning fill-warning' : 'text-muted-foreground'}`} />
                  </Button>
                  <span className="text-sm text-muted-foreground w-6">#{coin.rank}</span>
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">{coin.symbol}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{coin.name}</p>
                    <p className="text-sm text-muted-foreground">{coin.symbol}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(coin.price)}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {coin.change24h >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                    <Badge 
                      variant={coin.change24h >= 0 ? "default" : "destructive"}
                      className={coin.change24h >= 0 ? "bg-success text-success-foreground" : ""}
                    >
                      {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium">{formatVolume(coin.volume24h)}</p>
                </div>
                
                <div className="text-right">
                  <p className="font-medium">{formatMarketCap(coin.marketCap)}</p>
                </div>
                
                <div className="text-center">
                  <Button variant="outline" size="sm">
                    Trade
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Markets;