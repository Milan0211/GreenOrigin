import { useState, useEffect } from 'react';
import LoaderVideo from '../assets/Loader.mp4';

const Loader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auto-complete after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete && onComplete();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        className="w-32 h-32"
      >
        <source src={LoaderVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default Loader;
