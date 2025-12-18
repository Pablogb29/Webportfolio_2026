# CTF Section Implementation Summary

## Endpoint Flow

### Backend API Route: `/api/htb/ctf`

**Flow:**
1. **Check Cache** → Returns cached data if available (1 hour TTL)
2. **Fetch User Profile** → `GET /api/v4/user/info` to get user ID
3. **Fetch Solved Machines** → `GET /api/v4/user/machines/owned` (or fallback endpoints)
4. **Fetch Machine Details** → `GET /api/v4/machine/{id}` for each machine (batched, 5 concurrent)
5. **Normalize Data** → Transform HTB API responses into consistent `MachineSolved[]` format
6. **Calculate Statistics** → Generate stats (by difficulty, OS, status, year, tags)
7. **Cache & Return** → Store in cache and return `MachinesResponse`

**Error Handling:**
- 401: Authentication failed → Returns 500 with error message
- 429: Rate limit → Retries with exponential backoff
- Network errors: Retries up to 3 times
- Missing machine details: Creates minimal entry with available data

## Recommended Schema

### Frontend Model: `MachineSolved`

#### Public Fields (Displayed in UI)

**Machine Identity:**
- `id` (number) - Machine ID
- `name` (string) - Machine name
- `url` (string) - HTB machine URL
- `image` (string, optional) - Avatar/thumbnail URL

**Classification:**
- `difficulty` ("Easy" | "Medium" | "Hard" | "Insane" | "Tutorial")
- `os` ("Linux" | "Windows" | "Other" | "FreeBSD" | "OpenBSD")
- `status` ("Active" | "Retired")
- `points` (number) - Points awarded
- `rating` (number, optional) - Community rating

**Dates:**
- `solveDate` (string) - ISO date when user solved it
- `releaseDate` (string, optional) - When machine was released
- `retiredDate` (string, optional) - When machine was retired

**Technical Content:**
- `tags` (string[]) - Array of technique/tag names
- `skillSummary` (string, optional) - Auto-generated description
- `skillHighlights` (string[], optional) - Inferred skills from tags

**Makers:**
- `maker` (string, optional) - Primary creator
- `maker2` (string, optional) - Secondary creator

#### Internal Fields (Not displayed, used for filtering/sorting)

- `difficultyNumeric` (number) - Numeric difficulty for sorting (0-100)
- `isActive` (boolean) - Active status flag
- `isRetired` (boolean) - Retired status flag
- `type` ("Machine" | "Challenge") - Machine type
- `userOwns` (number, optional) - User owns count
- `rootOwns` (number, optional) - Root owns count
- `systemOwns` (number, optional) - System owns count
- `tagDetails` (HTBMachineTag[], optional) - Full tag objects

### Statistics Model: `MachinesResponse.stats`

```typescript
{
  total: number;                    // Total machines solved
  byDifficulty: Record<string, number>;  // Count by difficulty
  byOS: Record<string, number>;     // Count by OS
  byStatus: Record<string, number>; // Count by status
  byYear: Record<string, number>;    // Count by solve year
  uniqueTags: string[];             // All unique tags across machines
}
```

## Information Extracted from HTB API

### Available Fields Per Machine

**Machine Identity:**
- ✅ Machine ID
- ✅ Machine name
- ✅ HTB URL (constructed)
- ✅ Avatar/thumbnail image
- ✅ Type (Machine/Challenge)

**Classification:**
- ✅ Difficulty (text + numeric mapping)
- ✅ Operating System
- ✅ Points
- ✅ Status (Active/Retired)
- ✅ Community rating

**Dates:**
- ✅ Release date
- ✅ Retirement date
- ✅ Solve date (from user owns list)

**Progress:**
- ✅ User own date
- ✅ Root own date (if available)
- ✅ System own date (if available)

**Technical Content:**
- ✅ Tags/techniques (array)
- ✅ Tag descriptions (if available)
- ✅ Maker information

**Derived Fields (Generated):**
- ✅ Skill highlights (inferred from tags)
- ✅ Skill summary (auto-generated description)
- ✅ Difficulty numeric (for sorting)

## Portfolio-Friendly Features

### Skill Highlights

Automatically inferred from tags using `skillTagMapping`:
- "Active Directory" → Kerberoasting, AS-REP Roasting, ACL Abuse, RBCD, DCSync, BloodHound
- "Web" → SQL Injection, XSS, SSRF, LFI/RFI, SSTI, Deserialization, API Security
- "Crypto" → Cryptography, Encryption, Hash Cracking, RSA
- "Forensics" → Log Analysis, Memory Analysis, File Analysis, Network Forensics
- "Privilege Escalation" → SUID, Capabilities, Sudo, Kernel Exploits, Windows PrivEsc
- And more...

### Skill Summary

Auto-generated per machine based on tags, difficulty, and OS:
- Example: "Demonstrates medium Active Directory exploitation techniques including enumeration, privilege escalation, and lateral movement."

### Statistics Dashboard

Aggregated counts showing:
- Total machines solved
- Breakdown by difficulty (Easy, Medium, Hard, Insane)
- Breakdown by OS (Linux, Windows, etc.)
- Breakdown by status (Active, Retired)
- Breakdown by year
- Unique techniques/tags used

## Component Structure

```
app/ctf/page.tsx
├── Header Section
├── Statistics Dashboard
├── FiltersBar Component
│   ├── Filter Toggles (Difficulty, OS, Status, Year, Tags)
│   └── Sort Dropdown
├── Machines Grid
│   └── MachineCard Component (x N)
│       ├── Header (Name, Difficulty, OS, Status)
│       ├── Stats (Points, Rating, Solve Date)
│       ├── Tags Display
│       ├── Skill Summary
│       └── Footer (HTB Link, Maker)
└── Pagination Controls
```

## Data Flow

```
HTB API
  ↓
HTBClient (lib/htb-client.ts)
  ↓
API Route (/api/htb/ctf/route.ts)
  ↓
Cache (lib/cache.ts)
  ↓
useMachines Hook (hooks/useMachines.ts)
  ↓
Filters & Sort
  ↓
CTF Page (app/ctf/page.tsx)
  ↓
MachineCard Components
```

## Security Implementation

✅ **Server-Side Only**: All HTB API calls happen server-side  
✅ **Token Protection**: API token stored in `.env.local`, never exposed  
✅ **Error Handling**: Graceful handling of auth failures, rate limits  
✅ **Caching**: Reduces API calls and respects rate limits  
✅ **Retry Logic**: Handles transient network errors  

## Performance Optimizations

- **Caching**: 1-hour TTL reduces API calls
- **Batched Requests**: Machine details fetched in batches of 5
- **Pagination**: Only renders 12 machines per page
- **Memoization**: Filters and sorting use React `useMemo`
- **Lazy Loading**: Components load on demand

## Future Enhancements

Potential improvements:
- [ ] Export to CSV/JSON
- [ ] Machine search by name
- [ ] Detailed machine view modal
- [ ] Writeup links integration
- [ ] Progress tracking over time
- [ ] Skill radar chart
- [ ] Comparison with other users (if API supports)
- [ ] Redis cache for production
- [ ] Webhook for real-time updates

