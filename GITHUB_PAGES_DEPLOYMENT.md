# GitHub Pages Deployment Guide

## Quick Setup (5 Steps)

### Step 1: Create GitHub Repository
```bash
cd /Users/balakrishnanr/Documents/personal.nosync/spelling-game

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - LearnJoyHub"

# Create main branch
git branch -M main
```

### Step 2: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `learnjoyhub` (or any name)
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** initialize with README
5. Click "Create repository"

### Step 3: Push to GitHub
Copy the commands GitHub shows you, or use:
```bash
git remote add origin https://github.com/YOUR_USERNAME/learnjoyhub.git
git push -u origin main
```
Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 4: Deploy to GitHub Pages
```bash
npm run deploy
```
This builds and deploys your site automatically!

### Step 5: Configure Custom Domain

#### A. Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. You should see: "Your site is published at https://YOUR_USERNAME.github.io/learnjoyhub/"

#### B. Add Custom Domain
1. Still in Settings → Pages
2. Under "Custom domain", enter: `learnjoyhub.in`
3. Click **Save**
4. Check ✅ **Enforce HTTPS** (wait a few minutes for this option to appear)

#### C. Configure Hostinger DNS
1. Log in to Hostinger control panel
2. Go to **Domains** → Select `learnjoyhub.in` → **DNS / Name Servers**
3. Click **Manage** next to DNS Records
4. **Delete** all existing A records (if any)
5. Add these **4 A records** (all with Name: `@`):

```
Type: A
Name: @
Content: 185.199.108.153
TTL: 3600

Type: A
Name: @
Content: 185.199.109.153
TTL: 3600

Type: A
Name: @
Content: 185.199.110.153
TTL: 3600

Type: A
Name: @
Content: 185.199.111.153
TTL: 3600
```

6. Add **1 CNAME record** for www:

```
Type: CNAME
Name: www
Content: YOUR_USERNAME.github.io
TTL: 3600
```
Replace `YOUR_USERNAME` with your GitHub username.

7. **Save** all changes

### Step 6: Create CNAME file
This ensures your custom domain persists after deployment:

```bash
echo "learnjoyhub.in" > public/CNAME
git add public/CNAME
git commit -m "Add CNAME for custom domain"
git push
npm run deploy
```

### Step 7: Wait for DNS Propagation
- Can take **10 minutes to 48 hours** (usually ~1 hour)
- Check status: https://www.whatsmydns.net/#A/learnjoyhub.in
- Once propagated, visit https://learnjoyhub.in

---

## Testing Before Custom Domain

Your site will be available immediately at:
```
https://YOUR_USERNAME.github.io/learnjoyhub/
```
Replace `YOUR_USERNAME` with your GitHub username.

---

## Updating Your Site

Whenever you make changes:
```bash
git add .
git commit -m "Description of changes"
git push
npm run deploy
```

The `npm run deploy` command:
1. Builds your app
2. Pushes to `gh-pages` branch
3. Updates your live site (usually within 1-2 minutes)

---

## Important Notes

✅ **Free Forever** - GitHub Pages is 100% free for public repositories
✅ **HTTPS Included** - Free SSL certificate
✅ **No Server Needed** - Perfect for React apps
✅ **Fast CDN** - GitHub's global CDN
✅ **Custom Domain** - Use learnjoyhub.in for free

⚠️ **Repository must be Public** for free hosting
⚠️ **Soft limit: 100GB bandwidth/month** (plenty for most sites)
⚠️ **Soft limit: 1GB repository size** (you're well under this)

---

## Troubleshooting

### Site shows 404
- Wait 2-3 minutes after first deployment
- Check repo Settings → Pages shows green checkmark
- Verify `gh-pages` branch exists in your repo

### Custom domain not working
- Check DNS propagation: https://www.whatsmydns.net
- Verify CNAME file exists in your repo's root
- Make sure "Enforce HTTPS" is checked (may need to wait)
- Try accessing via www.learnjoyhub.in

### DNS not propagating
- Be patient, can take up to 48 hours
- Clear your browser cache
- Try incognito/private mode
- Try different device/network

### "There isn't a GitHub Pages site here"
- Check custom domain spelling in Settings → Pages
- Verify CNAME file contains exactly: `learnjoyhub.in`
- Wait a few minutes and try again

---

## Your URLs After Setup

- **Production:** https://learnjoyhub.in
- **WWW:** https://www.learnjoyhub.in
- **GitHub Pages:** https://YOUR_USERNAME.github.io/learnjoyhub/

All will redirect to your custom domain once DNS is configured!

---

## Next Steps After Deployment

1. ✅ Test all features on live site
2. ✅ Replace AdSense placeholder IDs (see ADSENSE_SETUP.md)
3. ✅ Submit to Google AdSense for review
4. ✅ Monitor Mixpanel analytics
5. ✅ Share with users!

---

## Cost Breakdown

- **Domain (learnjoyhub.in):** ~₹799/year (already purchased)
- **GitHub Pages Hosting:** ₹0 (FREE!)
- **SSL Certificate:** ₹0 (FREE!)
- **Bandwidth:** ₹0 (FREE!)
- **Total Yearly Cost:** ~₹799 ✨

---

Good luck! Your site will be live in minutes! 🚀
