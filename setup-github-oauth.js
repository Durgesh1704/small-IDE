#!/usr/bin/env node

/**
 * GitHub OAuth Setup Helper
 * Run this script to verify your GitHub OAuth configuration
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 GitHub OAuth Setup Helper\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found!');
    console.log('Please create a .env file in your project root.');
    process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

// Check for required variables
const requiredVars = [
    'NEXT_PUBLIC_GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
    'NEXT_PUBLIC_APP_URL'
];

const missingVars = [];
const placeholderVars = [];

requiredVars.forEach(varName => {
    const line = envLines.find(line => line.startsWith(varName));
    if (!line) {
        missingVars.push(varName);
    } else if (line.includes('your_') || line.includes('here')) {
        placeholderVars.push(varName);
    }
});

if (missingVars.length > 0) {
    console.log('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
        console.log(`   - ${varName}`);
    });
    console.log('\nPlease add these variables to your .env file.');
    process.exit(1);
}

if (placeholderVars.length > 0) {
    console.log('⚠️  Found placeholder values in environment variables:');
    placeholderVars.forEach(varName => {
        console.log(`   - ${varName}`);
    });
    console.log('\nPlease replace these with your actual GitHub OAuth credentials.');
    
    console.log('\n📋 Steps to get GitHub OAuth credentials:');
    console.log('1. Go to: https://github.com/settings/developers');
    console.log('2. Click "New OAuth App"');
    console.log('3. Fill in:');
    console.log('   - Application name: AI Developer Assistant');
    console.log('   - Homepage URL: http://localhost:3000');
    console.log('   - Authorization callback URL: http://localhost:3000/api/auth/github/callback');
    console.log('4. Click "Register application"');
    console.log('5. Copy Client ID and generate Client Secret');
    console.log('6. Update your .env file with these values');
    
    process.exit(1);
}

console.log('✅ All required environment variables are configured!');
console.log('🚀 Your GitHub OAuth setup is ready!');

// Show current configuration
console.log('\n📋 Current Configuration:');
envLines.forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_') || line.startsWith('GITHUB_')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=');
        if (key === 'GITHUB_CLIENT_SECRET') {
            console.log(`${key}=*** (hidden for security)`);
        } else {
            console.log(`${key}=${value.replace(/"/g, '')}`);
        }
    }
});

console.log('\n🧪 To test your setup:');
console.log('1. Restart your development server: npm run dev');
console.log('2. Open: http://localhost:3000?debug=true');
console.log('3. Run the connection tests in the debug panel');