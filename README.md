# 🤖 AI Developer Assistant with GitHub Integration

A comprehensive AI-powered developer assistant that integrates with GitHub to provide intelligent code suggestions, live preview environments, and team collaboration features with pull request workflows.

## ✨ Features

### 🤖 AI-Powered Development
- **GLM 4.5 Integration**: Advanced reasoning and coding engine
- **Multi-turn Conversations**: Context-aware AI assistant with repository understanding
- **Code Analysis**: Intelligent analysis of codebase structure and patterns
- **Automated Suggestions**: AI-generated code changes with detailed reasoning

### 🔗 GitHub Integration
- **OAuth Authentication**: Secure GitHub login with proper session management
- **Repository Import**: Import and analyze GitHub repositories with real API data
- **Code Analysis**: Read and analyze repository structure and contents
- **Branch Management**: Automatic branch creation for AI-suggested changes

### 🚀 Live Preview Environment
- **Web Preview**: Run frontend projects in isolated environments
- **Backend APIs**: Temporary API endpoints for testing
- **Mobile Support**: Expo Web/Flutter preview capabilities
- **Multi-device View**: Desktop, tablet, and mobile preview modes

### 👥 Team Collaboration
- **Draft PR Creation**: AI creates draft pull requests with reasoning
- **Review Workflow**: Team-based approval process with required reviewers
- **Branch Protection**: Respects GitHub's existing branch protection rules
- **Notification System**: Email, Slack, and webhook notifications for reviewers

### 📊 Code Management
- **Diff Viewer**: Visual code comparison with syntax highlighting
- **Change Tracking**: Track all AI-generated suggestions and modifications
- **File Management**: Support for new, modified, and deleted files
- **Export Options**: Download patches and export changes

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript 5** for type safety
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library
- **Lucide React** icons
- **Framer Motion** for animations

### Backend
- **Next.js API Routes**
- **Prisma ORM** with SQLite
- **ZAI SDK** for AI integration
- **GitHub API** integration

### Authentication
- **GitHub OAuth** flow
- **Session management** with secure cookies
- **Repository permissions** enforcement

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- GitHub account (for OAuth integration)
- GitHub OAuth App credentials

### Setup

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**
```bash
cp .env.example .env
```

3. **Set up GitHub OAuth App**
   - Go to GitHub Settings → Developer Settings → OAuth Apps
   - Create new OAuth App with:
     - Homepage URL: `http://localhost:3000`
     - Authorization callback URL: `http://localhost:3000/api/auth/github/callback`
   - Copy Client ID and Client Secret to your `.env` file

4. **Configure environment variables**
```env
# Database
DATABASE_URL="file:./dev.db"

# GitHub OAuth
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Application URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_GITHUB_CLIENT_ID="your_github_client_id"

# Optional: Webhook URLs for notifications
WEBHOOK_URLS=""
```

5. **Initialize database**
```bash
npm run db:push
```

6. **Start development server**
```bash
npm run dev
```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### 1. Authentication
1. Click "Sign in with GitHub" in the sidebar
2. Authorize the application with your GitHub account
3. You'll be redirected back with full access to your repositories

### 2. Import Repository
1. After authentication, your repositories will load automatically
2. Click on any repository to import it, or
3. Use the import field to add a repository by URL (e.g., `owner/repo` or full GitHub URL)

### 3. AI Assistance
1. Once a repository is imported, use the chat interface
2. Ask the AI to help with:
   - Bug fixes
   - New features
   - Code improvements
   - Documentation
   - Testing
3. The AI will analyze your repository and provide suggestions

### 4. Review Changes
1. Switch to the "Code Diff" tab to see proposed changes
2. Review the AI's reasoning and suggested modifications
3. Use the "Live Preview" tab to test changes in isolation

### 5. Create Pull Request
1. When satisfied with the changes, click "Create Draft PR"
2. Review the PR details and AI reasoning
3. Add appropriate title and description
4. Create the draft PR for team review

### 6. Team Collaboration
1. Required reviewers will be automatically notified
2. Team members can review, approve, or request changes
3. PR follows GitHub's existing branch protection rules
4. Merge only after all requirements are satisfied

## 🔧 API Endpoints

### Authentication
- `GET /api/auth/session` - Check current session
- `GET /api/auth/github/callback` - GitHub OAuth callback

### Repositories
- `POST /api/repositories/import` - Import a repository
- `GET /api/repositories/list` - List user's repositories

### AI Assistant
- `POST /api/ai/chat` - Chat with AI assistant

### Pull Requests
- `POST /api/pull-requests/create` - Create draft pull request

### Notifications
- `POST /api/notifications/send` - Send notifications to reviewers

## 🗄️ Database Schema

The application uses Prisma with SQLite and includes the following models:

- **User** - GitHub user information and authentication
- **Repository** - Imported repository data
- **RepositoryStructure** - File and directory structure
- **Conversation** - AI chat history
- **PullRequest** - Created pull requests
- **PullRequestReviewer** - Required reviewers
- **Notification** - Notification system

## 🔒 Security Features

- **GitHub OAuth**: Secure authentication flow
- **Session Management**: Secure HTTP-only cookies
- **Repository Permissions**: Enforces GitHub access levels
- **Branch Protection**: Respects existing GitHub rules
- **Draft PRs**: Prevents unauthorized merges
- **Audit Logging**: Tracks all AI-generated suggestions

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set in your production environment:

```env
DATABASE_URL="your_production_database_url"
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
NEXT_PUBLIC_APP_URL="your_production_url"
NEXT_PUBLIC_GITHUB_CLIENT_ID="your_github_client_id"
```

### Build and Deploy
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Include screenshots and error messages if applicable

---

Built with ❤️ for modern development teams. Powered by AI and GitHub integration.
