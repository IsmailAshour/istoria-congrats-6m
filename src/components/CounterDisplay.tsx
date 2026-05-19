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
    <div className="text-center space-y-3">
      <div className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none bg-gradient-to-br from-primary to-celebration-blue/70 bg-clip-text text-transparent">
        {formatNumber(count)}
      </div>
      <div className="text-lg md:text-2xl text-muted-foreground font-semibold">
        learners and counting
      </div>
    </div>
  );
};
