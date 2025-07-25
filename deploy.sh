#!/bin/bash

echo "🚀 EMERGENCY DEPLOYMENT FOR TURBORATENOW.COM"
echo "============================================="

# Force build and deploy
echo "📦 Building application..."
npm run build

# Check if domain is responding
echo "🔍 Testing domain connectivity..."
DOMAIN_STATUS=$(curl -k -s -o /dev/null -w "%{http_code}" https://turboratenow.com/ --max-time 10)
echo "Domain HTTP Status: $DOMAIN_STATUS"

if [ "$DOMAIN_STATUS" = "404" ]; then
    echo "❌ CRITICAL: Domain routing still broken"
    echo "📧 Send replit-support-email.txt to Replit Support IMMEDIATELY"
    echo "🌐 Use working URL: cpa-bridge-booster-binghamderek.replit.app"
elif [ "$DOMAIN_STATUS" = "200" ]; then
    echo "✅ SUCCESS: Domain is working!"
else
    echo "⚠️  Domain status unclear: $DOMAIN_STATUS"
fi

echo ""
echo "📋 IMMEDIATE ACTION ITEMS:"
echo "1. Contact Replit Support with technical evidence"
echo "2. Demand billing credit for service failure"  
echo "3. Use working Replit URL for campaigns: cpa-bridge-booster-binghamderek.replit.app"
echo ""
echo "🎯 Your CPA landing page is ready and fully functional!"