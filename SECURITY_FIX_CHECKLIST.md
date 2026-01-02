# Security Fix Checklist

This checklist provides step-by-step instructions to fix the identified security issues.

## 🔴 CRITICAL PRIORITY (Fix Immediately)

### [ ] 1. Remove OAuth Client Secret from Client-Side Code

**Current Issue**: Client secret exposed in `src/pages/popup/hooks/useGitAuth.tsx`

**Option A: Backend Proxy (Recommended)**
1. Create a backend server (e.g., Node.js, Python, Go)
2. Move OAuth token exchange logic to backend
3. Backend should:
   ```
   - Receive authorization code from extension
   - Exchange code for token using client secret (server-side only)
   - Return token to extension
   - Never expose client secret to client
   ```
4. Update extension to call backend API instead of GitHub directly
5. Remove `VITE_OAUTH_*_CLIENT_SECRET` from env files

**Option B: Use PKCE Flow (If GitHub supports it for your use case)**
1. Implement OAuth 2.0 PKCE (Proof Key for Code Exchange)
2. No client secret needed with PKCE
3. Update OAuth flow in `useGitAuth.tsx`

**After Fix**:
- [ ] Regenerate OAuth client secrets in GitHub
- [ ] Update OAuth application with new secrets (server-side only)
- [ ] Test OAuth flow thoroughly
- [ ] Remove old secrets from any environment files
- [ ] Clear browser extension storage on all test machines

---

## 🟠 HIGH PRIORITY (Fix Within 24-48 Hours)

### [ ] 2. Update axios Dependency

**Steps**:
```bash
# Update axios to fix DoS vulnerabilities
npm install axios@^1.12.0

# Or with yarn
yarn upgrade axios@^1.12.0

# Test that nothing breaks
npm run build
npm run dev
```

**Verify**:
- [ ] Check `package.json` shows axios version >= 1.12.0
- [ ] Run build successfully
- [ ] Test API calls still work (npm registry, GitHub API)
- [ ] Check for any breaking changes in axios changelog

### [ ] 3. Migrate Token Storage to Secure Storage

**Current Issue**: Tokens in localStorage are vulnerable to XSS

**Steps**:

1. Create a secure storage utility (`src/utils/secureStorage.ts`):
```typescript
export const secureStorage = {
  async setToken(token: string): Promise<void> {
    await chrome.storage.local.set({ apiToken: token });
  },
  
  async getToken(): Promise<string | null> {
    const result = await chrome.storage.local.get('apiToken');
    return result.apiToken || null;
  },
  
  async removeToken(): Promise<void> {
    await chrome.storage.local.remove('apiToken');
  }
};
```

2. Update all files that use localStorage for tokens:
   - `src/pages/popup/hooks/useGitAuth.tsx` (line 63)
   - `src/pages/popup/data/getDependencies.tsx` (lines 16, 55, 69)
   - `src/pages/popup/data/getRelease.tsx` (line 10)

3. Replace:
```typescript
// OLD
localStorage.setItem("apiToken", access_token);
const authToken = localStorage.getItem("apiToken");

// NEW
await secureStorage.setToken(access_token);
const authToken = await secureStorage.getToken();
```

4. Update function signatures to be async where needed

**Verify**:
- [ ] All token storage uses chrome.storage.local
- [ ] No localStorage calls for sensitive data remain
- [ ] Login/logout flow works correctly
- [ ] Tokens persist across extension reloads
- [ ] Old localStorage tokens are migrated (optional migration script)

---

## 🟡 MEDIUM PRIORITY (Fix Within 1 Week)

### [ ] 4. Add Content Security Policy

**Steps**:

1. Add to `manifest.json`:
```json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'; connect-src https://api.github.com https://github.com https://registry.npmjs.org"
  }
}
```

2. Test thoroughly - CSP may break some functionality

3. Adjust CSP as needed but keep it strict

**Verify**:
- [ ] Extension loads without CSP errors in console
- [ ] GitHub OAuth flow works
- [ ] API calls to GitHub work
- [ ] API calls to npm registry work
- [ ] No inline scripts are blocked

