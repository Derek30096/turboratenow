// Analytics utility functions for tracking user interactions on CPA landing page

import { apiRequest } from "./queryClient";

// Generate a unique session ID for tracking
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('cpa_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('cpa_session_id', sessionId);
  }
  return sessionId;
}

// Track visitor landing on the page
export async function trackVisitor() {
  try {
    const sessionId = getSessionId();
    const visitorData = {
      sessionId,
      ipAddress: null, // Will be determined server-side
      userAgent: navigator.userAgent,
      referrer: document.referrer || null,
      landingPage: window.location.href,
    };

    await apiRequest('POST', '/api/track/visitor', visitorData);
  } catch (error) {
    console.error('Failed to track visitor:', error);
  }
}

// Track CTA button clicks
export async function trackCTAClick(ctaType: string, ctaText: string) {
  try {
    const sessionId = getSessionId();
    const clickData = {
      sessionId,
      ctaType,
      ctaText,
      visitorId: null, // Will be linked server-side if needed
    };

    await apiRequest('POST', '/api/track/click', clickData);
  } catch (error) {
    console.error('Failed to track CTA click:', error);
  }
}

// Track lead generation (when user would submit a form)
export async function trackLead(email?: string, zipCode?: string) {
  try {
    const sessionId = getSessionId();
    const leadData = {
      sessionId,
      email: email || null,
      zipCode: zipCode || null,
      converted: true,
      conversionValue: null, // Will be set when affiliate conversion is confirmed
      visitorId: null, // Will be linked server-side if needed
    };

    await apiRequest('POST', '/api/track/lead', leadData);
  } catch (error) {
    console.error('Failed to track lead:', error);
  }
}

// Get analytics data (for admin dashboard)
export async function getAnalytics() {
  try {
    const response = await fetch('/api/analytics', {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return null;
  }
}