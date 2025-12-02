#!/bin/bash

# Qatmeer Landing Page Deployment Script
# Run this script after creating your GitHub repository

echo "🚀 Qatmeer Landing Page Deployment"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Make sure you're in the qatmeer-landing directory."
    exit 1
fi

# Check if Git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Not a Git repository. Please run 'git init' first."
    exit 1
fi

# Get the GitHub repository URL from user
echo "📝 Please enter your GitHub repository URL:"
echo "   Example: https://github.com/yourusername/qatmeer-landing.git"
read -p "Repository URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Error: Repository URL is required."
    exit 1
fi

echo ""
echo "🔗 Adding remote origin: $REPO_URL"
git remote add origin "$REPO_URL"

echo "📤 Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌟 Next Steps:"
    echo "1. Go to your GitHub repository: $REPO_URL"
    echo "2. Click on 'Settings' tab"
    echo "3. Scroll to 'Pages' section"
    echo "4. Select 'Deploy from a branch'"
    echo "5. Choose 'main' branch and '/ (root)' folder"
    echo "6. Click 'Save'"
    echo ""
    echo "🌐 Your site will be available at:"
    echo "   https://yourusername.github.io/repository-name"
    echo ""
    echo "⏰ Note: It may take a few minutes for GitHub Pages to deploy."
else
    echo "❌ Error: Failed to push to GitHub."
    echo "   Make sure:"
    echo "   - The repository URL is correct"
    echo "   - You have push permissions to the repository"
    echo "   - You're signed in to GitHub"
fi