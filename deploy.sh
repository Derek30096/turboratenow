#!/bin/bash
echo "Building application..."
npm run build

echo "Starting production server..."
NODE_ENV=production node dist/index.js