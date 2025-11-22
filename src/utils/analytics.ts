import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
mixpanel.init('594d499ed37794ec2f8f7cde6a167bd3', {
  debug: false,
  track_pageview: false, // We'll track manually
  persistence: 'localStorage'
});

// Track page views
export const trackPageView = (pageName: string) => {
  mixpanel.track('Page View', {
    page: pageName,
    timestamp: new Date().toISOString()
  });
};

// Track component access
export const trackComponentAccess = (componentName: string, mode?: string) => {
  mixpanel.track('Component Access', {
    component: componentName,
    mode: mode || 'default',
    timestamp: new Date().toISOString()
  });
};

export default mixpanel;