### [ ] 5. Enhance Input Validation

**Steps**:

1. Update `src/utils/utils.tsx`:
```typescript
export const isValidGitHubUrl = (url: string): boolean => {
  // Enforce max length
  if (!url || url.length > 255) return false;
  
  // Enforce HTTPS only
  const githubUrlRegex = /^https:\/\/github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_.-]+$/;
  
  if (!githubUrlRegex.test(url)) return false;
  
  try {
    const parsed = new URL(url);
    // Verify hostname and path structure
    if (parsed.hostname !== 'github.com') return false;
    
    const pathParts = parsed.pathname.split('/').filter(p => p.length > 0);
    if (pathParts.length !== 2) return false;
    
    return true;
  } catch {
    return false;
  }
};
```

2. Add additional sanitization for repo strings:
```typescript
export const sanitizeRepoString = (repo: string): string => {
  // Existing logic
  let sanitized = repo.split("#")[0];
  if (sanitized.endsWith(".git")) {
    sanitized = sanitized.slice(0, -4);
  }
  
  // Add: remove any query parameters
  sanitized = sanitized.split("?")[0];
  
  // Add: enforce max length
  if (sanitized.length > 255) {
    throw new Error("Repository URL too long");
  }
  
  return sanitized;
};
```

**Verify**:
- [ ] Valid GitHub URLs are accepted
- [ ] Invalid URLs are rejected
- [ ] HTTP URLs are rejected (only HTTPS accepted)
- [ ] Edge cases handled (very long URLs, special characters, etc.)
- [ ] Existing repositories still work

---

## 🔵 ONGOING (Set Up for Long-term Security)

### [ ] 6. Set Up Automated Dependency Scanning

**Steps**:

1. Enable Dependabot in GitHub:
   - Go to repository Settings → Security → Dependabot
   - Enable Dependabot alerts
   - Enable Dependabot security updates

2. Create `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

3. Alternative: Set up Snyk or other security scanning tool

**Verify**:
- [ ] Dependabot is enabled
- [ ] Alerts are received for vulnerable dependencies
- [ ] Auto-update PRs are created (optional)

### [ ] 7. Add Security Testing to CI/CD

**Steps**:

1. Create `.github/workflows/security.yml`:
```yaml
name: Security Scan

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run npm audit
        run: npm audit --audit-level=moderate
      - name: Run Snyk (optional)
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

**Verify**:
- [ ] Security workflow runs on every PR
- [ ] Builds fail on high/critical vulnerabilities
- [ ] Team is notified of security issues

---

## 📋 Post-Fix Verification Checklist

After implementing all fixes:

- [ ] All tests pass
- [ ] Extension builds successfully
- [ ] OAuth login flow works
- [ ] Repository addition/removal works
- [ ] Dependency tracking works
- [ ] No console errors
- [ ] Extension loads in Chrome
- [ ] Extension loads in Firefox
- [ ] No security warnings in browser
- [ ] Performed manual security testing
- [ ] Updated documentation
- [ ] Incremented version number
- [ ] Created release notes mentioning security fixes

---

## 📚 Additional Resources

- [OWASP Browser Extension Security](https://cheatsheetseries.owasp.org/cheatsheets/Browser_Extension_Security_Cheat_Sheet.html)
- [Chrome Extension Security](https://developer.chrome.com/docs/extensions/mv3/security/)
- [Firefox Extension Security](https://extensionworkshop.com/documentation/develop/security-best-practices/)
- [OAuth 2.0 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)

---

## 🚨 Emergency Response

If you believe the OAuth client secret has been compromised:

1. **Immediately** regenerate OAuth secrets in GitHub Developer Settings
2. Update backend with new secrets (do NOT put in client-side code)
3. Revoke all existing tokens if possible
4. Monitor for unusual activity in your OAuth app analytics
5. Notify users to re-authenticate
6. Consider rotating all affected credentials

---

**Questions?** Open an issue in the repository or contact the security team.
