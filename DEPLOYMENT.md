# Cloudflare Pages Deployment Guide

## Prerequisites

1. ✅ Code pushed to GitHub repository
2. ✅ Cloudflare account (free tier works perfectly)
3. ✅ Build command: `npm run build`
4. ✅ Output directory: `dist`

## Method 1: GitHub Integration (Recommended)

### Step 1: Push to GitHub

Make sure your code is pushed to GitHub:
```bash
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Pages** in the sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select **GitHub** and authorize Cloudflare
6. Choose your repository: `astro-portfolio-website`

### Step 3: Configure Build Settings

Cloudflare will auto-detect Astro, but verify these settings:

- **Framework preset:** Astro (auto-detected)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (leave as default)
- **Node version:** `18` or `20` (recommended)

### Step 4: Environment Variables (Optional)

If you need any environment variables, add them in the build settings:
- Click **Environment variables**
- Add any variables your app needs

### Step 5: Deploy

1. Click **Save and Deploy**
2. Cloudflare will:
   - Install dependencies (`npm install`)
   - Build your site (`npm run build`)
   - Deploy the `dist/` folder
3. Your site will be live at: `https://astro-portfolio-website.pages.dev`

### Step 6: Custom Domain (Optional)

1. In your Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `alexmartinez.dev`)
4. Follow DNS instructions
5. SSL will be automatically configured

---

## Method 2: CLI Deployment (Alternative)

If you prefer CLI deployment:

### Install Wrangler CLI

```bash
npm install -g wrangler
```

### Authenticate

```bash
wrangler login
```

### Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name=astro-portfolio-website
```

---

## Auto-Deployments

With GitHub integration:
- ✅ **Production deployments:** Every push to `main` branch
- ✅ **Preview deployments:** Every pull request gets a preview URL
- ✅ **Automatic:** No manual steps needed

---

## Build Settings Reference

```
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 18
```

---

## Troubleshooting

### Build Fails

1. Check build logs in Cloudflare dashboard
2. Ensure Node version is 18 or 20
3. Verify all dependencies are in `package.json`
4. Check for TypeScript errors locally first

### Static Assets Not Loading

- Ensure files are in `public/` folder
- Verify paths in code use relative paths (e.g., `/favicon.svg`)

### Dark Mode Not Working

- The inline script in `BaseLayout.astro` should handle this
- Check browser console for errors

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Connect to Cloudflare Pages
3. ✅ Configure build settings
4. ✅ Deploy!
5. ✅ Set up custom domain (optional)
6. ✅ Share your portfolio! 🚀

