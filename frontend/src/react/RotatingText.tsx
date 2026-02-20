import { useEffect, useRef, useState } from 'react';

interface RotatingTextProps {
  texts: string[];
  interval?: number;
}

export default function RotatingText({ texts, interval = 3000 }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <span
      ref={containerRef}
      className="inline-block relative overflow-hidden align-bottom"
      style={{ height: '1.2em', minWidth: '3em' }}
    >
      <span
        className={`inline-block transition-all duration-500 ease-in-out ${
          isAnimating
            ? 'opacity-0 translate-y-full blur-sm'
            : 'opacity-100 translate-y-0 blur-0'
        }`}
        style={{ color: '#a476ff' }}
      >
        {texts[currentIndex]}
      </span>
    </span>
  );
}
