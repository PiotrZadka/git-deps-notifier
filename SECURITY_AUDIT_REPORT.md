# Security Audit Report for git-deps-notifier

**Date**: 2026-01-02  
**Auditor**: GitHub Copilot Security Agent  
**Repository**: PiotrZadka/git-deps-notifier  
**Version**: 1.0.7

## Executive Summary

This security audit identified **6 security issues** ranging from **CRITICAL** to **LOW** severity. The most critical issue is the exposure of OAuth client secrets in client-side code, which should be addressed immediately. Additionally, a vulnerable dependency (axios) was identified that should be updated.

---

## Findings

### 1. 🔴 CRITICAL: OAuth Client Secret Exposed in Client-Side Code

**Location**: `src/pages/popup/hooks/useGitAuth.tsx` (lines 24-26, 51)

**Description**: 
The OAuth client secret is embedded in the client-side code and exposed through environment variables. This is a critical security vulnerability because:
- Client-side code can be easily inspected by anyone
- The secret can be extracted from the compiled extension
- Attackers can use the secret to impersonate the application
- This violates OAuth 2.0 security best practices

**Code**:
```typescript
const CLIENT_SECRET = navigator.userAgent.includes("Firefox")
  ? import.meta.env.VITE_OAUTH_FIREFOX_CLIENT_SECRET
  : import.meta.env.VITE_OAUTH_CHROME_CLIENT_SECRET;
```

**Impact**: 
- **Severity**: CRITICAL
- An attacker can extract the client secret and make unauthorized OAuth requests
- Can lead to account compromise and abuse of the GitHub API
- Violates GitHub OAuth security guidelines

**Recommendation**:
1. **Remove client secret from client-side code immediately**
2. Implement a backend proxy server to handle OAuth token exchange
3. Use PKCE (Proof Key for Code Exchange) flow for OAuth if possible (RFC 7636)
4. For browser extensions, consider using GitHub's Device Flow or Implicit Grant (deprecated but sometimes necessary for extensions)
5. If a backend is not feasible, regenerate the OAuth application secrets immediately after fixing

