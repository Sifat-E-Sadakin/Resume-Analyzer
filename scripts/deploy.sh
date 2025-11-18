#!/bin/bash

# Deployment Script for Vercel
# This script validates your environment and deploys to Vercel

set -e  # Exit on error

echo "🚀 Starting Deployment Process..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check if node is installed
echo "📦 Checking dependencies..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"

# Step 2: Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm: $(npm --version)${NC}"
echo ""

# Step 3: Install dependencies
echo "📦 Installing dependencies..."
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 4: Validate environment variables (for local testing)
if [ -f .env ]; then
    echo "🔍 Validating environment variables..."
    node scripts/validate-env.js
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Environment validation failed${NC}"
        exit 1
    fi
    echo ""
else
    echo -e "${YELLOW}⚠️  No .env file found (OK for Vercel deployment)${NC}"
    echo ""
fi

# Step 5: TypeScript check
echo "🔧 Running TypeScript checks..."
npm run check
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ TypeScript check failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ TypeScript check passed${NC}"
echo ""

# Step 6: Build
echo "🏗️  Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build successful${NC}"
echo ""

# Step 7: Check if Vercel CLI is installed
echo "🔍 Checking for Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found${NC}"
    echo "📥 Installing Vercel CLI globally..."
    npm install -g vercel
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
else
    echo -e "${GREEN}✅ Vercel CLI: $(vercel --version)${NC}"
fi
echo ""

# Step 8: Ask for deployment type
echo -e "${BLUE}🚀 Ready to deploy!${NC}"
echo ""
echo "Choose deployment type:"
echo "1) Production (main deployment)"
echo "2) Preview (test deployment)"
echo "3) Skip deployment (just build)"
echo ""
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}🚀 Deploying to PRODUCTION...${NC}"
        vercel --prod
        ;;
    2)
        echo ""
        echo -e "${BLUE}🚀 Deploying PREVIEW...${NC}"
        vercel
        ;;
    3)
        echo ""
        echo -e "${YELLOW}⏭️  Skipping deployment${NC}"
        echo -e "${GREEN}✅ Build artifacts ready in dist/public${NC}"
        ;;
    *)
        echo ""
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Deployment process completed!${NC}"
echo ""
echo "📋 Post-deployment checklist:"
echo "  • Visit your deployed URL and test all features"
echo "  • Check Vercel dashboard for logs"
echo "  • Verify environment variables in Vercel"
echo "  • Test database connections"
echo ""
echo -e "${BLUE}🎉 Happy deploying!${NC}"

