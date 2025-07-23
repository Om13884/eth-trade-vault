import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MarketOverview = () => {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="text-lg font-bold">$1.65T</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="text-lg font-bold">$89.5B</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Fear & Greed</p>
            <p className="text-lg font-bold">68</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;