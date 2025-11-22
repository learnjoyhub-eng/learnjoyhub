import { useEffect } from 'react';
import './GoogleAd.css';

interface GoogleAdSidebarProps {
  adSlot: string;
}

const GoogleAdSidebar: React.FC<GoogleAdSidebarProps> = ({ adSlot }) => {
  const isProduction = import.meta.env.PROD;

  useEffect(() => {
    if (isProduction && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [isProduction]);

  // Don't render ads in development mode
  if (!isProduction) {
    return (
      <div className="ad-sidebar-placeholder">
        <div className="ad-placeholder-content">
          📢 Sidebar Ad
          <br />
          (Hidden in Dev)
        </div>
      </div>
    );
  }

  return (
    <div className="ad-sidebar-container">
      <div className="ad-sidebar-label">Advertisement</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5142509621825412"
        data-ad-slot={adSlot}
        data-ad-format="vertical"
        data-full-width-responsive="false"
      ></ins>
    </div>
  );
};

export default GoogleAdSidebar;
