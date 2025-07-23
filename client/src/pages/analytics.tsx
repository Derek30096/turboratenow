import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Eye, MousePointer, Users, TrendingUp } from "lucide-react";
import { getAnalytics } from "@/lib/analytics";

interface AnalyticsData {
  totalVisitors: number;
  totalClicks: number;
  totalLeads: number;
  conversionRate: number;
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4 text-sm sm:text-base">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Landing Page
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">TrackPro Analytics Engine</h1>
          <p className="text-sm sm:text-base text-gray-600">Professional CPA tracking and conversion analytics</p>
        </div>

        {analytics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalVisitors}</div>
                <p className="text-xs text-muted-foreground">
                  Unique sessions tracked
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CTA Clicks</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalClicks}</div>
                <p className="text-xs text-muted-foreground">
                  Total button interactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalLeads}</div>
                <p className="text-xs text-muted-foreground">
                  Potential conversions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.conversionRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Visitors to leads ratio
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Click-Through Rate</span>
                  <span className="text-sm text-gray-600">
                    {analytics && analytics.totalVisitors > 0 
                      ? ((analytics.totalClicks / analytics.totalVisitors) * 100).toFixed(1)
                      : '0'}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Leads per Visitor</span>
                  <span className="text-sm text-gray-600">
                    {analytics && analytics.totalVisitors > 0 
                      ? (analytics.totalLeads / analytics.totalVisitors).toFixed(2)
                      : '0'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Avg. Clicks per Visit</span>
                  <span className="text-sm text-gray-600">
                    {analytics && analytics.totalVisitors > 0 
                      ? (analytics.totalClicks / analytics.totalVisitors).toFixed(1)
                      : '0'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimization Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 rounded-lg">
                  <strong className="text-green-800">Good CTR:</strong> Above 15% click-through rate indicates strong landing page appeal
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <strong className="text-blue-800">Conversion Goal:</strong> Target 20%+ conversion rate for optimal CPA performance
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <strong className="text-orange-800">A/B Testing:</strong> Test different CTA text and urgency messaging
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Database Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Database connected and tracking visitor analytics</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              All visitor interactions are being stored in PostgreSQL for analysis and optimization
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}