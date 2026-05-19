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
    <Card className="p-8 bg-card border-2 border-primary shadow-[var(--shadow-card)] animate-scale-in">
      <div className="text-center space-y-6">
        <div className="inline-block">
          <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-celebration-gold to-celebration-pink">
            🏆 Winner
          </Badge>
        </div>

        <Avatar className="w-32 h-32 mx-auto border-4 border-primary">
          <AvatarImage src={winner.profile_picture || undefined} />
          <AvatarFallback className="text-4xl bg-muted">
            {winner.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-4xl font-bold text-foreground mb-2">
            {winner.name}
          </h2>
          <p className="text-xl text-muted-foreground">
            User #{winner.user_id.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            📍 {winner.location}
          </p>
        </div>

        <div className="border-t border-border pt-6">
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
          
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <p className="text-lg text-foreground">
              {prize.announcement_message}
            </p>
          </div>

          <Badge variant="secondary" className="text-sm">
            {prize.delivery_status}
          </Badge>
        </div>
      </div>
    </Card>
  );
};
