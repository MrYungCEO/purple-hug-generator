
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";

interface GeneratedLogoProps {
  imageUrl: string;
  prompt: string;
}

const GeneratedLogo: React.FC<GeneratedLogoProps> = ({ imageUrl, prompt }) => {
  const handleDownload = () => {
    // Create a temporary link to download the image
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `logo-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Logo downloaded successfully!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My AI Generated Logo",
          text: `Check out this logo generated with the prompt: ${prompt}`,
          url: imageUrl,
        })
        .then(() => toast.success("Shared successfully!"))
        .catch((error) => toast.error("Error sharing: " + error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(imageUrl);
      toast.success("Image URL copied to clipboard!");
    }
  };

  return (
    <Card className="glass-card border-purple/30 overflow-hidden animate-fade-in">
      <CardHeader>
        <CardTitle className="text-white">Generated Logo</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-square w-full overflow-hidden bg-dark-lighter rounded-md flex items-center justify-center">
          <img
            src={imageUrl}
            alt="Generated logo"
            className="w-full h-full object-contain"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Button
          variant="outline"
          className="border-purple/30 text-white hover:bg-purple/10"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button
          className="purple-gradient hover:opacity-90"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeneratedLogo;
