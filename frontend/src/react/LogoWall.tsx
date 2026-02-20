import { useRef, useEffect, useState } from 'react';

interface LogoItem {
  name: string;
  icon: string;
}

interface LogoWallProps {
  logos: LogoItem[];
  speed?: number;
}

export default function LogoWall({ logos, speed = 30 }: LogoWallProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      if (!isPaused) {
        position -= 0.5;
        const firstChild = scrollContainer.firstElementChild as HTMLElement;
        if (firstChild && Math.abs(position) >= firstChild.offsetWidth + 32) {
          position = 0;
          scrollContainer.appendChild(firstChild);
        }
        scrollContainer.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, speed]);

  // Duplicate logos for seamless loop
  const allLogos = [...logos, ...logos, ...logos];

  return (
    <div
      className="w-full overflow-hidden py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-8 items-center whitespace-nowrap"
        style={{ willChange: 'transform' }}
      >
        {allLogos.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[var(--white-icon-tr)] bg-[#1414149c]
                       hover:border-[var(--sec)] hover:bg-[var(--white-icon-tr)] transition-all duration-300 shrink-0 cursor-default
                       group"
          >
            <span className="text-2xl" dangerouslySetInnerHTML={{ __html: logo.icon }} />
            <span className="text-sm text-[var(--white-icon)] group-hover:text-[var(--white)] transition-colors">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
