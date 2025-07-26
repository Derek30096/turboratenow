#!/bin/bash

# Emergency deployment to trigger domain routing
echo "=== Emergency Domain Deployment ==="

# Kill any existing processes on port 5000
echo "Stopping existing processes..."
pkill -f "server/index.ts" 2>/dev/null || true
pkill -f "production.js" 2>/dev/null || true

# Wait for cleanup
sleep 2

# Set production environment
export NODE_ENV=production
export PORT=5000

echo "Starting production server for domain routing..."

# Start production server
nohup node -r tsx/esm server/index.ts > /tmp/production.log 2>&1 &
PROD_PID=$!

echo "Production server started with PID: $PROD_PID"
echo "Monitoring for domain connections..."

# Wait and test
sleep 5

# Test domain routing
echo "Testing domain routing..."
curl -H "Host: turboratenow.net" http://localhost:5000/ --max-time 3 2>/dev/null | head -c 100
echo ""

echo "Production server ready. Domain should route within minutes."
echo "Log file: /tmp/production.log"