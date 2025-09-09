# GitHub OAuth Troubleshooting Guide

If you're experiencing "github.com refused to connect" errors, follow this comprehensive troubleshooting guide.

## 🔍 **Quick Diagnosis**

### **Step 1: Access Debug Mode**
1. Navigate to `http://localhost:3000?debug=true`
2. This will open the GitHub OAuth Debug Panel
3. Run the connection tests to identify the issue

### **Step 2: Check Common Issues**

## 🛠️ **Common Issues & Solutions**

### **Issue 1: Environment Variables Not Set**
**Symptoms**: Debug panel shows "Missing" for environment variables

**Solution**:
1. Create a `.env` file in your project root
2. Add the required variables:
```env
# GitHub OAuth - REQUIRED
NEXT_PUBLIC_GITHUB_CLIENT_ID="your_actual_client_id_here"
GITHUB_CLIENT_SECRET="your_actual_client_secret_here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**How to get GitHub OAuth credentials**:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: AI Developer Assistant (or any name)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/github/callback`
4. Click "Register application"
5. Copy the **Client ID** and **Client Secret**

### **Issue 2: Network Connectivity Problems**
**Symptoms**: Debug panel shows GitHub API as unreachable

**Solutions**:

#### **Option A: Check Internet Connection**
```bash
# Test basic GitHub connectivity
curl -I https://github.com
curl -I https://api.github.com
```

#### **Option B: Check Firewall/Proxy**
- If you're behind a corporate firewall, ensure GitHub.com is accessible
- If using a proxy, configure it properly
- Try accessing GitHub directly in your browser

#### **Option C: DNS Issues**
```bash
# Test DNS resolution
nslookup github.com
nslookup api.github.com
```

If DNS fails, try using Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1)

### **Issue 3: CORS or Browser Security**
**Symptoms**: Browser blocks the redirect to GitHub

**Solutions**:

#### **Option A: Try Incognito Mode**
1. Open your browser in incognito/private mode
2. Navigate to `http://localhost:3000?debug=true`
3. Try the OAuth flow

#### **Option B: Clear Browser Cache**
1. Clear browser cookies and cache for localhost:3000
2. Restart browser and try again

#### **Option C: Disable Browser Extensions**
- Disable ad blockers, privacy extensions, or security extensions
- Try again

### **Issue 4: Localhost Configuration**
**Symptoms**: Callback URL not working correctly

**Solutions**:

#### **Option A: Verify Localhost is Working**
```bash
# Test if your local server is running
curl http://localhost:3000
```

#### **Option B: Check Port Availability**
```bash
# Check if port 3000 is available
netstat -an | grep 3000
# or on Windows
netstat -ano | findstr :3000
```

#### **Option C: Try Different Port**
If port 3000 is occupied, change the port in your setup:
1. Stop the current server
2. Start on a different port:
```bash
PORT=3001 npm run dev
```
3. Update your environment variables:
```env
NEXT_PUBLIC_APP_URL="http://localhost:3001"
```
4. Update GitHub OAuth callback URL to `http://localhost:3001/api/auth/github/callback`

### **Issue 5: GitHub OAuth App Configuration**
**Symptoms**: OAuth flow starts but GitHub shows an error

**Solutions**:

#### **Option A: Verify Callback URL**
- Ensure the callback URL in GitHub OAuth app exactly matches:
  `http://localhost:3000/api/auth/github/callback`

#### **Option B: Check App Permissions**
- Ensure the app has the correct permissions (scopes)
- Required scopes: `repo`, `user`

#### **Option C: Regenerate Credentials**
If you suspect your credentials are compromised:
1. Go to your OAuth app settings
2. Click "Regenerate client secret"
3. Update your `.env` file with the new secret

## 🧪 **Manual Testing**

### **Test 1: Direct GitHub Access**
Open this URL directly in your browser:
```
https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/api/auth/github/callback&scope=repo%20user
```

Replace `YOUR_CLIENT_ID` with your actual GitHub Client ID.

### **Test 2: API Endpoints**
Test these endpoints in your browser or with curl:

#### **Test GitHub API**
```bash
curl https://api.github.com/rate_limit
```

#### **Test Local Endpoints**
```bash
curl http://localhost:3000/api/test/github
curl http://localhost:3000/api/auth/session
```

### **Test 3: OAuth Flow Manually**
1. Clear all browser data for localhost:3000
2. Open `http://localhost:3000?debug=true`
3. Use the debug panel to test each component
4. Check browser console for errors

## 📋 **Debug Checklist**

- [ ] Environment variables are set correctly
- [ ] GitHub OAuth app is configured with correct callback URL
- [ ] GitHub.com is accessible from your network
- [ ] Local server is running on correct port
- [ ] No browser extensions are blocking the request
- [ ] DNS resolution is working correctly
- [ ] Firewall is not blocking GitHub.com
- [ ] Callback URL matches exactly in GitHub OAuth app

## 🔧 **Advanced Troubleshooting**

### **Check Browser Developer Tools**
1. Open Developer Tools (F12)
2. Go to Network tab
3. Try GitHub OAuth
4. Look for failed requests or CORS errors
5. Check Console tab for JavaScript errors

### **Test with Different Browser**
Try a different browser to rule out browser-specific issues:
- Chrome vs Firefox vs Safari vs Edge

### **Check System Hosts File**
Ensure there are no entries blocking GitHub:
```bash
# On Linux/Mac
sudo cat /etc/hosts

# On Windows
notepad C:\Windows\System32\drivers\etc\hosts
```

### **Test with VPN**
If you're in a region with GitHub restrictions:
- Try using a VPN to access GitHub
- Ensure your VPN allows localhost connections

## 🆘 **Still Having Issues?**

If none of the above solutions work, try these steps:

### **Step 1: Complete Reset**
1. Delete your `.env` file
2. Stop the development server
3. Clear browser data for localhost:3000
4. Create a new GitHub OAuth app
5. Create a new `.env` file with fresh credentials
6. Restart the development server

### **Step 2: Minimal Test**
Create a simple test file to verify OAuth basics:
```javascript
// test-oauth.js
const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'http://localhost:3000/api/auth/github/callback';
const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo%20user`;

console.log('Test URL:', authUrl);
console.log('Open this URL in your browser to test OAuth flow');
```

### **Step 3: Get Help**
Create an issue with the following information:
- Operating system and browser
- Complete error messages
- Results from debug panel
- Network tab screenshots
- Console error logs

---

**Remember**: GitHub OAuth requires exact URL matching and proper network connectivity. The debug panel (`?debug=true`) is your best friend for identifying issues!