# CTF Section Setup Guide

This guide explains how to set up the Hack The Box (HTB) API integration for the CTF section.

## Prerequisites

1. A Hack The Box account with an active subscription
2. Your HTB API token (see below)

## Getting Your HTB API Token

1. Log in to [Hack The Box](https://app.hackthebox.com)
2. Navigate to your profile settings: https://app.hackthebox.com/profile/settings
3. Scroll down to the "API Access" section
4. Copy your API token

## Environment Setup

1. Create a `.env.local` file in the root directory of the project:
   ```bash
   HTB_TOKEN=your_htb_api_token_here
   ```

2. **Important**: Never commit `.env.local` to version control. It should already be in `.gitignore`.

3. Restart your development server after adding the token:
   ```bash
   npm run dev
   ```

## How It Works

### Backend Flow

1. **User Profile Fetch**: The API route (`/api/htb/ctf`) first fetches your user profile to get your user ID
2. **Solved Machines**: It then fetches the list of machines you've solved/owned
3. **Machine Details**: For each solved machine, it fetches detailed information (tags, difficulty, OS, etc.)
4. **Normalization**: The data is normalized into a consistent format for the frontend
5. **Caching**: Results are cached for 1 hour to avoid hitting rate limits

### Frontend Flow

1. The CTF page (`/ctf`) uses the `useMachines` hook to fetch data from `/api/htb/ctf`
2. Machines are displayed in a responsive grid with filtering and sorting options
3. Each machine card shows:
   - Name, difficulty, OS, status
   - Points and rating
   - Solve date
   - Tags/techniques
   - Skill summary

## Features

- **Filtering**: By difficulty, OS, status, year, and techniques/tags
- **Sorting**: By solve date, difficulty, points, rating, or name
- **Pagination**: 12 machines per page with navigation
- **Statistics**: Dashboard showing total machines, difficulty breakdown
- **Responsive Design**: Works on mobile, tablet, and desktop

## API Endpoints Used

The implementation tries multiple endpoint variations to handle HTB API changes:

- `/api/v4/user/info` - User profile
- `/api/v4/user/machines/owned` - Solved machines list
- `/api/v4/machine/{id}` - Machine details

## Caching

- Cache TTL: 1 hour (3600 seconds)
- Cache key: `htb_ctf_machines`
- Cache is stored in-memory (resets on server restart)

For production, consider using Redis or a similar persistent cache.

## Error Handling

The implementation includes:

- Retry logic for network errors (up to 3 retries)
- Rate limit handling (429 responses)
- Authentication error handling (401 responses)
- Graceful degradation if machine details fail to load

## Troubleshooting

### "HTB_TOKEN environment variable is not set"

- Make sure you've created `.env.local` in the project root
- Verify the token is set correctly: `HTB_TOKEN=your_token_here`
- Restart your development server

### "HTB API authentication failed"

- Verify your API token is correct
- Check if your HTB subscription is active
- Regenerate your token if needed

### "Failed to fetch HTB data"

- Check your internet connection
- Verify HTB API is accessible
- Check browser console and server logs for detailed error messages

### No machines showing up

- Verify you have solved machines on HTB
- Check the API response in browser DevTools Network tab
- Verify the API endpoints are correct (HTB may have updated their API)

## Security Notes

- ✅ API token is **never** exposed to the browser
- ✅ All API calls are made server-side only
- ✅ Token is stored in environment variables
- ✅ `.env.local` should be in `.gitignore`

## Customization

### Adjust Cache TTL

Edit `app/api/htb/ctf/route.ts`:
```typescript
const CACHE_TTL = 3600; // Change to desired seconds
```

### Change Page Size

Edit `app/ctf/page.tsx`:
```typescript
const { ... } = useMachines({ filters, sortBy, pageSize: 12 }); // Change 12 to desired number
```

### Modify Skill Mappings

Edit `lib/types/htb.ts`:
```typescript
export const skillTagMapping: Record<string, string[]> = {
  // Add or modify mappings
};
```

## Production Deployment

When deploying to production (e.g., Vercel):

1. Add `HTB_TOKEN` to your deployment platform's environment variables
2. Ensure the environment variable is set before building
3. The API route will automatically use the production token

### Vercel Example

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `HTB_TOKEN` with your token value
4. Redeploy your application

