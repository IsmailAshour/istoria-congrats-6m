import { Button } from "@/components/ui/button";
import { Share2, Twitter, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  shareUrl: string;
  shareText: string;
  hashtags: string[];
}

export const SocialShare = ({ shareUrl, shareText, hashtags }: SocialShareProps) => {
  const { toast } = useToast();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "iStoria Milestone",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags.join(",")}`,
        "_blank"
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Button
        onClick={handleCopyLink}
        size="lg"
        variant="outline"
        className="rounded-full border-2 border-border bg-card text-primary hover:bg-celebration-blue/5 font-bold"
      >
        <Copy className="mr-2 h-5 w-5" />
        Copy Link
      </Button>
      <Button
        onClick={handleShare}
        size="lg"
        className="rounded-full font-bold bg-gradient-to-r from-primary to-celebration-blue hover:opacity-90 transition-opacity text-primary-foreground"
      >
        <Share2 className="mr-2 h-5 w-5" />
        Share the News
      </Button>
      <Button
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags.join(",")}`,
            "_blank"
          )
        }
        size="lg"
        variant="outline"
        className="rounded-full border-2 border-border bg-card text-foreground hover:bg-muted font-bold"
      >
        <Twitter className="mr-2 h-5 w-5" />
        Tweet
      </Button>
    </div>
  );
};
