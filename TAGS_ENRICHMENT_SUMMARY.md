# HTB Tags & Skills Enrichment - Implementation Summary

## ✅ Completed Implementation

### 1. Tags Endpoint Enrichment

**Endpoint Added:**
- `GET https://labs.hackthebox.com/api/v4/machine/tags/:id`
- Also tries `https://www.hackthebox.com/api/v4/machine/tags/:id` as fallback

**Response Structure:**
```json
{
  "info": [
    {
      "id": 3628,
      "name": "Web Application",
      "category": "Area of Interest"
    },
    {
      "id": 3645,
      "name": "Remote Code Execution",
      "category": "Vulnerability"
    }
  ]
}
```

**Parsing Logic:**
- Extracts all tags from `info` array
- Groups tags by `category` into `tagGroups`
- Extracts `attackPaths` from categories containing "Attack Path" or "Path"
- Flattens all tags into `tags` array

### 2. Skills Mapping System

**File:** `scripts/skills-map.json`

**Strategy:**
- Skills are **derived from tags** using a mapping file
- Each tag maps to one or more skills
- Supports exact and partial matching
- Fallback keyword matching for common patterns

**Example Mappings:**
```json
{
  "OS Command Injection": ["Web Exploitation"],
  "SUID Exploitation": ["Linux PrivEsc"],
  "Kerberos": ["Active Directory"],
  "Misconfiguration": ["System Hardening", "Security Assessment"]
}
```

**Derivation Logic:**
1. Check exact tag match in skills-map.json
2. Check partial match (tag contains mapped tag or vice versa)
3. Keyword-based fallback matching
4. Return unique, sorted skills array

### 3. Difficulty Ratings

**Source:** `/machine/profile/:id` → `feedbackForChart`

**Stored As:**
```json
{
  "difficultyRatings": {
    "counterCake": 960,
    "counterVeryEasy": 1304,
    "counterEasy": 6315,
    "counterMedium": 2519,
    "counterHard": 624,
    ...
  }
}
```

### 4. Concurrency & Retries

**Implementation:**
- Uses `p-limit` library for concurrency control
- **Concurrency limit:** 4 parallel requests
- **Retry logic:** 3 attempts with exponential backoff
  - Initial delay: 500ms
  - Backoff: 500ms → 1000ms → 2000ms
- Handles HTTP 429 (rate limiting) and 5xx errors

**Enrichment Flow:**
1. Fetch all machines (paginated)
2. Filter solved machines
3. Fetch profiles (concurrency: 4)
4. Fetch tags (concurrency: 4)
5. Extract and combine data

### 5. Output JSON Structure

**File:** `public/htb/solved-machines.json`

```json
{
  "lastUpdated": "2025-12-17T...",
  "total": 36,
  "machines": [
    {
      "id": 547,
      "name": "TwoMillion",
      "os": "Linux",
      "difficulty": "Easy",
      "solveDate": null,
      "htbUrl": "https://app.hackthebox.com/machines/547",
      "tags": ["Web Application", "Remote Code Execution", ...],
      "attackPaths": [],
      "skills": ["Web Exploitation"],
      "difficultyRatings": {
        "counterEasy": 6315,
        "counterMedium": 2519,
        ...
      }
    }
  ]
}
```

### 6. Frontend Updates

**Components Updated:**
- ✅ `MachineCard.tsx` - Displays tags, attack paths, and skills
- ✅ `MachineListItem.tsx` - Displays tags, attack paths, and skills
- ✅ `FiltersBar.tsx` - Added skills filter, fixed alignment
- ✅ `useMachines.ts` - Added skills filtering logic

**Display:**
- **Tags:** Purple chips (max 3 + "+N more")
- **Attack Paths:** Orange chips (max 3 + "+N more")
- **Skills:** Cyan chips (max 3 + "+N more")

**Filters:**
- Filter by tags (multi-select)
- Filter by skills (multi-select)
- Filter by OS, difficulty, status, year (existing)

## 📊 Current Status

### ✅ Working:
- Tags fetching from `/machine/tags/:id`
- Tags parsing and normalization
- Skills derivation from tags
- Difficulty ratings extraction
- Concurrency control (4 parallel requests)
- Retry logic with exponential backoff
- Frontend display of tags/skills/attackPaths
- Tag and skill filters

### 📝 Notes:
- **Attack Paths:** Currently empty because HTB tags don't have an "Attack Path" category. The parser is ready to extract them when available.
- **Skills:** Derived from tags using `skills-map.json`. You can edit this file to add more mappings.
- **Solve Date:** Currently `null` because HTB API doesn't provide solve dates in paginated responses. Would need to fetch from user profile endpoint.

## 🚀 Usage

### Run the Script:
```bash
npm run fetch-htb
```

### Update Skills Mapping:
Edit `scripts/skills-map.json` to add/modify tag-to-skill mappings.

### Output Location:
- JSON: `public/htb/solved-machines.json`
- API: `/api/htb/ctf`
- Frontend: `/ctf`

## 📁 Files Modified

1. `scripts/fetchSolvedMachines.js` - Added tags endpoint, skills mapping
2. `scripts/skills-map.json` - Tag-to-skill mappings
3. `app/api/htb/ctf/route.ts` - Handles new JSON structure
4. `lib/types/htb.ts` - Added attackPaths field
5. `components/MachineCard.tsx` - Display attack paths
6. `components/MachineListItem.tsx` - Display attack paths
7. `components/FiltersBar.tsx` - Skills filter, fixed alignment
8. `hooks/useMachines.ts` - Skills filtering

## ✨ Features

- ✅ Tags from HTB API
- ✅ Skills derived from tags
- ✅ Attack paths extraction (ready when available)
- ✅ Difficulty ratings from community feedback
- ✅ Concurrency control
- ✅ Retry logic
- ✅ Frontend filters
- ✅ Chip display (max 3 + "+N more")

