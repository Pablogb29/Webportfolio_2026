# HTB API Tags Limitation

## Current Status

The HTB API v4 endpoints (`/machine/paginated` and `/machine/list/retired/paginated`) do not include tags in their responses. Additionally, the individual machine detail endpoints (`/machine/{id}` and `/machine/profile/{id}`) also do not return tags.

## What We've Tried

1. ✅ Checked paginated endpoint responses - no tags field
2. ✅ Checked individual machine detail endpoints - no tags field
3. ✅ Tried multiple endpoint variations - no tags found

## Possible Solutions

### Option 1: Manual Tags (Recommended for Now)
Since tags aren't available via API, you can manually add tags to the JSON file. The structure supports tags:

```json
{
  "name": "TwoMillion",
  "os": "Linux",
  "difficulty": "Easy",
  "tags": ["Web", "Linux", "Privilege Escalation", "SUID"]
}
```

### Option 2: Use HTB Website Scraping
Tags are visible on the HTB website, but this would require:
- Web scraping (not recommended, violates ToS)
- More complex implementation
- Maintenance overhead

### Option 3: Wait for API Update
HTB may add tags to the API in future versions. Monitor their API changelog.

## Current Implementation

The script is set up to extract tags if they become available:
- ✅ Tags extraction logic is in place
- ✅ Components display tags when present
- ✅ Stats calculation includes tags
- ✅ Filtering by tags works

## Adding Tags Manually

You can edit `public/solved-machines.json` and add tags arrays to each machine. After editing, the frontend will automatically display them.

Example tags you might use:
- **Web**: Web, API Security, SSRF, SQL Injection, XSS
- **Active Directory**: AD, Kerberoasting, AS-REP Roasting, ACL Abuse, RBCD
- **Linux**: Linux, SUID, Capabilities, Sudo, Kernel Exploits
- **Windows**: Windows, Windows PrivEsc, PowerShell
- **Crypto**: Cryptography, Encryption, Hash Cracking, RSA
- **Forensics**: Forensics, Log Analysis, Memory Analysis
- **Network**: Network, SMB, FTP, SSH, Port Enumeration
- **Reverse Engineering**: Reverse Engineering, Binary Analysis, Ghidra

## Future Updates

If HTB adds tags to their API, simply update the script's `extractMachineData` function and re-run `npm run fetch-htb`.

