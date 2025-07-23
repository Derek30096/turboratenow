// Advanced analytics tracking with ClickMagick-level capabilities

let sessionId: string = '';
let visitorId: number | null = null;
let pageStartTime: number = Date.now();

// Generate or retrieve session ID
function getSessionId(): string {
  if (!sessionId) {
    sessionId = sessionStorage.getItem('tracking_session') || 
                `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('tracking_session', sessionId);
  }
  return sessionId;
}

// Enhanced visitor tracking with device detection
export async function trackVisitor(campaignId?: number): Promise<any> {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    
    const visitorData = {
      sessionId: getSessionId(),
      landingPage: window.location.href,
      campaignId,
      // UTM parameters
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content')
    };

    const response = await fetch('/api/track/visitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorData),
    });

    const result = await response.json();
    if (result.success && result.visitor) {
      visitorId = result.visitor.id;
      localStorage.setItem('visitor_id', visitorId.toString());
    }
    
    return result;
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return null;
  }
}

// Enhanced CTA click tracking with coordinates and timing
export async function trackCTAClick(ctaType: string, ctaText: string, elementId?: string): Promise<any> {
  try {
    if (!visitorId) {
      visitorId = parseInt(localStorage.getItem('visitor_id') || '0') || null;
    }

    const timeOnPage = Math.floor((Date.now() - pageStartTime) / 1000);

    const clickData = {
      visitorId: visitorId || 0,
      sessionId: getSessionId(),
      ctaType,
      ctaText,
      elementId,
      pageUrl: window.location.href,
      timeOnPage
    };

    const response = await fetch('/api/track/cta-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickData),
    });

    return await response.json();
  } catch (error) {
    console.error('Error tracking CTA click:', error);
    return null;
  }
}

// Track lead conversion with affiliate network details
export async function trackLead(email?: string, zipCode?: string, conversionValue = "25.00"): Promise<any> {
  try {
    if (!visitorId) {
      visitorId = parseInt(localStorage.getItem('visitor_id') || '0') || null;
    }

    const leadData = {
      visitorId: visitorId || 0,
      sessionId: getSessionId(),
      email,
      zipCode,
      conversionValue,
      conversionType: 'click',
      affiliateNetwork: 'MaxBounty',
      payout: conversionValue
    };

    const response = await fetch('/api/track/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    return await response.json();
  } catch (error) {
    console.error('Error tracking lead:', error);
    return null;
  }
}

// Track page events (scroll, hover, exit, etc.)
export async function trackPageEvent(eventType: string, element?: string, data?: any): Promise<any> {
  try {
    if (!visitorId) {
      visitorId = parseInt(localStorage.getItem('visitor_id') || '0') || null;
    }

    const eventData = {
      visitorId: visitorId || 0,
      sessionId: getSessionId(),
      eventType,
      page: window.location.href,
      element,
      data
    };

    const response = await fetch('/api/track/page-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    return await response.json();
  } catch (error) {
    console.error('Error tracking page event:', error);
    return null;
  }
}

// Track redirect to affiliate link
export async function trackRedirect(): Promise<any> {
  try {
    if (!visitorId) {
      visitorId = parseInt(localStorage.getItem('visitor_id') || '0') || null;
    }

    const redirectData = {
      visitorId: visitorId || 0,
      sessionId: getSessionId()
    };

    const response = await fetch('/api/track/redirect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(redirectData),
    });

    return await response.json();
  } catch (error) {
    console.error('Error tracking redirect:', error);
    return null;
  }
}

// Setup automatic page event tracking
export function initializeAdvancedTracking(): void {
  // Track page scroll events
  let scrollTimeout: NodeJS.Timeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > 0 && scrollPercent % 25 === 0) {
        trackPageEvent('scroll', 'page', { scrollPercent });
      }
    }, 1000);
  });

  // Track page exit (beforeunload)
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.floor((Date.now() - pageStartTime) / 1000);
    trackPageEvent('exit', 'page', { timeOnPage });
  });

  // Track hover events on important elements
  document.addEventListener('mouseenter', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('button, .cta-button, a[href*="afflat3e1.com"]')) {
      trackPageEvent('hover', target.tagName.toLowerCase(), { 
        elementId: target.id || target.className 
      });
    }
  }, true);

  // Track click coordinates for heatmap data
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('button, .cta-button, a')) {
      trackPageEvent('click', target.tagName.toLowerCase(), {
        x: e.clientX,
        y: e.clientY,
        elementId: target.id || target.className
      });
    }
  });
}

// Analytics API wrapper functions for easy backend access
export class AnalyticsAPI {
  static async getOverview(dateFrom?: string, dateTo?: string, campaignId?: number) {
    const params = new URLSearchParams();
    if (dateFrom) params.append('dateFrom', dateFrom);
    if (dateTo) params.append('dateTo', dateTo);
    if (campaignId) params.append('campaignId', campaignId.toString());

    const response = await fetch(`/api/analytics/overview?${params}`);
    return await response.json();
  }

  static async getCampaignStats(campaignId: number) {
    const response = await fetch(`/api/analytics/campaigns/${campaignId}`);
    return await response.json();
  }

  static async getConversionFunnel(campaignId?: number) {
    const params = campaignId ? `?campaignId=${campaignId}` : '';
    const response = await fetch(`/api/analytics/funnel${params}`);
    return await response.json();
  }

  static async getRecentVisitors(limit = 50, campaignId?: number) {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    if (campaignId) params.append('campaignId', campaignId.toString());

    const response = await fetch(`/api/analytics/visitors?${params}`);
    return await response.json();
  }

  static async getTopCTAs(campaignId?: number) {
    const params = campaignId ? `?campaignId=${campaignId}` : '';
    const response = await fetch(`/api/analytics/ctas${params}`);
    return await response.json();
  }

  static async getGeoData(campaignId?: number) {
    const params = campaignId ? `?campaignId=${campaignId}` : '';
    const response = await fetch(`/api/analytics/geo${params}`);
    return await response.json();
  }

  static async getDeviceData(campaignId?: number) {
    const params = campaignId ? `?campaignId=${campaignId}` : '';
    const response = await fetch(`/api/analytics/devices${params}`);
    return await response.json();
  }

  static async getLiveAnalytics() {
    const response = await fetch('/api/analytics/live');
    return await response.json();
  }

  static async createCampaign(campaignData: any) {
    const response = await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaignData)
    });
    return await response.json();
  }

  static async getCampaigns() {
    const response = await fetch('/api/campaigns');
    return await response.json();
  }

  static async updateCampaign(campaignId: number, updates: any) {
    const response = await fetch(`/api/campaigns/${campaignId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return await response.json();
  }
}