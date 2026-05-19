import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Confetti } from "@/components/Confetti";
import { CounterDisplay } from "@/components/CounterDisplay";
import { WinnerCard } from "@/components/WinnerCard";
import { SocialShare } from "@/components/SocialShare";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { Loader2 } from "lucide-react";
import iStoriaLogo from "@/assets/iStro_Logo.png";

interface MilestoneData {
  current_count: number;
  target_milestone: number;
  milestone_reached: boolean;
  growth_rate: number;
  last_updated: string;
  stats: {
    progress_percentage: number;
    remaining_users: number;
    average_daily_growth: number;
  };
  winner_info?: {
    name: string;
    user_id: number;
    signup_timestamp: string;
    location: string;
    profile_picture: string | null;
  };
  prize_info?: {
    prize_name: string;
    prize_model: string;
    prize_value: string;
    prize_image: string;
    delivery_status: string;
    announcement_message: string;
  };
  celebration_effects: {
    confetti_enabled: boolean;
    celebration_duration: number;
    special_announcement: string;
  };
  social_sharing: {
    share_url: string;
    share_text: string;
    hashtags: string[];
  };
}

const Index = () => {
  const [displayCount, setDisplayCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const { data, isLoading, error } = useQuery<MilestoneData>({
    queryKey: ["milestone-6m"],
    queryFn: async () => {
      const response = await fetch("https://backend.istoria.app/api/6million");
      if (!response.ok) {
        throw new Error("Failed to fetch milestone data");
      }
      return response.json();
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  useEffect(() => {
    if (data) {
      // Simulate counter incrementing
      const interval = setInterval(() => {
        setDisplayCount((prev) => {
          const newCount = prev + data.growth_rate;
          if (newCount >= data.target_milestone && data.milestone_reached) {
            setShowCelebration(true);
            return data.current_count;
          }
          return Math.min(newCount, data.current_count);
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data]);

  useEffect(() => {
    if (data?.current_count) {
      setDisplayCount(data.current_count);
    }
  }, [data?.current_count]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-card rounded-[2rem] shadow-[var(--shadow-card)] px-10 py-12">
          <h1 className="text-2xl font-extrabold text-foreground mb-2">Couldn’t load the numbers</h1>
          <p className="text-muted-foreground">Please try again in a moment.</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen overflow-hidden">
      <BackgroundDecor />
      <Confetti enabled={showCelebration && data.celebration_effects.confetti_enabled} />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto space-y-10 md:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <img
              src={iStoriaLogo}
              alt="iStoria"
              className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-2 animate-float drop-shadow-[0_14px_30px_hsl(var(--celebration-blue)/0.3)]"
            />
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground animate-fade-rise">
              {showCelebration ? "iStoria reached" : "iStoria is on the way to"}{" "}
              <span className="text-primary">6 Million</span>
            </h1>
            <div className="animate-fade-rise [animation-delay:120ms]">
              <span className="inline-block px-5 py-2 rounded-full bg-celebration-blue/10 text-primary font-semibold text-sm md:text-base animate-pulse-glow">
                🎉 {showCelebration
                  ? data.celebration_effects.special_announcement
                  : "Thank you for learning with us"}
              </span>
            </div>
          </div>

          {/* Counter + progress */}
          <div className="bg-card rounded-[2.5rem] shadow-[var(--shadow-card)] px-6 py-12 md:py-16 animate-fade-rise [animation-delay:220ms]">
            <CounterDisplay targetCount={displayCount} />
            <div className="max-w-xl mx-auto mt-8">
              <div className="h-3.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary animate-bar-fill"
                  style={{ ["--bar-target" as string]: `${Math.min(data.stats.progress_percentage, 100)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center font-medium">
                on the way to <span className="text-foreground font-bold">6,000,000</span> learners worldwide
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <div className="bg-card rounded-3xl p-6 text-center shadow-[0_12px_30px_hsl(217_33%_17%/0.07)] transition-transform duration-200 hover:-translate-y-1.5 animate-fade-rise [animation-delay:300ms]">
              <div className="text-3xl font-extrabold text-primary">
                {data.stats.progress_percentage}%
              </div>
              <div className="text-muted-foreground mt-2 font-semibold text-sm">Progress</div>
            </div>
            <div className="bg-card rounded-3xl p-6 text-center shadow-[0_12px_30px_hsl(217_33%_17%/0.07)] transition-transform duration-200 hover:-translate-y-1.5 animate-fade-rise [animation-delay:380ms]">
              <div className="text-3xl font-extrabold text-secondary">
                +{data.growth_rate.toLocaleString()}
              </div>
              <div className="text-muted-foreground mt-2 font-semibold text-sm">Growth Rate</div>
            </div>
            <div className="bg-card rounded-3xl p-6 text-center shadow-[0_12px_30px_hsl(217_33%_17%/0.07)] transition-transform duration-200 hover:-translate-y-1.5 animate-fade-rise [animation-delay:460ms]">
              <div className="text-3xl font-extrabold text-accent">
                {data.stats.average_daily_growth.toLocaleString()}
              </div>
              <div className="text-muted-foreground mt-2 font-semibold text-sm">Daily Average</div>
            </div>
          </div>

          {/* Winner Card */}
          {showCelebration && data.winner_info && data.prize_info && (
            <div className="animate-scale-in">
              <WinnerCard winner={data.winner_info} prize={data.prize_info} />
            </div>
          )}

          {/* Social Share — always visible (approaching + celebration) */}
          <div className="animate-fade-rise [animation-delay:540ms]">
            <SocialShare
              shareUrl={data.social_sharing.share_url}
              shareText={data.social_sharing.share_text}
              hashtags={data.social_sharing.hashtags}
            />
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-6">
            Last updated: {new Date(data.last_updated).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
