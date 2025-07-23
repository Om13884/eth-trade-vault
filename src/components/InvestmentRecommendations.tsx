import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, Target } from 'lucide-react';

const InvestmentRecommendations = () => {
  const recommendations = [
    {
      icon: TrendingUp,
      title: 'Dollar Cost Averaging',
      description: 'Invest a fixed amount regularly to reduce volatility impact',
      details: [
        { label: 'Amount', value: '$500' },
        { label: 'Frequency', value: 'Monthly' },
        { label: 'Assets', value: 'BTC, ETH' }
      ]
    },
    {
      icon: Shield,
      title: 'Diversification Strategy',
      description: 'Spread investments across different cryptocurrencies',
      details: []
    },
    {
      icon: Target,
      title: 'Risk Management',
      description: 'Set stop-loss orders and take profits gradually',
      details: [
        { label: 'Stop Loss', value: '15%' },
        { label: 'Take Profit', value: '25%' }
      ]
    }
  ];

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle>Investment Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                <rec.icon className="h-5 w-5 text-accent" />
                <h4 className="font-semibold">{rec.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
              {rec.details.length > 0 && (
                <div className="space-y-1">
                  {rec.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{detail.label}:</span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentRecommendations;