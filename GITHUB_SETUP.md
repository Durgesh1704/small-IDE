# 🔧 GitHub OAuth Setup Guide

Follow these steps to configure GitHub OAuth for the AI Developer Assistant.

## 🚀 Quick Setup

### **Step 1: Create GitHub OAuth App**

1. **Open GitHub Developer Settings**
   - Go to: [https://github.com/settings/developers](https://github.com/settings/developers)
   - Click on "OAuth Apps" in the left sidebar
   - Click "New OAuth App"

2. **Configure Your OAuth App**
   ```
   Application name: AI Developer Assistant
   Homepage URL: http://localhost:3000
   Authorization callback URL: http://localhost:3000/api/auth/github/callback
   ```

3. **Register and Get Credentials**
   - Click "Register application"
   - Copy your **Client ID** (displayed immediately)
   - Click "Generate a new client secret"
   - Copy your **Client Secret** (shown only once!)

### **Step 2: Update Environment Variables**

Replace the placeholder values in your `.env` file:

```bash
# Open your .env file
nano .env
```

Replace these lines:
```env
NEXT_PUBLIC_GITHUB_CLIENT_ID="your_github_client_id_here"
GITHUB_CLIENT_SECRET="your_github_client_secret_here"
```

With your actual credentials:
```env
NEXT_PUBLIC_GITHUB_CLIENT_ID="Iv1.xxxxxxxxxxxxxxxxxxxx"
GITHUB_CLIENT_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### **Step 3: Test Your Setup**

1. **Restart the development server**
   ```bash
   npm run dev
   ```

2. **Open the debug panel**
   - Navigate to: `http://localhost:3000?debug=true`
   - Click "Test Connections"
   - All tests should pass ✅

3. **Try GitHub OAuth**
   - Go back to: `http://localhost:3000`
   - Click "Sign in with GitHub"
   - Authorize the application
   - You should be redirected back and logged in!

## 🎯 Example Configuration

Here's what your completed `.env` file should look like:

```env
# Database
DATABASE_URL=file:/home/z/my-project/db/custom.db

# GitHub OAuth Configuration
NEXT_PUBLIC_GITHUB_CLIENT_ID="Iv1.1234567890abcdef1234567890abcdef12345678"
GITHUB_CLIENT_SECRET="1234567890abcdef1234567890abcdef1234567890"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: Webhook URLs for notifications
WEBHOOK_URLS=""

# Optional: Email service configuration
# SENDGRID_API_KEY="your_sendgrid_api_key"
# FROM_EMAIL="noreply@yourapp.com"
```

## 🔍 Troubleshooting

### **Issue: "GitHub OAuth is not properly configured"**

**Solution**: Check your `.env` file for placeholder values:

```bash
# Look for these lines in your .env file:
grep "your_" .env
grep "here" .env
```

If you see placeholder values, replace them with your actual GitHub credentials.

### **Issue: Tests fail in debug panel**

**Common causes**:
1. **Wrong Client ID**: Double-check your Client ID
2. **Wrong Client Secret**: Regenerate if needed
3. **Wrong Callback URL**: Ensure it matches exactly in GitHub settings
4. **Network issues**: Try accessing GitHub directly

### **Issue: GitHub redirects but doesn't log you in**

**Check the browser console** for errors:
1. Open Developer Tools (F12)
2. Go to Console tab
3. Try GitHub OAuth again
4. Look for error messages

### **Issue: "Application not found" error on GitHub**

**Solution**: The callback URL in your GitHub OAuth app doesn't match:
- GitHub OAuth App callback URL should be: `http://localhost:3000/api/auth/github/callback`
- Your `.env` should have: `NEXT_PUBLIC_APP_URL="http://localhost:3000"`

## 🧪 Testing Commands

### **Test Environment Setup**
```bash
# Check if environment variables are set
node setup-github-oauth.js
```

### **Test GitHub API Access**
```bash
# Test basic GitHub connectivity
curl https://api.github.com/rate_limit

# Test local endpoints
curl http://localhost:3000/api/test/github
```

### **Manual OAuth Test**
```bash
# Generate OAuth URL manually
echo "http://localhost:3000?debug=true"
```

## 📋 Checklist

- [ ] Created GitHub OAuth App
- [ ] Set correct Homepage URL (`http://localhost:3000`)
- [ ] Set correct Callback URL (`http://localhost:3000/api/auth/github/callback`)
- [ ] Copied Client ID
- [ ] Generated Client Secret
- [ ] Updated `.env` file with actual credentials
- [ ] Restarted development server
- [ ] Tested with debug panel (`?debug=true`)
- [ ] Successfully authenticated with GitHub

## 🆘 Still Need Help?

If you're still having issues:

1. **Run the setup helper**:
   ```bash
   node setup-github-oauth.js
   ```

2. **Check the debug panel**:
   - Open `http://localhost:3000?debug=true`
   - Run all connection tests
   - Follow the troubleshooting steps shown

3. **Verify your GitHub OAuth App**:
   - Go to [https://github.com/settings/developers](https://github.com/settings/developers)
   - Click on your app
   - Verify all URLs are correct

4. **Clear browser data**:
   - Clear cookies and cache for localhost:3000
   - Try in incognito mode

---

**Remember**: The Client Secret is only shown once when you generate it. If you lost it, you'll need to regenerate it in your GitHub OAuth App settings.