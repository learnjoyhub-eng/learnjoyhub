'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics, trackPageView } from '../utils/analytics';

const AnalyticsProvider = () => {
  const pathname = usePathname();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
};

export default AnalyticsProvider;
