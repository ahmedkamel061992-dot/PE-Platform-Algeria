# PE Platform Algeria — Deployment Package

## Important status

**FINAL STATUS: NOT DEPLOYED**

This package contains the actual supplied platform HTML file preserved without modification, plus safe deployment scaffolding for static hosting.

### What is verified from the supplied file

- The platform is a large self-contained HTML application.
- It uses browser storage mechanisms including LocalStorage and IndexedDB.
- It contains pedagogical/suggestion engines and memo/export functionality.
- The supplied file itself was not edited.

### What is NOT fabricated

The supplied project files available for this package did not include an actual NestJS backend source tree, package.json for that backend, Supabase DDL/migrations, or a real admin API implementation. Those files are therefore not invented here.

This matters because a fake backend would give a false impression that registration, payment approval, permanent activation, admin RBAC, and cloud persistence were already implemented.

## Static frontend

`frontend/index.html` is a byte-for-byte copy of the supplied platform file. The original is also retained at the project root.

Cloudflare Pages can serve the `frontend` directory as a static site.

## API configuration

`frontend/config.js` contains only:

`window.ENV_API_URL = "";`

Set the real Render API URL only after a real backend has been deployed. No secret belongs in this file.

## Business model requested

- One-time payment: **1000 DZD**.
- After administrator approval, activation is **permanent**.
- No monthly or yearly renewal is intended.

This business rule is documented here, but it is NOT claimed to be implemented in the supplied HTML/backend because the actual backend/payment source was not supplied.

## Cloudflare Pages

Use:
- Root directory: `frontend`
- Build command: none
- Output directory: `.`

Deploy only after reviewing the frontend and, if API functionality is required, after the real backend exists.
