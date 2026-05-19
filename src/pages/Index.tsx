import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Confetti } from "@/components/Confetti";
import { CounterDisplay } from "@/components/CounterDisplay";
import { WinnerCard } from "@/components/WinnerCard";
import { SocialShare } from "@/components/SocialShare";
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
    queryKey: ["milestone"],
    queryFn: async () => {
      const response = await fetch("https://backend.istoria.app/api/5million");
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Data</h1>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      <Confetti enabled={showCelebration && data.celebration_effects.confetti_enabled} />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-scale-in">
            <div className="inline-block">
              <img
                src={iStoriaLogo}
                alt="iStoria"
                className="w-24 h-24 mx-auto mb-4 animate-float"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              iStoria Milestone
            </h1>
            {showCelebration && (
              <p className="text-2xl md:text-4xl font-bold text-primary animate-pulse-glow">
                {data.celebration_effects.special_announcement}
              </p>
            )}
          </div>

          {/* Counter */}
          <div className="py-12">
            <CounterDisplay targetCount={displayCount} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary transition-colors">
              <div className="text-3xl font-bold text-primary">
                {data.stats.progress_percentage}%
              </div>
              <div className="text-muted-foreground mt-2">Progress</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-secondary transition-colors">
              <div className="text-3xl font-bold text-secondary">
                +{data.growth_rate.toLocaleString()}
              </div>
              <div className="text-muted-foreground mt-2">Growth Rate</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-accent transition-colors">
              <div className="text-3xl font-bold text-accent">
                {data.stats.average_daily_growth.toLocaleString()}
              </div>
              <div className="text-muted-foreground mt-2">Daily Average</div>
            </div>
          </div>

          {/* Winner Card */}
          {showCelebration && data.winner_info && data.prize_info && (
            <div className="animate-scale-in">
              <WinnerCard winner={data.winner_info} prize={data.prize_info} />
            </div>
          )}

          {/* Social Share */}
          {showCelebration && (
            <div className="animate-scale-in">
              <SocialShare
                shareUrl={data.social_sharing.share_url}
                shareText={data.social_sharing.share_text}
                hashtags={data.social_sharing.hashtags}
              />
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-8">
            Last updated: {new Date(data.last_updated).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
