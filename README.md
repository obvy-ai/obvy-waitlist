# Obvy Waitlist

A React-based waitlist landing page with Cloudflare Worker backend for newsletter subscriptions via Beehiiv API.

## Project Structure

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Cloudflare Worker
- **Newsletter**: Beehiiv API integration

## Setup

### Prerequisites

- Node.js (v20+)
- pnpm (or npm)
- Cloudflare account with Wrangler CLI

### Frontend Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Cloudflare Worker Setup

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
npx wrangler login
```

3. Set environment variables:
```bash
npx wrangler secret put BEEHIIV_API_KEY
```

4. Deploy worker:
```bash
npx wrangler deploy
```

## Environment Variables

### Worker Environment
- `BEEHIIV_API_KEY` - Your Beehiiv API key for newsletter subscriptions

## Updating Cloudflare Worker

To update the worker after making changes:

```bash
# Navigate to project root
cd /path/to/obvy-waitlist

# Deploy updated worker
npx wrangler deploy

# View worker logs (optional)
npx wrangler tail
```

The worker will be available at: `https://beehiiv-subscribe-proxy.obvy-ai.workers.dev`

## Development

1. Start the frontend dev server: `pnpm dev`
2. Update worker code in `worker/index.js`
3. Deploy worker changes: `wrangler deploy`
4. Test the integration

## Features

- Email validation
- Loading states
- Error handling
- CORS support for multiple domains
- Responsive design
- Success feedback

## API Endpoints

### POST /
Subscribe email to newsletter

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```
