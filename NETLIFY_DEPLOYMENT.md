# Netlify Deployment Guide (Works with Private Repos!)

## Why Netlify?
- ✅ **FREE hosting** (even for private repositories)
- ✅ **Custom domain** support
- ✅ **Free SSL** certificate
- ✅ **Automatic deployments** from GitHub
- ✅ **Faster** than GitHub Pages
- ✅ **Better performance**

---

## Setup Steps (5 minutes)

### Step 1: Create Netlify Account
1. Go to https://www.netlify.com
2. Click **Sign up**
3. Choose **Sign up with GitHub**
4. Authorize Netlify to access your GitHub

### Step 2: Deploy Your Site
1. Click **Add new site** → **Import an existing project**
2. Choose **Deploy with GitHub**
3. Select your repository: `learnjoyhub-eng/learnjoyhub`
4. Configure build settings:
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**

**Your site will be live in 1-2 minutes!**

### Step 3: Add Custom Domain
1. In Netlify dashboard, go to **Domain settings**
2. Click **Add custom domain**
3. Enter: `learnjoyhub.in`
4. Click **Verify**
5. Netlify will show you DNS records to add

### Step 4: Configure Hostinger DNS
1. Log in to Hostinger
2. Go to **Domains** → `learnjoyhub.in` → **DNS Records**
3. **Delete all existing A records**
4. Add Netlify's DNS records (Netlify will show you exactly what to add)

**Typical setup (Netlify will provide exact IPs):**
```
Type: A
Name: @
Content: 75.2.60.5
TTL: 3600
```

```
Type: CNAME
Name: www
Content: your-site-name.netlify.app
TTL: 3600
```

### Step 5: Enable HTTPS
1. In Netlify → Domain settings
2. Click **HTTPS** tab
3. Click **Verify DNS configuration**
4. Once verified, click **Provision certificate**
5. HTTPS will be enabled automatically!

---

## Automatic Deployments

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

Netlify will automatically:
1. Detect the push
2. Build your site
3. Deploy it live
4. Usually takes 1-2 minutes

---

## Netlify vs GitHub Pages

| Feature | Netlify | GitHub Pages |
|---------|---------|--------------|
| Private repos | ✅ FREE | ❌ Paid only |
| Build time | ~1 min | ~2-3 min |
| Custom domain | ✅ Free | ✅ Free |
| SSL | ✅ Auto | ✅ Auto |
| Speed | ⚡ Faster | 🐢 Slower |
| Bandwidth | 100GB/month | 100GB/month |
| Deploy previews | ✅ Yes | ❌ No |

---

## Your Site URLs

After setup:
- **Netlify URL:** `https://your-site-name.netlify.app`
- **Custom domain:** `https://learnjoyhub.in`
- **WWW:** `https://www.learnjoyhub.in`

---

## Environment Variables (Optional)

If you ever need to add secrets:
1. Netlify dashboard → Site settings → Environment variables
2. Add variables (won't be in your code)

---

## Troubleshooting

### Build fails
- Check Netlify build logs
- Make sure build command is: `npm run build`
- Make sure publish directory is: `dist`

### Custom domain not working
- Wait for DNS propagation (up to 48 hours)
- Check DNS records match Netlify's instructions
- Try: https://www.whatsmydns.net/#A/learnjoyhub.in

### Site shows old version
- Netlify caches aggressively
- Go to: Site settings → Build & deploy → Post processing
- Click "Clear cache and retry deploy"

---

## Cost

- **Netlify Free Tier:**
  - 100GB bandwidth/month
  - 300 build minutes/month
  - Unlimited sites
  - Custom domains
  - SSL
  - **Cost: ₹0 forever!**

- **Total yearly cost:** Domain fee only (~₹799)

---

## Ready to Deploy!

Your app is already configured. Just:
1. Sign up on Netlify
2. Connect your GitHub repo
3. Click deploy
4. Add custom domain
5. Configure DNS

**Done! 🚀**

No code changes needed - everything is ready!