**References**:
- [OAuth 2.0 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
- [GitHub OAuth Best Practices](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/best-practices-for-oauth-apps)

---

### 2. 🟠 HIGH: Vulnerable Dependency - axios

**Location**: `package.json` (line 24)

**Description**:
The project uses axios version 1.8.4, which has known security vulnerabilities related to Denial of Service (DoS) attacks through lack of data size check.

**Vulnerability Details**:
- **CVE**: Multiple DoS vulnerabilities
- **Current Version**: 1.8.4
- **Affected Versions**: >= 1.0.0, < 1.12.0
- **Patched Version**: 1.12.0

**Impact**:
- **Severity**: HIGH
- Application vulnerable to DoS attacks
- Potential for resource exhaustion
- Can affect extension performance and user experience

**Recommendation**:
Update axios to version 1.12.0 or later:
```bash
npm install axios@^1.12.0
# or
yarn upgrade axios@^1.12.0
```

---

### 3. 🟠 HIGH: Sensitive Token Storage in localStorage

**Location**: Multiple files
- `src/pages/popup/hooks/useGitAuth.tsx` (line 63)
- `src/pages/popup/data/getDependencies.tsx` (lines 16, 55, 69)
- `src/pages/popup/data/getRelease.tsx` (line 10)

**Description**:
GitHub access tokens are stored in localStorage, which is vulnerable to XSS (Cross-Site Scripting) attacks. If an attacker can inject malicious JavaScript, they can steal the access token.

**Code**:
```typescript
localStorage.setItem("apiToken", access_token);
const authToken = localStorage.getItem("apiToken");
```

**Impact**:
- **Severity**: HIGH
- XSS attacks can steal user's GitHub access token
- Compromised tokens give attackers full access to user's GitHub account
- localStorage persists across sessions, increasing exposure window

**Recommendation**:
1. Use browser extension's secure storage API:
   - Chrome: `chrome.storage.local` or `chrome.storage.secure`
   - Firefox: `browser.storage.local` with proper encryption
2. Implement token encryption before storage
3. Set token expiration and refresh mechanism
4. Clear tokens on logout and when no longer needed

**Example**:
```typescript
// Instead of localStorage
await chrome.storage.local.set({ apiToken: access_token });
const { apiToken } = await chrome.storage.local.get('apiToken');
```

---

### 4. 🟡 MEDIUM: OAuth Client ID Exposed in manifest.json

**Location**: `manifest.json` (line 13)

**Description**:
The OAuth client ID is hardcoded in the manifest.json file. While client IDs are generally considered public, having them in the manifest makes it easier for attackers to attempt abuse.

**Code**:
```json
"oauth2": {
  "client_id": "Ov23liJlNdmOvK4pZ924",
  "scopes": ["repo", "user"]
}
```

**Impact**:
- **Severity**: MEDIUM
- Client ID can be used to attempt OAuth attacks
- Makes it easier for attackers to identify the OAuth application
- Combined with the client secret leak (Issue #1), this is more severe

**Recommendation**:
1. This is standard for browser extensions, but ensure the client secret is never exposed (see Issue #1)
2. Monitor OAuth application for unusual activity
3. Consider rate limiting on your OAuth application
4. Use environment-specific client IDs for development/production

---

### 5. 🟡 MEDIUM: Missing Content Security Policy (CSP)

**Location**: `manifest.json` and `vite.config.base.ts`

**Description**:
The extension manifest does not define a Content Security Policy, which is a defense-in-depth mechanism against XSS attacks.

**Impact**:
- **Severity**: MEDIUM
- Reduced protection against XSS attacks
- Inline scripts and unsafe evaluations could be executed
- No protection against loading resources from untrusted sources

**Recommendation**:
Add CSP to manifest.json:
```json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'; connect-src https://api.github.com https://registry.npmjs.org"
  }
}
```

**Note**: For Manifest V3, CSP has restrictions. Adjust according to your needs but keep it as strict as possible.

---

### 6. 🟡 MEDIUM: Insufficient Input Validation

**Location**: `src/utils/utils.tsx` (line 7-9)

**Description**:
The GitHub URL validation uses a regex that might not catch all edge cases or malicious inputs.

**Code**:
```typescript
export const isValidGitHubUrl = (url: string) => {
  const githubUrlRegex =
    /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
  return githubUrlRegex.test(url);
};
```

**Issues**:
- Allows `http://` which should probably be `https://` only
- Doesn't validate against path traversal attempts
- Doesn't check for maximum length
- Could be bypassed with encoded characters

**Impact**:
- **Severity**: MEDIUM
- Potential for injection attacks if URLs are used unsafely
- May accept malformed URLs that cause errors
- Security-by-validation is weakened

**Recommendation**:
Enhance validation:
```typescript
export const isValidGitHubUrl = (url: string): boolean => {
  // Enforce HTTPS only
  const githubUrlRegex = /^https:\/\/github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_.-]+$/;
  
  // Check max length to prevent DoS
  if (url.length > 255) return false;
  
  // Basic test
  if (!githubUrlRegex.test(url)) return false;
  
  try {
    const parsed = new URL(url);
    // Additional checks
    return parsed.hostname === 'github.com' && 
           parsed.pathname.split('/').length === 3;
  } catch {
    return false;
  }
};
```

---

## Additional Observations

### ✅ Positive Security Practices

1. **No use of `eval()`, `innerHTML`, or `dangerouslySetInnerHTML`** - The codebase avoids dangerous DOM manipulation methods
2. **React Markdown with sanitization** - Uses `react-markdown` with `remark-gfm` which provides safe markdown rendering
3. **Input validation exists** - There is basic URL validation in place
4. **HTTPS for external APIs** - All external API calls use HTTPS
5. **No hardcoded credentials in code** - Besides the OAuth client secret issue, no other credentials are hardcoded

### 🔵 Recommendations for Future Improvements

1. **Implement Content Security Policy** - Add CSP headers to prevent XSS
2. **Add rate limiting** - Implement rate limiting for API calls to prevent abuse
3. **Token refresh mechanism** - Implement OAuth token refresh for long-lived sessions
4. **Audit logging** - Add logging for security-relevant events
5. **Dependency scanning** - Set up automated dependency vulnerability scanning (e.g., Dependabot, Snyk)
6. **Code signing** - Sign the extension to ensure integrity
7. **Minimal permissions** - Review manifest permissions and remove unused ones
8. **CORS validation** - Ensure proper CORS handling for API requests
9. **Error handling** - Avoid exposing sensitive information in error messages

---

## Priority Action Items

### Immediate (Fix within 24 hours)
1. **Remove OAuth client secret from client-side code** (Issue #1)
2. **Regenerate OAuth application secrets** after fixing Issue #1
3. **Update axios to 1.12.0+** (Issue #2)

### Short-term (Fix within 1 week)
4. **Migrate token storage to chrome.storage** (Issue #3)
5. **Implement Content Security Policy** (Issue #5)

### Medium-term (Fix within 1 month)
6. **Enhance URL validation** (Issue #6)
7. **Set up automated dependency scanning**
8. **Implement OAuth backend proxy** (permanent fix for Issue #1)

---

## Testing Recommendations

After implementing fixes:
1. Test OAuth flow with new backend proxy
2. Verify token storage in chrome.storage works correctly
3. Test CSP doesn't break existing functionality
4. Verify updated axios doesn't introduce breaking changes
5. Test URL validation with edge cases
6. Perform penetration testing on the extension

---

## Compliance Notes

- **GDPR**: Ensure user consent for token storage
- **OAuth 2.0**: Current implementation violates OAuth security guidelines (Issue #1)
- **Extension Store Policies**: Both Chrome Web Store and Firefox Add-ons have security requirements that should be reviewed

---

## Conclusion

The git-deps-notifier extension has a solid foundation with good use of modern React practices and safe DOM manipulation. However, the **critical OAuth client secret exposure** must be addressed immediately. The other issues, while important, are of lower severity but should still be addressed in a timely manner.

The development team should prioritize:
1. Immediate removal of client secrets from client-side code
2. Updating vulnerable dependencies
3. Implementing proper secure storage for tokens
4. Adding defense-in-depth measures like CSP

With these fixes, the extension will have a much stronger security posture and better protect user data.

---

**Report prepared by**: GitHub Copilot Security Agent  
**Contact**: For questions about this report, please open an issue in the repository
