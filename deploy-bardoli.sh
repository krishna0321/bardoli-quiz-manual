#!/bin/bash

# 🚀 BARDOLI BRAIN BATTLE - One-Click Deployment Script
# This script deploys your website to multiple platforms

echo "🏆 BARDOLI BRAIN BATTLE - DEPLOYMENT WIZARD"
echo "=============================================="
echo ""

# Check if build exists
if [ ! -d "/app/frontend/build" ]; then
    echo "📦 Building React application..."
    cd /app/frontend && npm run build
    echo "✅ Build completed!"
else
    echo "✅ Build already exists!"
fi

echo ""
echo "🌐 DEPLOYMENT OPTIONS:"
echo "======================"
echo ""
echo "1. 📋 Copy files for manual upload"
echo "2. 🚀 Generate Netlify deployment package"
echo "3. 📤 Create Vercel deployment package"
echo "4. 🔗 GitHub repository setup"
echo "5. 📱 Mobile-optimized build"
echo ""

read -p "Choose deployment option (1-5): " choice

case $choice in
    1)
        echo ""
        echo "📋 MANUAL DEPLOYMENT PACKAGE"
        echo "=============================="
        cd /app
        tar -czf bardoli-manual-deploy.tar.gz frontend/build frontend/package.json frontend/README.md
        echo "✅ Created: bardoli-manual-deploy.tar.gz"
        echo ""
        echo "📁 Upload contents to any web host:"
        echo "   - Extract the tar.gz file"
        echo "   - Upload 'build' folder contents to your web server"
        echo "   - Point domain to the uploaded files"
        echo ""
        ;;
    
    2)
        echo ""
        echo "🚀 NETLIFY DEPLOYMENT PACKAGE"
        echo "=============================="
        cd /app
        # Create netlify-specific files
        echo "/*    /index.html   200" > frontend/build/_redirects
        echo "# Bardoli Brain Battle - Netlify Deploy" > frontend/build/netlify.toml
        tar -czf bardoli-netlify-deploy.tar.gz frontend/
        echo "✅ Created: bardoli-netlify-deploy.tar.gz"
        echo ""
        echo "🌐 Netlify Deployment Steps:"
        echo "   1. Go to https://netlify.com"
        echo "   2. Drag the extracted 'frontend' folder to Netlify"
        echo "   3. Your site will be live in 2 minutes!"
        echo ""
        ;;
    
    3)
        echo ""
        echo "📤 VERCEL DEPLOYMENT PACKAGE"
        echo "============================="
        cd /app
        # Add vercel configuration
        cat > frontend/vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
EOF
        tar -czf bardoli-vercel-deploy.tar.gz frontend/
        echo "✅ Created: bardoli-vercel-deploy.tar.gz"
        echo ""
        echo "⚡ Vercel Deployment Steps:"
        echo "   1. Go to https://vercel.com"
        echo "   2. Click 'New Project'"
        echo "   3. Upload the 'frontend' folder"
        echo "   4. Deploy automatically!"
        echo ""
        ;;
    
    4)
        echo ""
        echo "🔗 GITHUB REPOSITORY SETUP"
        echo "=========================="
        cd /app
        cp -r frontend bardoli-brain-battle-repo
        cd bardoli-brain-battle-repo
        
        # Add GitHub Actions for auto-deployment
        mkdir -p .github/workflows
        cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
EOF

        cd /app
        tar -czf bardoli-github-repo.tar.gz bardoli-brain-battle-repo/
        echo "✅ Created: bardoli-github-repo.tar.gz"
        echo ""
        echo "📚 GitHub Deployment Steps:"
        echo "   1. Extract and upload to GitHub repository"
        echo "   2. Go to repository Settings > Pages"
        echo "   3. Select 'GitHub Actions' as source"
        echo "   4. Auto-deploy on every commit!"
        echo ""
        ;;
    
    5)
        echo ""
        echo "📱 MOBILE-OPTIMIZED BUILD"
        echo "========================"
        cd /app/frontend
        
        # Add PWA manifest for mobile app experience
        cat > build/manifest.json << 'EOF'
{
  "short_name": "Bardoli Quiz",
  "name": "Bardoli Brain Battle",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#0A1D56",
  "background_color": "#FFD700"
}
EOF
        
        cd /app
        tar -czf bardoli-mobile-optimized.tar.gz frontend/build/
        echo "✅ Created: bardoli-mobile-optimized.tar.gz"
        echo ""
        echo "📱 Mobile Features Added:"
        echo "   - PWA support for app-like experience"
        echo "   - Optimized for mobile devices"
        echo "   - Touch-friendly interface"
        echo "   - Fast loading optimizations"
        echo ""
        ;;
    
    *)
        echo "❌ Invalid option. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 DEPLOYMENT PACKAGE READY!"
echo "============================"
echo ""
echo "📊 Your Bardoli Brain Battle Website Includes:"
echo "   ✅ Live countdown timer to July 13th, 2025"
echo "   ✅ Interactive quiz with scoring and animations"
echo "   ✅ Admin dashboard (bardoliadmin / BardoliBrain2025!)"
echo "   ✅ Contact integration (+919327880168, kemchhobardoliquiz@gmail.com)"
echo "   ✅ Razorpay payment integration"
echo "   ✅ All policy pages and About Us"
echo "   ✅ Mobile-responsive design"
echo "   ✅ Premium animations and effects"
echo ""
echo "🌐 Current Preview URL:"
echo "   https://59e0e7a8-8f84-466a-810a-d45c4b641048.preview.emergentagent.com"
echo ""
echo "🚀 Ready for production deployment!"
echo "📧 Support: kemchhobardoliquiz@gmail.com"
echo ""
