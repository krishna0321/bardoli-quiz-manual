#!/bin/bash

# 🏆 BARDOLI BRAIN BATTLE - Quick Setup Script
# This script will set up your quiz competition website locally

echo "🏆 Setting up Bardoli Brain Battle Website..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if yarn is installed, if not use npm
if command -v yarn &> /dev/null; then
    PACKAGE_MANAGER="yarn"
    echo "✅ Yarn found: $(yarn --version)"
else
    PACKAGE_MANAGER="npm"
    echo "✅ Using NPM: $(npm --version)"
fi

# Create new React app
echo "📦 Creating new React application..."
npx create-react-app bardoli-brain-battle
cd bardoli-brain-battle

# Install required dependencies
echo "📥 Installing dependencies..."
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn add react-router-dom framer-motion react-confetti canvas-confetti lucide-react
    yarn add -D tailwindcss postcss autoprefixer
else
    npm install react-router-dom framer-motion react-confetti canvas-confetti lucide-react
    npm install -D tailwindcss postcss autoprefixer
fi

# Initialize Tailwind CSS
echo "🎨 Setting up Tailwind CSS..."
npx tailwindcss init -p

echo "✅ Setup complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Copy all the source files from the provided code"
echo "2. Run: $PACKAGE_MANAGER start"
echo "3. Open: http://localhost:3000"
echo ""
echo "🌐 To deploy:"
echo "1. Run: $PACKAGE_MANAGER build"
echo "2. Upload to Netlify, Vercel, or GitHub Pages"
echo ""
echo "🔧 Admin credentials:"
echo "   Username: bardoliadmin"
echo "   Password: BardoliBrain2025!"
echo ""
echo "📱 Contact info configured:"
echo "   Phone: +919327880168"
echo "   Email: kemchhobardoliquiz@gmail.com"
echo ""
echo "🎉 Your Bardoli Brain Battle website is ready!"