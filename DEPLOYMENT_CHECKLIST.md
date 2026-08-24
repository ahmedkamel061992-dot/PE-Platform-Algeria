# Deployment Checklist

## Files
- [x] Original platform HTML preserved.
- [x] No secret placed in frontend.
- [x] `.env.example` contains names only.
- [x] `frontend/config.js` contains no secret.

## GitHub
- [ ] Create private repository.
- [ ] Add this package/project.
- [ ] Commit and push `main`.

## Backend
- [ ] Obtain actual backend source.
- [ ] Verify package.json.
- [ ] Verify build/start commands.
- [ ] Verify Supabase DDL/migrations.
- [ ] Verify authentication.
- [ ] Verify permanent 1000 DZD activation logic.
- [ ] Verify admin RBAC (ADMIN / TEACHER / 401 / 403).
- [ ] Deploy to Render.
- [ ] Test `GET /api/v1/health`.

## Cloudflare Pages
- [ ] Connect GitHub repository.
- [ ] Root directory = `frontend`.
- [ ] No build command.
- [ ] Output directory = `.`.
- [ ] Set the real API URL only after backend deployment.
- [ ] Test platform loading.
- [ ] Test `admin.html` only when an actual admin implementation exists.

## Payment
- [ ] Test teacher registration.
- [ ] Submit 1000 DZD payment receipt.
- [ ] Admin reviews receipt.
- [ ] Approval activates account permanently.
- [ ] Confirm no expiration date is applied.
- [ ] Confirm rejected payment does not activate account.

## Export
- [ ] Test Word export.
- [ ] Test PDF export.

## DNS
- [ ] Configure custom domain later.

**Status: NOT DEPLOYED**
