# Deployment Guide — Netlify

## Prerequisites
- GitHub account with the project repository
- Netlify account (free tier works)

## Step 1: Connect Repository to Netlify
1. Log in to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select your repository
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**

## Step 2: Configure Custom Domain
1. Go to **Site settings → Domain management**
2. Add your custom domain (e.g., `petrovfitness.com.au`)
3. Follow DNS configuration instructions

## Step 3: Enable Netlify Identity (for CMS)
1. Go to **Site settings → Identity**
2. Click **"Enable Identity"**
3. Under **Registration**, select **"Invite only"**
4. Under **Services → Git Gateway**, click **"Enable Git Gateway"**
5. Invite yourself: **Identity → Invite users** → enter your email

## Step 4: Enable Netlify Forms
Forms are automatically detected from the `data-netlify="true"` attribute.
1. Go to **Forms** in your Netlify dashboard to see submissions
2. Set up email notifications under **Form notifications**

## Step 5: First Login to CMS
1. Check your email for the Netlify Identity invite
2. Click the link and set your password
3. Go to `https://yoursite.com/admin` and log in

## Continuous Deployment
Every push to the `main` branch automatically triggers a new build and deployment.

## Environment Variables
No environment variables are required for this project.
