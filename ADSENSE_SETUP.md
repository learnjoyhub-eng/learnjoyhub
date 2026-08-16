# Google AdSense Integration Guide

## Setup Instructions

### 1. Get Your Ad Unit IDs

After the site is live on Vercel at its final domain and has been re-crawled:

1. Go to https://www.google.com/adsense
2. Navigate to **Ads** > **By ad unit**
3. Create **Display ads** for each placement:
   - **Landing Page Ad** - one responsive display ad
   - **Numerology Ad** - one responsive display ad

4. Copy the `data-ad-slot` value from each ad unit

### 2. Update Ad Slot IDs

Both ad placements read their slot IDs from a single config file:
`src/config/ads.ts`. Replace the placeholder values there:

```ts
export const AD_SLOTS = {
  landing: 'YOUR_LANDING_PAGE_SLOT_ID',
  numerology: 'YOUR_NUMEROLOGY_SLOT_ID',
};
```

### 3. Set the AdSense client ID

The AdSense publisher/client ID is read from the `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
environment variable (set in Vercel Project Settings, or `.env.local` for
local testing), not hardcoded in source. Ads render as a dev placeholder
whenever this variable is unset.

## Ad Placements (Google Policy Compliant)

✅ **Landing Page** (`/`) - After the educational content, before the footer
✅ **Numerology Calculator** (`/numerology`) - At the bottom after all content

❌ **NOT on `/english/parent`** - Complies with Google's policies on children's content
❌ **NOT on `/english/child`** - No interruption to kids' learning experience

## Development vs Production

- **Development Mode**: Shows placeholder text "Ad Space (Hidden in Dev Mode)"
- **Production Mode**: Shows actual Google ads (once `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set)

## Testing

### Local Development
```bash
npm run dev
# You'll see ad placeholders with dashed borders
```

### Production Build
```bash
npm run build
npm run start
# Ads will load if NEXT_PUBLIC_ADSENSE_CLIENT_ID and real slot IDs are configured
```

## Important Notes

1. **Account Safety**: Ads only render in production builds to prevent invalid clicks during development
2. **Approval Required**: The AdSense account must be approved before ads show
3. **Domain Verification**: Add the `learnjoyhub.in` domain in AdSense settings once DNS points to Vercel
4. **Content Policy**: No ads on children-focused content (already implemented)
5. **Ad Slot IDs**: Replace the placeholder IDs in `src/config/ads.ts` with real ones from the AdSense account

## Monitoring

After deployment:
1. Check the AdSense dashboard for impressions
2. Monitor page speed (ads shouldn't slow down the site)
3. Check mobile responsiveness
4. Verify ads don't break layout

## Support

If ads don't show after deployment:
- Verify the domain is approved in AdSense
- Check browser console for errors
- Ensure ad slot IDs in `src/config/ads.ts` are correct
- Wait 24-48 hours after approval for ads to start showing
