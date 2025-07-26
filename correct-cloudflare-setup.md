# CORRECT Cloudflare DNS Setup

## What You Need to Change

**Currently you have:**
- Type: CNAME
- Name: _replit-verify
- Target: project.replit.app

**You need to REPLACE this with:**

## Record 1 (Root Domain)
- **Type**: A (not CNAME)
- **Name**: @ (not _replit-verify)
- **IPv4 address**: 34.111.179.208 (not the replit.app URL)
- **Proxy status**: DNS only (gray cloud)

## Record 2 (WWW Subdomain) 
- **Type**: A (not CNAME)
- **Name**: www
- **IPv4 address**: 34.111.179.208
- **Proxy status**: DNS only (gray cloud)

## Steps to Fix:
1. DELETE the current CNAME record you just created
2. Click "Add record" 
3. Select "A" from the Type dropdown (not CNAME)
4. Enter "@" in the Name field
5. Enter "34.111.179.208" in the IPv4 address field
6. Set Proxy to "DNS only" (gray cloud)
7. Click Save
8. Repeat for "www" subdomain

The key difference: Use A records with IP address, not CNAME records with URLs.