import { useEffect, useState } from "react";

interface CounterDisplayProps {
  targetCount: number;
  duration?: number;
}

export const CounterDisplay = ({ targetCount, duration = 2000 }: CounterDisplayProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = targetCount / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetCount, duration]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="text-center space-y-2">
      <div className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-celebration-gold via-celebration-pink to-celebration-purple bg-clip-text text-transparent animate-pulse-glow">
        {formatNumber(count)}
      </div>
      <div className="text-2xl md:text-3xl text-muted-foreground font-semibold">
        Users Milestone
      </div>
    </div>
  );
};
