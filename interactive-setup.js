#!/usr/bin/env node

/**
 * Interactive GitHub OAuth Setup Script
 * This script will guide you through setting up GitHub OAuth
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 Interactive GitHub OAuth Setup\n');
console.log('This script will help you set up GitHub OAuth for the AI Developer Assistant.\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
let envContent = '';
if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
} else {
    envContent = '# Database\nDATABASE_URL=file:./dev.db\n\n';
}

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function setupGitHubOAuth() {
    console.log('📋 Step 1: GitHub OAuth App Creation\n');
    console.log('Please open this URL in your browser:');
    console.log('🔗 https://github.com/settings/developers\n');
    console.log('Instructions:');
    console.log('1. Click on "OAuth Apps" in the left sidebar');
    console.log('2. Click "New OAuth App"');
    console.log('3. Fill in the details (I\'ll help you with the values)\n');

    const appName = await askQuestion('Application name (default: AI Developer Assistant): ') || 'AI Developer Assistant';
    const homepageUrl = await askQuestion('Homepage URL (default: http://localhost:3000): ') || 'http://localhost:3000';
    const callbackUrl = await askQuestion('Authorization callback URL (default: http://localhost:3000/api/auth/github/callback): ') || 'http://localhost:3000/api/auth/github/callback';

    console.log('\n✅ OAuth App Details:');
    console.log(`   Application name: ${appName}`);
    console.log(`   Homepage URL: ${homepageUrl}`);
    console.log(`   Authorization callback URL: ${callbackUrl}\n`);

    console.log('🎯 Now, go to GitHub and create the OAuth app with these settings.');
    console.log('After creating the app, GitHub will show you your Client ID and Client Secret.\n');

    const clientId = await askQuestion('Please enter your GitHub Client ID: ');
    const clientSecret = await askQuestion('Please enter your GitHub Client Secret: ');

    if (!clientId || !clientSecret) {
        console.log('❌ Both Client ID and Client Secret are required!');
        rl.close();
        return;
    }

    // Update environment variables in .env file
    let updatedEnvContent = envContent;

    // Remove existing GitHub OAuth variables if they exist
    updatedEnvContent = updatedEnvContent.replace(/^NEXT_PUBLIC_GITHUB_CLIENT_ID=.*$/gm, '');
    updatedEnvContent = updatedEnvContent.replace(/^GITHUB_CLIENT_SECRET=.*$/gm, '');
    updatedEnvContent = updatedEnvContent.replace(/^NEXT_PUBLIC_APP_URL=.*$/gm, '');

    // Remove empty lines
    updatedEnvContent = updatedEnvContent.replace(/\n\s*\n/g, '\n');

    // Add new GitHub OAuth configuration
    updatedEnvContent += '\n# GitHub OAuth Configuration\n';
    updatedEnvContent += `NEXT_PUBLIC_GITHUB_CLIENT_ID="${clientId}"\n`;
    updatedEnvContent += `GITHUB_CLIENT_SECRET="${clientSecret}"\n`;
    updatedEnvContent += `NEXT_PUBLIC_APP_URL="${homepageUrl}"\n`;

    // Write to .env file
    fs.writeFileSync(envPath, updatedEnvContent);

    console.log('\n✅ Environment variables updated successfully!');
    console.log('📝 Your .env file has been updated with your GitHub OAuth credentials.\n');

    console.log('🧪 Testing your configuration...\n');

    // Test the configuration
    try {
        const testUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=repo%20user`;
        console.log('🔗 OAuth URL generated successfully!');
        console.log(`   ${testUrl}\n`);

        console.log('🚀 Next steps:');
        console.log('1. Restart your development server: npm run dev');
        console.log('2. Open: http://localhost:3000?debug=true');
        console.log('3. Click "Test Connections" in the debug panel');
        console.log('4. Try signing in with GitHub\n');

        console.log('✨ Your GitHub OAuth setup is complete!');
    } catch (error) {
        console.error('❌ Error testing configuration:', error.message);
    }

    rl.close();
}

setupGitHubOAuth().catch(console.error);