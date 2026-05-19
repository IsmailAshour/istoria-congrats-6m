import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface WinnerInfo {
  name: string;
  user_id: number;
  signup_timestamp: string;
  location: string;
  profile_picture: string | null;
}

interface PrizeInfo {
  prize_name: string;
  prize_model: string;
  prize_value: string;
  prize_image: string;
  delivery_status: string;
  announcement_message: string;
}

interface WinnerCardProps {
  winner: WinnerInfo;
  prize: PrizeInfo;
}

export const WinnerCard = ({ winner, prize }: WinnerCardProps) => {
  return (
    <Card className="p-8 md:p-10 bg-gradient-to-b from-card to-celebration-blue/5 border border-border rounded-[2rem] shadow-[var(--shadow-card)] animate-scale-in">
      <div className="text-center space-y-6">
        <div className="inline-block">
          <Badge className="text-sm px-5 py-2 rounded-full font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            🏆 Milestone Winner
          </Badge>
        </div>

        <Avatar className="w-28 h-28 mx-auto border-4 border-card shadow-[0_10px_26px_hsl(var(--celebration-blue)/0.28)]">
          <AvatarImage src={winner.profile_picture || undefined} />
          <AvatarFallback className="text-4xl font-extrabold bg-celebration-blue/10 text-primary">
            {winner.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            {winner.name}
          </h2>
          <p className="text-lg text-muted-foreground">
            Learner #{winner.user_id.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            📍 {winner.location}
          </p>
        </div>

        <div className="border-t border-dashed border-border pt-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src={prize.prize_image}
              alt={prize.prize_name}
              className="w-16 h-16 object-contain"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold text-foreground">
                {prize.prize_model}
              </h3>
              <p className="text-muted-foreground">{prize.prize_name}</p>
            </div>
          </div>

          <div className="bg-celebration-blue/5 rounded-2xl p-4 mb-4">
            <p className="text-lg text-foreground">
              {prize.announcement_message}
            </p>
          </div>

          <Badge variant="secondary" className="text-sm rounded-full">
            {prize.delivery_status}
          </Badge>
        </div>
      </div>
    </Card>
  );
};
