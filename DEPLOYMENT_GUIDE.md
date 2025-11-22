# Deployment Guide for LearnJoyHub

## Your Domain: learnjoyhub.in (Hostinger)

You have 3 easy deployment options:

---

## Option 1: Hostinger File Manager (Easiest - Recommended for You)

### Step 1: Build Your Application
```bash
npm run build
```
This creates a `dist` folder with all production files.

### Step 2: Upload to Hostinger
1. Log in to Hostinger control panel (hPanel)
2. Go to **File Manager**
3. Navigate to `public_html` folder (or your domain's root folder)
4. **Delete** all existing files in public_html (if any)
5. **Upload** all files from your local `dist` folder:
   - Upload the entire contents of `dist` folder
   - Make sure `index.html` is in the root of public_html
   - All folders (assets, etc.) should also be uploaded

### Step 3: Configure (if needed)
If your domain shows a directory listing instead of your site:
1. Make sure `index.html` is in the root of public_html
2. Check Hostinger's domain settings point to the correct folder

**Done!** Visit https://learnjoyhub.in

---

## Option 2: Hostinger Git Deployment (Automated)

### Prerequisites
- Your code in a GitHub repository
- Hostinger plan with Git support

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/spelling-game.git
git push -u origin main
```

### Step 2: Connect to Hostinger
1. In Hostinger hPanel, go to **Git**
2. Click **Create Repository**
3. Enter your GitHub repository URL
4. Select branch: `main`
5. Set deployment path: `public_html`
6. Add build command: `npm install && npm run build && cp -r dist/* .`

### Step 3: Auto-deploy
Every time you push to GitHub, Hostinger will automatically rebuild and deploy!

---

## Option 3: GitHub Pages with Custom Domain (100% Free)

### Step 1: Prepare package.json
Already configured with homepage!

### Step 2: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 3: Add deployment scripts
Add to package.json scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

### Step 4: Deploy
```bash
npm run deploy
```

### Step 5: Configure Custom Domain
1. Go to your GitHub repo → Settings → Pages
2. Under "Custom domain", enter: `learnjoyhub.in`
3. Check "Enforce HTTPS"

### Step 6: Update Hostinger DNS
In Hostinger DNS settings, add these records:
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: YOUR_GITHUB_USERNAME.github.io
```

Wait 24-48 hours for DNS propagation.

---

## Recommended: Option 1 (Hostinger File Manager)

**Why?**
- ✅ Simplest - just upload files
- ✅ Works immediately
- ✅ Already have Hostinger hosting
- ✅ No need to learn Git/GitHub
- ✅ Full control

### Quick Start (Option 1):
```bash
# 1. Build
npm run build

# 2. The dist folder now contains your production site
# 3. Upload dist/* to Hostinger's public_html via File Manager
# 4. Done!
```

---

## Before Deployment Checklist

✅ Replace placeholder AdSense ad slot IDs with real ones from your AdSense account:
- Landing Page: 1234567890, 1234567893, 1234567896
- Numerology: 1234567891, 1234567894
- Parent Mode: 1234567892, 1234567895

✅ Test the build locally:
```bash
npm run build
npm run preview
```
Visit http://localhost:4173 to test the production build

✅ Verify all features work:
- Kids Learning Module
- Numerology Calculator
- Parent Mode word management
- Analytics tracking (production mode only)
- Ads (production mode only)

---

## Troubleshooting

### Issue: Blank page after deployment
**Solution:** Check browser console for errors. Usually a path issue.
- Make sure all files from `dist` are uploaded
- Check that index.html is in the root

### Issue: 404 on page refresh
**Solution:** Add `.htaccess` file to public_html:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Issue: Assets not loading
**Solution:** Check that the `assets` folder from `dist` is uploaded to public_html

---

## Post-Deployment

1. **Test everything** on the live site
2. **Submit to Google AdSense** for review (after adding real ad slot IDs)
3. **Monitor Mixpanel** for user analytics
4. **Update content** through Parent Mode as needed

---

## Support

If you encounter issues:
1. Check Hostinger's knowledge base
2. Contact Hostinger support (24/7 chat)
3. Check browser console for errors

---

## Your Site URLs

- **Production:** https://learnjoyhub.in
- **WWW:** https://www.learnjoyhub.in (should redirect to main)
- **Admin Email:** learnjoyhub@gmail.com

**Good luck with your deployment! 🚀**
