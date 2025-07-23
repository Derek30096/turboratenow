import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsAPI } from "@/lib/advanced-analytics";
import { 
  Users, 
  MousePointer, 
  TrendingUp, 
  DollarSign,
  Globe,
  Smartphone,
  Clock,
  Target,
  BarChart3,
  Eye
} from "lucide-react";

interface DashboardStats {
  totalVisitors: number;
  totalClicks: number;
  totalLeads: number;
  conversionRate: number;
  clickThroughRate: number;
  avgTimeOnPage: number;
  topCountries: Array<{ country: string; count: number }>;
  topDevices: Array<{ deviceType: string; count: number }>;
  topBrowsers: Array<{ browser: string; count: number }>;
}

interface LiveStats {
  visitors: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export default function TrackingDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [liveStats, setLiveStats] = useState<LiveStats | null>(null);
  const [liveVisitors, setLiveVisitors] = useState<number>(0);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<number | undefined>();
  const [conversionFunnel, setConversionFunnel] = useState<any[]>([]);
  const [recentVisitors, setRecentVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(loadLiveData, 30000);
    return () => clearInterval(interval);
  }, [selectedCampaign]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [
        overviewResponse,
        campaignsResponse,
        funnelResponse,
        visitorsResponse,
        liveResponse
      ] = await Promise.all([
        AnalyticsAPI.getOverview(undefined, undefined, selectedCampaign),
        AnalyticsAPI.getCampaigns(),
        AnalyticsAPI.getConversionFunnel(selectedCampaign),
        AnalyticsAPI.getRecentVisitors(20, selectedCampaign),
        AnalyticsAPI.getLiveAnalytics()
      ]);

      if (overviewResponse.success) setStats(overviewResponse.stats);
      if (campaignsResponse.success) setCampaigns(campaignsResponse.campaigns);
      if (funnelResponse.success) setConversionFunnel(funnelResponse.funnel);
      if (visitorsResponse.success) setRecentVisitors(visitorsResponse.visitors);
      if (liveResponse.success) {
        setLiveVisitors(liveResponse.live.visitors);
        setLiveStats(liveResponse.live.today);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLiveData = async () => {
    try {
      const liveResponse = await AnalyticsAPI.getLiveAnalytics();
      if (liveResponse.success) {
        setLiveVisitors(liveResponse.live.visitors);
        setLiveStats(liveResponse.live.today);
      }
    } catch (error) {
      console.error('Error loading live data:', error);
    }
  };

  const createNewCampaign = async () => {
    try {
      const campaignData = {
        name: `Campaign ${campaigns.length + 1}`,
        source: 'website',
        medium: 'cpa',
        isActive: true
      };
      
      const response = await AnalyticsAPI.createCampaign(campaignData);
      if (response.success) {
        setCampaigns([response.campaign, ...campaigns]);
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tracking dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Professional tracking as good as ClickMagick</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{liveVisitors} live visitors</span>
              </div>
              <Button onClick={createNewCampaign} className="bg-blue-600 hover:bg-blue-700">
                New Campaign
              </Button>
            </div>
          </div>

          {/* Campaign Selector */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCampaign === undefined ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCampaign(undefined)}
            >
              All Campaigns
            </Button>
            {campaigns.map((campaign) => (
              <Button
                key={campaign.id}
                variant={selectedCampaign === campaign.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCampaign(campaign.id)}
              >
                {campaign.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalVisitors || 0}</div>
              <p className="text-xs text-muted-foreground">
                Today: {liveStats?.visitors || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CTA Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalClicks || 0}</div>
              <p className="text-xs text-muted-foreground">
                CTR: {stats?.clickThroughRate.toFixed(1) || 0}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalLeads || 0}</div>
              <p className="text-xs text-muted-foreground">
                Rate: {stats?.conversionRate.toFixed(1) || 0}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${liveStats?.revenue || 0}</div>
              <p className="text-xs text-muted-foreground">
                Today: ${liveStats?.revenue || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="funnel">Funnel</TabsTrigger>
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
            <TabsTrigger value="geo">Geography</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Countries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Top Countries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats?.topCountries.map((country, index) => (
                      <div key={country.country} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{country.country}</span>
                        <Badge variant="secondary">{country.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Devices */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Device Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats?.topDevices.map((device, index) => (
                      <div key={device.deviceType} className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">{device.deviceType}</span>
                        <Badge variant="secondary">{device.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {stats?.avgTimeOnPage.toFixed(0) || 0}s
                    </div>
                    <p className="text-sm text-gray-600">Avg. Time on Page</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {stats?.clickThroughRate.toFixed(1) || 0}%
                    </div>
                    <p className="text-sm text-gray-600">Click-Through Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">
                      {stats?.conversionRate.toFixed(1) || 0}%
                    </div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funnel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Conversion Funnel
                </CardTitle>
                <CardDescription>
                  Track user journey from landing to conversion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionFunnel.map((step, index) => (
                    <div key={step.step} className="relative">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {step.step}
                          </div>
                          <div>
                            <h4 className="font-medium">{step.stepName}</h4>
                            <p className="text-sm text-gray-600">{step.visitors} visitors</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{step.conversionRate.toFixed(1)}%</div>
                          <div className="text-sm text-gray-600">conversion</div>
                        </div>
                      </div>
                      {index < conversionFunnel.length - 1 && (
                        <div className="w-px h-4 bg-gray-300 ml-4 my-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visitors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Recent Visitors
                </CardTitle>
                <CardDescription>
                  Latest visitor activity and details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentVisitors.map((visitor) => (
                    <div key={visitor.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {visitor.deviceType?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">
                            {visitor.country || 'Unknown'} • {visitor.deviceType || 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {visitor.browser || 'Unknown Browser'} • {new Date(visitor.visitedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={visitor.campaign ? "default" : "secondary"}>
                          {visitor.campaign?.name || 'Direct'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Analytics</CardTitle>
                <CardDescription>
                  Coming soon - detailed geo analytics with maps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Geographic breakdown and heatmaps will be available in the next update.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Device & Browser Analytics</CardTitle>
                <CardDescription>
                  Detailed device and browser performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Top Browsers</h4>
                    <div className="space-y-2">
                      {stats?.topBrowsers.map((browser) => (
                        <div key={browser.browser} className="flex justify-between">
                          <span>{browser.browser}</span>
                          <Badge variant="outline">{browser.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Device Types</h4>
                    <div className="space-y-2">
                      {stats?.topDevices.map((device) => (
                        <div key={device.deviceType} className="flex justify-between">
                          <span className="capitalize">{device.deviceType}</span>
                          <Badge variant="outline">{device.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}