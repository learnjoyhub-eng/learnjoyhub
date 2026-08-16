import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import GlobalHeader from '../components/GlobalHeader';
import AnalyticsProvider from '../components/AnalyticsProvider';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnjoyhub.in';
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'LearnJoyHub - Interactive Learning for Kids | ICSE Curriculum & Numerology',
    template: '%s | LearnJoyHub',
  },
  description: 'LearnJoyHub - Interactive learning platform for 2nd Std ICSE students. Fun spelling games, maths practice, and numerology tools for the whole family. Learn with joy!',
  keywords: ['ICSE learning', '2nd standard', 'spelling game', 'maths practice', 'numerology calculator', 'kids education', 'interactive learning', 'LearnJoyHub', 'Indian curriculum'],
  authors: [{ name: 'LearnJoyHub' }],
  robots: { index: true, follow: true },
  icons: {
    icon: '/image.ico',
    apple: '/image.ico',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'LearnJoyHub - Learning with Joy & Purpose',
    description: 'Interactive learning platform for kids with ICSE curriculum, spelling games, maths practice, and numerology tools. Making education fun and meaningful!',
    images: ['/image.ico'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnJoyHub - Learning with Joy & Purpose',
    description: 'Interactive learning platform for kids with ICSE curriculum, spelling games, maths practice, and numerology tools.',
    images: ['/image.ico'],
  },
  ...(googleSiteVerification && { verification: { google: googleSiteVerification } }),
};

export const viewport: Viewport = {
  themeColor: '#11998e',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'LearnJoyHub',
  url: siteUrl,
  description: 'Interactive learning platform for kids with ICSE curriculum, spelling games, maths practice, and numerology tools.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {adsenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {gaMeasurementId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <div className="app">
          <GlobalHeader />
          {children}
        </div>
        <AnalyticsProvider />
        <Analytics />
      </body>
    </html>
  );
}
