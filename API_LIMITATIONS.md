# HTB API v4 Limitations - Tags, Skills, Attack Paths

## Issue

The `tags`, `skills`, and `attack_paths` fields are empty in the generated JSON file because **HTB API v4 does not expose these fields** through the available endpoints.

## What We've Tested

### Endpoints Checked:
1. ✅ `/machine/paginated` - Returns basic machine info, but **no tags/skills**
2. ✅ `/machine/list/retired/paginated` - Returns basic machine info, but **no tags/skills**
3. ✅ `/machine/profile/:id` - Returns detailed profile, but **no tags/skills/attack_paths**

### Fields Available in API Responses:
- ✅ `id`, `name`, `os`, `difficulty`, `difficultyText`
- ✅ `points`, `static_points`, `stars` (rating)
- ✅ `maker`, `avatar`, `release`, `retired`
- ✅ `user_owns_count`, `root_owns_count`
- ✅ `authUserInUserOwns`, `authUserInRootOwns`
- ❌ `tags` - **NOT AVAILABLE**
- ❌ `skills` - **NOT AVAILABLE**
- ❌ `attack_paths` - **NOT AVAILABLE**

## Why This Happens

HTB displays tags, skills, and attack paths on their website, but these are **not exposed through their public API v4**. This is a limitation of the API itself, not our implementation.

## Solutions

### Option 1: Manual Data Entry (Recommended)
Manually add tags and skills to `public/htb/solved-machines.json` based on the HTB website:

```json
{
  "id": 547,
  "name": "TwoMillion",
  "os": "Linux",
  "difficulty": "Easy",
  "solveDate": null,
  "htbUrl": "https://app.hackthebox.com/machines/547",
  "skills": ["Enumeration", "Linux", "Privilege Escalation"],
  "tags": ["Web", "Linux", "SUID"],
  "attackPaths": [],
  "difficultyRatings": null
}
```

### Option 2: Use HTB Website Data
Visit each machine page on HTB and extract:
- Tags (shown on machine page)
- Skills (listed in machine description)
- Attack paths (if documented)

### Option 3: Wait for API Update
Monitor HTB API documentation for future endpoints that might expose this data.

## Current Implementation Status

✅ **Script is ready** - When/if HTB adds these fields to the API, they will be automatically extracted
✅ **Frontend is ready** - Components display tags/skills when present
✅ **Filters work** - Tag and skill filters are functional

## How to Add Data Manually

1. Open `public/htb/solved-machines.json`
2. For each machine, add arrays:
   - `"tags": ["Tag1", "Tag2"]`
   - `"skills": ["Skill1", "Skill2"]`
3. Save the file
4. Refresh the frontend - tags/skills will appear automatically

## Example Tags/Skills by Machine Type

### Linux Machines:
- **Tags**: Linux, Web, Network, Crypto, Forensics
- **Skills**: Enumeration, Privilege Escalation, SUID Exploitation, Linux Capabilities

### Windows Machines:
- **Tags**: Windows, Active Directory, Network
- **Skills**: Enumeration, Windows PrivEsc, Kerberoasting, AS-REP Roasting

### Web-Focused:
- **Tags**: Web, API Security
- **Skills**: SQL Injection, XSS, SSRF, LFI/RFI, SSTI

## Notes

- The script will continue to fetch profile data (for future API updates)
- Empty arrays `[]` are valid and won't cause errors
- Frontend gracefully handles missing tags/skills
- You can update the JSON file anytime and the frontend will reflect changes

