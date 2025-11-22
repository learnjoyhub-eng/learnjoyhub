# Google AdSense Integration Guide

## Setup Instructions

### 1. Get Your Ad Unit IDs

After your site is approved by Google AdSense:

1. Go to https://www.google.com/adsense
2. Navigate to **Ads** > **By ad unit**
3. Create **Display ads** for each placement:
   - **Landing Page Ad** - Create one responsive display ad
   - **Numerology Ad** - Create one responsive display ad  
   - **Parent Mode Ad** - Create one responsive display ad

4. Copy the `data-ad-slot` values from each ad unit

### 2. Update Ad Slot IDs

Replace the placeholder slot IDs in these files:

**src/pages/LandingPage.tsx** (Line with `adSlot="1234567890"`)
```tsx
<GoogleAd 
  adSlot="YOUR_LANDING_PAGE_SLOT_ID"
  adFormat="auto"
  className="landing-page-ad"
/>
```

**src/pages/NumerologyCalculator.tsx** (Line with `adSlot="1234567891"`)
```tsx
<GoogleAd 
  adSlot="YOUR_NUMEROLOGY_SLOT_ID"
  adFormat="auto"
  className="numerology-ad"
/>
```

**src/pages/ParentMode.tsx** (Line with `adSlot="1234567892"`)
```tsx
<GoogleAd 
  adSlot="YOUR_PARENT_MODE_SLOT_ID"
  adFormat="auto"
  className="parent-mode-ad"
/>
```

## Ad Placements (Google Policy Compliant)

✅ **Landing Page** - After features section, before footer
✅ **Numerology Calculator** - At the bottom after all content  
✅ **Parent Mode** - At the bottom of the page

❌ **NOT on Child Mode** - Complies with Google's policies on children's content
❌ **NOT on learning screens** - No interruption to kids' learning experience

## Development vs Production

- **Development Mode**: Shows placeholder text "Ad Space (Hidden in Dev Mode)"
- **Production Mode**: Shows actual Google ads

The ads automatically detect the environment using `import.meta.env.PROD` and only load in production builds.

## Testing

### Local Development
```bash
npm run dev
# You'll see ad placeholders with dashed borders
```

### Production Build
```bash
npm run build
npm run preview
# Ads will load (if ad slot IDs are configured)
```

## Important Notes

1. **Account Safety**: Ads only load in production to prevent invalid clicks during development
2. **Approval Required**: Your AdSense account must be approved before ads show
3. **Domain Verification**: Add your domain in AdSense settings
4. **Content Policy**: No ads on children-focused content (already implemented)
5. **Ad Slot IDs**: Replace placeholder IDs with real ones from your AdSense account

## Publisher ID

Your Publisher ID is already configured in `index.html`:
```
ca-pub-5142509621825412
```

## Monitoring

After deployment:
1. Check AdSense dashboard for impressions
2. Monitor page speed (ads shouldn't slow down site)
3. Check mobile responsiveness
4. Verify ads don't break layout

## Support

If ads don't show after deployment:
- Verify domain is approved in AdSense
- Check browser console for errors
- Ensure ad slot IDs are correct
- Wait 24-48 hours after approval for ads to start showing
