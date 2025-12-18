# HTB API v4 - Available Machine Data Fields

Based on the HTB API v4 structure, here are the relevant fields available from the `/machine/paginated` and `/machine/list/retired/paginated` endpoints:

## Currently Extracted Fields

The script currently extracts only:
- `name` - Machine name
- `os` - Operating System (Linux, Windows, etc.)
- `difficultyText` - Difficulty level (Easy, Medium, Hard, Insane)

## Additional Available Fields

### Machine Identity
- `id` - Unique machine ID
- `name` - Machine name
- `avatar` - Machine thumbnail/image URL
- `maker` - Object with maker information:
  - `id` - Maker user ID
  - `name` - Maker username
  - `avatar` - Maker avatar URL
- `maker2` - Second maker (if applicable)

### Classification
- `difficulty` - Numeric difficulty (0-100)
- `difficultyText` - Text difficulty ("Easy", "Medium", "Hard", "Insane", "Tutorial")
- `difficultyCharts` - Object with:
  - `cve` - CVE-based difficulty rating
  - `realworld` - Real-world difficulty rating
  - `custom` - Custom difficulty rating
- `os` - Operating System ("Linux", "Windows", "FreeBSD", "OpenBSD", "Other")

### Status & Dates
- `active` - Boolean indicating if machine is active
- `retired` - Boolean indicating if machine is retired
- `retired_date` - ISO date string when machine was retired (null if active)
- `release` - ISO date string when machine was released
- `free` - Boolean indicating if machine is free
- `recommended` - Boolean indicating if machine is recommended

### Scoring & Ratings
- `points` - Points awarded for solving the machine
- `rating` - Community rating (0-5 or similar)
- `user_owns` - Number of users who solved user flag
- `root_owns` - Number of users who solved root flag
- `system_owns` - Number of users who solved system flag (if applicable)

### User Progress (when authenticated)
- `authUserInUserOwns` - Boolean: true if authenticated user solved user flag
- `authUserInRootOwns` - Boolean: true if authenticated user solved root flag
- `authUserInSystemOwns` - Boolean: true if authenticated user solved system flag
- `authUserFirstUserBlood` - Boolean: first blood on user flag
- `authUserFirstRootBlood` - Boolean: first blood on root flag
- `authUserFirstSystemBlood` - Boolean: first blood on system flag

### Technical Content
- `tags` - Array of tag objects:
  - `id` - Tag ID
  - `name` - Tag name (e.g., "Active Directory", "Web", "Crypto")
  - `description` - Tag description (optional)

### Play Information
- `playInfo` - Object with:
  - `isSpawned` - Boolean: machine is currently spawned
  - `isSpawning` - Boolean: machine is currently spawning
  - `canSpawn` - Boolean: user can spawn this machine

## Recommended Additional Fields to Extract

For a more comprehensive portfolio display, consider extracting:

1. **Points** - Shows the value/reward of each machine
2. **Rating** - Community rating shows machine quality
3. **Tags** - Technical tags show skills demonstrated
4. **Release Date** - Shows when machine was released (timeline)
5. **Retired Date** - Shows when machine was retired
6. **Maker** - Credits the machine creator
7. **Avatar** - Machine thumbnail for visual appeal

## Example Enhanced JSON Structure

```json
{
  "lastUpdated": "2025-12-17T...",
  "total": 36,
  "machines": [
    {
      "id": 123,
      "name": "TwoMillion",
      "os": "Linux",
      "difficulty": "Easy",
      "difficultyText": "Easy",
      "points": 20,
      "rating": 4.5,
      "tags": ["Web", "Linux", "Privilege Escalation"],
      "releaseDate": "2023-01-15T00:00:00Z",
      "retiredDate": null,
      "maker": "HTB Team",
      "avatar": "https://..."
    }
  ]
}
```

## Updating the Script

To extract additional fields, modify `scripts/fetchSolvedMachines.js`:

```javascript
function extractMachineData(machine) {
  return {
    id: machine.id,
    name: machine.name || "Unknown",
    os: machine.os || "Other",
    difficulty: machine.difficultyText || machine.difficulty || "Easy",
    points: machine.points || 0,
    rating: machine.rating,
    tags: machine.tags?.map(tag => tag.name || tag) || [],
    releaseDate: machine.release,
    retiredDate: machine.retired_date || null,
    maker: machine.maker?.name,
    avatar: machine.avatar,
  };
}
```

## API Endpoints Reference

- **Active Machines**: `GET https://labs.hackthebox.com/api/v4/machine/paginated?page={page}`
- **Retired Machines**: `GET https://labs.hackthebox.com/api/v4/machine/list/retired/paginated?page={page}`

Both endpoints require:
- `Authorization: Bearer {HTB_TOKEN}` header
- Pagination via `?page={pageNumber}` query parameter

