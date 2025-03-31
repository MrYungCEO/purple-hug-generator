
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import GeneratedLogo from "./GeneratedLogo";

// Mock Hugging Face models for demonstration
const HF_MODELS = [
  { id: "stabilityai/stable-diffusion-xl-base-1.0", name: "Stable Diffusion XL" },
  { id: "runwayml/stable-diffusion-v1-5", name: "Stable Diffusion v1.5" },
  { id: "prompthero/openjourney-v4", name: "OpenJourney v4" },
  { id: "timbrooks/instruct-pix2pix", name: "InstructPix2Pix" },
];

const LogoGenerator = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(HF_MODELS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);

  const generateLogo = async () => {
    if (!user?.apiKey) {
      toast.error("Please add your Hugging Face API key first");
      return;
    }

    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setGeneratedLogo(null);
    
    try {
      // Simulate API call to Hugging Face
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, generate a placeholder image
      // In a real app, you would call the Hugging Face API using the user's API key
      const randomId = Math.floor(Math.random() * 1000);
      const placeholderUrl = `https://picsum.photos/seed/${randomId}/800/800`;
      
      setGeneratedLogo(placeholderUrl);
      toast.success("Logo generated successfully!");
    } catch (error) {
      toast.error("Failed to generate logo. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card border-purple/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Wand2 className="h-5 w-5 text-purple" />
            Logo Generator
          </CardTitle>
          <CardDescription>
            Create stunning logos using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="model" className="text-sm font-medium text-white">
              Select Model
            </label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="bg-dark-lighter border-purple/30">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-dark border-purple/30">
                {HF_MODELS.map((m) => (
                  <SelectItem key={m.id} value={m.id} className="focus:bg-purple/20 focus:text-white">
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium text-white">
              Prompt
            </label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A modern minimalist logo for a tech company called 'Pulse'"
              className="bg-dark-lighter border-purple/30 focus:border-purple"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={generateLogo}
            disabled={isGenerating || !user?.apiKey}
            className="w-full purple-gradient hover:opacity-90 transition-opacity"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                Generate Logo
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>

      {generatedLogo && <GeneratedLogo imageUrl={generatedLogo} prompt={prompt} />}
    </div>
  );
};

export default LogoGenerator;
