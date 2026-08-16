'use client';

import { useRouter } from 'next/navigation';
import { trackComponentAccess } from '../utils/analytics';

interface TrackedButtonProps {
  href: string;
  trackComponent: string;
  trackMode?: string;
  className?: string;
  children: React.ReactNode;
}

const TrackedButton = ({ href, trackComponent, trackMode, className, children }: TrackedButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    trackComponentAccess(trackComponent, trackMode);
    router.push(href);
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

export default TrackedButton;
