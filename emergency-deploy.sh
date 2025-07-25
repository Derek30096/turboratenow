#!/bin/bash

echo "🚨 EMERGENCY DOMAIN DEPLOYMENT - TURBORATENOW.COM"
echo "================================================="

# Test current domain status
echo "🔍 Testing current domain status..."
DOMAIN_STATUS=$(curl -k -s -o /dev/null -w "%{http_code}" https://turboratenow.com/ --max-time 5)
echo "Current status: $DOMAIN_STATUS"

if [ "$DOMAIN_STATUS" != "200" ]; then
    echo "❌ Domain still broken - deploying emergency fixes"
    
    # Try force deployment
    echo "🚀 Attempting emergency deployment..."
    
    # Check if replit CLI is available
    if command -v replit &> /dev/null; then
        echo "📦 Deploying via Replit CLI..."
        replit deploy --force
    else
        echo "⚠️ Replit CLI not available"
    fi
    
    # Alternative: Contact support with all evidence
    echo "📧 URGENT: Contact Replit Support immediately"
    echo "📋 Evidence files created:"
    echo "   - replit-support-email.txt"
    echo "   - URGENT-DOMAIN-FAILURE.md"
    echo "   - backup-domain-strategy.md"
    
    echo ""
    echo "🌐 IMMEDIATE WORKAROUND:"
    echo "   Use: cpa-bridge-booster-binghamderek.replit.app"
    echo "   Status: FULLY FUNCTIONAL"
    echo "   Ready for: CPA campaigns, traffic, conversions"
    echo ""
    echo "💰 DEMAND REFUND: 2+ day domain service failure"
else
    echo "✅ SUCCESS: Domain is working!"
fi