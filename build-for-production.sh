#!/bin/bash

# LearnJoyHub - Build for Production Deployment
# This script builds your app and prepares it for Hostinger upload

echo "🚀 Building LearnJoyHub for Production..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📁 Your production files are in the 'dist' folder"
    echo ""
    echo "📤 Next steps for Hostinger deployment:"
    echo "   1. Log in to Hostinger hPanel"
    echo "   2. Go to File Manager"
    echo "   3. Navigate to public_html"
    echo "   4. Delete all existing files (if any)"
    echo "   5. Upload ALL files from the 'dist' folder"
    echo "   6. Visit https://learnjoyhub.in"
    echo ""
    echo "⚠️  IMPORTANT: Don't forget to replace placeholder AdSense IDs!"
    echo "   Search for '1234567890' in GoogleAd components and replace with real slot IDs"
    echo ""
    
    # Open dist folder (macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "📂 Opening dist folder..."
        open dist
    fi
else
    echo ""
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
