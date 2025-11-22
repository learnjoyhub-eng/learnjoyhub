import { useEffect } from 'react';
import './GoogleAd.css';

interface GoogleAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adStyle?: React.CSSProperties;
  className?: string;
}

const GoogleAd: React.FC<GoogleAdProps> = ({ 
  adSlot, 
  adFormat = 'auto',
  adStyle = { display: 'block' },
  className = ''
}) => {
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
      <div className={`ad-placeholder ${className}`} style={{
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
        minHeight: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...adStyle
      }}>
        Ad Space (Hidden in Dev Mode)
      </div>
    );
  }

  return (
    <div className={className} style={{ textAlign: 'center', margin: '20px 0' }}>
      <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '5px' }}>Advertisement</div>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-5142509621825412"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAd;

// Type declaration for window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
