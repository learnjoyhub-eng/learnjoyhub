import mixpanel from 'mixpanel-browser';

let initialized = false;

export const initAnalytics = () => {
  if (initialized || typeof window === 'undefined') return;
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!token) return;

  mixpanel.init(token, {
    debug: false,
    track_pageview: false, // We'll track manually
    persistence: 'localStorage'
  });
  initialized = true;
};

// Track page views
export const trackPageView = (pageName: string) => {
  if (!initialized) return;
  mixpanel.track('Page View', {
    page: pageName,
    timestamp: new Date().toISOString()
  });
};

// Track component access
export const trackComponentAccess = (componentName: string, mode?: string) => {
  if (!initialized) return;
  mixpanel.track('Component Access', {
    component: componentName,
    mode: mode || 'default',
    timestamp: new Date().toISOString()
  });
};

export default mixpanel;
