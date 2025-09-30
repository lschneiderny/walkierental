# Deployment Guide - Vercel

This guide covers deploying WalkieRentals to Vercel with all necessary configurations.

## Prerequisites

- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel
- Production database (SQLite for staging, PostgreSQL/MySQL recommended for production)

## Quick Deploy

1. **Import Project to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure Environment Variables** (see below)

3. **Deploy!**

## Required Environment Variables

Add these in Vercel Project Settings → Environment Variables:

### Core Application

```env
# NextAuth Configuration
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-random-secret-here-min-32-chars

# Database
DATABASE_URL=your-database-connection-string

# UploadThing (for image uploads)
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id
```

### OAuth Providers (Optional)

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### Generating NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

## Database Setup

### Option 1: Vercel Postgres (Recommended for Production)

1. Go to your Vercel project
2. Navigate to Storage tab
3. Create a new Postgres database
4. Vercel will automatically add `DATABASE_URL` to your environment variables
5. Run migrations:
   ```bash
   npx prisma db push
   ```

### Option 2: External Database (PlanetScale, Supabase, etc.)

1. Create a database on your preferred provider
2. Get the connection string
3. Add `DATABASE_URL` to Vercel environment variables
4. Update `prisma/schema.prisma` datasource if needed
5. Run migrations

### SQLite (Development Only)

SQLite works for development but **is not recommended for production** on Vercel due to ephemeral filesystem.

## Build & Deploy Settings

Vercel will automatically detect these settings, but you can verify:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm ci`
- **Development Command**: `npm run dev`

## Performance Optimizations Included

✅ **Image Optimization**
- Automatic WebP/AVIF conversion
- Multiple device sizes
- Remote image support for UploadThing

✅ **Caching**
- Static assets cached for 1 year
- API routes with no-cache headers
- Browser caching directives

✅ **Security Headers**
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- XSS Protection enabled
- DNS prefetch control

✅ **Compression**
- Gzip/Brotli compression enabled
- Optimized bundle sizes

✅ **Code Splitting**
- Automatic code splitting per route
- Dynamic imports for large components

## Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Run database migrations (`npx prisma db push`)
- [ ] Test OAuth login flows (if enabled)
- [ ] Verify image uploads work
- [ ] Check admin panel access
- [ ] Test cart and checkout flow
- [ ] Verify email functionality (if configured)
- [ ] Check mobile responsiveness
- [ ] Test dark mode
- [ ] Run Lighthouse performance audit

## Monitoring

Vercel provides built-in monitoring:

1. **Analytics**: Vercel Analytics (already included via `@vercel/speed-insights`)
2. **Logs**: Check deployment logs in Vercel dashboard
3. **Performance**: View Web Vitals in Analytics tab

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Ensure environment variables are set correctly
4. Check that `postinstall` script runs successfully

### Database Connection Issues

1. Verify `DATABASE_URL` is correctly formatted
2. Check database is accessible from Vercel's IP ranges
3. Ensure SSL is enabled for production databases
4. Verify Prisma schema matches database

### OAuth Not Working

1. Update OAuth callback URLs:
   - Google: `https://your-domain.vercel.app/api/auth/callback/google`
   - GitHub: `https://your-domain.vercel.app/api/auth/callback/github`
2. Verify `NEXTAUTH_URL` matches your deployment URL
3. Check OAuth credentials are correct

### Images Not Loading

1. Verify UploadThing credentials are set
2. Check `remotePatterns` in `next.config.ts`
3. Ensure images are properly uploaded

## Custom Domain

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to your custom domain
5. Update OAuth callback URLs to use custom domain

## Environment-Specific Settings

### Production
```env
NODE_ENV=production
NEXTAUTH_URL=https://your-production-domain.com
```

### Preview (Staging)
```env
NODE_ENV=production
NEXTAUTH_URL=https://your-preview-deployment.vercel.app
```

### Development
```env
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
```

## Scaling Considerations

- **Function Timeout**: Default 10s (can upgrade to 60s on Pro)
- **Function Memory**: Default 1024MB (can increase on Pro)
- **Concurrent Executions**: Unlimited on Pro plan
- **Bandwidth**: Check your plan limits
- **Build Minutes**: 6000 minutes/month on Pro

## Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use Vercel's encrypted environment variables
3. ✅ Rotate secrets regularly
4. ✅ Enable Vercel's security features
5. ✅ Use HTTPS only (enforced by Vercel)
6. ✅ Implement rate limiting for APIs
7. ✅ Keep dependencies updated

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs

## Rollback

If a deployment causes issues:

1. Go to Vercel Deployments tab
2. Find the last working deployment
3. Click "..." → "Promote to Production"

Vercel keeps all deployments, making rollback instant and safe.