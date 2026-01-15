# Timeroom App

**Timeroom** is an AI-powered time orchestrator that helps users manage their schedule and time-related tasks efficiently.

## Features

- 🤖 AI Time Orchestration
- 📅 Calendar Integration
- 🔐 Google OAuth Authentication
- ⚡ Cloudflare Pages Deployment
- 🔄 Automatic Task Scheduling
- 📊 Time Analytics

## Project Structure

```
timeroom-app/
├── package.json          # Project dependencies
├── wrangler.toml         # Cloudflare Workers configuration
├── src/
│   └── index.js          # Main worker script
├── public/
│   ├── index.html        # Home page
│   ├── login.html        # Login page
│   └── dashboard.html    # User dashboard
└── README.md             # This file
```

## Setup Instructions

### Prerequisites

- Node.js >= 16
- npm or yarn
- Cloudflare Account
- Google OAuth Credentials

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Deployment

```bash
npm run deploy
```

## Environment Variables

Create a `.env` file with the following:

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
TIMEROOM_KV_ID=your_kv_namespace_id
```

## License

MIT
