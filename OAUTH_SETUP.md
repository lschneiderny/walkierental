# OAuth Setup Guide

This guide explains how to set up OAuth authentication for WalkieRentals.

## Supported Providers

- Google OAuth 2.0
- GitHub OAuth

## Setup Instructions

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Select "Web application" as the application type
6. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`
7. Copy the Client ID and Client Secret
8. Add them to your `.env.local` file:
   ```
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: WalkieRentals (or your preferred name)
   - **Homepage URL**: 
     - Development: `http://localhost:3000`
     - Production: `https://your-domain.com`
   - **Authorization callback URL**:
     - Development: `http://localhost:3000/api/auth/callback/github`
     - Production: `https://your-domain.com/api/auth/callback/github`
4. Click "Register application"
5. Copy the Client ID
6. Click "Generate a new client secret" and copy it
7. Add them to your `.env.local` file:
   ```
   GITHUB_CLIENT_ID="your-client-id"
   GITHUB_CLIENT_SECRET="your-client-secret"
   ```

## Environment Variables

Add these variables to your `.env.local` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

## Vercel Deployment

When deploying to Vercel, add these environment variables in your project settings:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each OAuth credential
4. Make sure to update `NEXTAUTH_URL` to your production domain

## How It Works

1. When a user signs in with Google or GitHub, NextAuth.js handles the OAuth flow
2. If the user doesn't exist in the database, they're automatically created
3. OAuth users are created with an empty password field (they can only sign in via OAuth)
4. All new OAuth users are assigned the "USER" role by default
5. The user's email and name from the OAuth provider are stored in the database

## Security Notes

- Never commit OAuth credentials to version control
- Use different OAuth apps for development and production
- Keep your client secrets secure
- Regularly rotate your OAuth credentials