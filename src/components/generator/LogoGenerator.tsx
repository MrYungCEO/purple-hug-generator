import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Info } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import GeneratedLogo from "./GeneratedLogo";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Enhanced Hugging Face models list with more options and better descriptions
const HF_MODELS = [
  { 
    id: "stabilityai/stable-diffusion-xl-base-1.0", 
    name: "Stable Diffusion XL",
    description: "High-quality, detailed logo generation with excellent composition"
  },
  { 
    id: "runwayml/stable-diffusion-v1-5", 
    name: "Stable Diffusion v1.5",
    description: "Balanced model for versatile logo creation"
  },
  { 
    id: "prompthero/openjourney-v4", 
    name: "OpenJourney v4",
    description: "Artistic style optimized for creative concepts"
  },
  { 
    id: "timbrooks/instruct-pix2pix", 
    name: "InstructPix2Pix",
    description: "Specialized in editing and refining existing logos"
  },
  { 
    id: "dall-e/dall-e-3", 
    name: "DALL-E 3",
    description: "Advanced text-to-image model with exceptional understanding of complex prompts"
  },
  { 
    id: "CompVis/stable-diffusion-v2", 
    name: "Stable Diffusion v2",
    description: "Improved version with better aesthetics and composition"
  },
  { 
    id: "lambdalabs/sd-image-variations-diffusers", 
    name: "SD Image Variations",
    description: "Specialized in creating variations of existing logos"
  },
  { 
    id: "SG161222/Realistic_Vision_V5.1", 
    name: "Realistic Vision V5.1",
    description: "Photorealistic style for highly detailed logo renderings"
  }
];

// Prompt templates to help users get better results
const PROMPT_TEMPLATES = [
  {
    title: "Minimalist Logo",
    prompt: "A minimalist logo for a company named [COMPANY], clean lines, simple shapes, professional, [STYLE], [COLOR] color scheme"
  },
  {
    title: "Tech Company",
    prompt: "A modern tech logo for [COMPANY], futuristic, innovative, abstract geometric shapes, [COLOR] gradient, vector style"
  },
  {
    title: "Luxury Brand",
    prompt: "An elegant luxury logo for [COMPANY], sophisticated, premium feel, [COLOR] and gold accents, timeless design"
  },
  {
    title: "Creative Agency",
    prompt: "A creative and playful logo for [COMPANY] agency, artistic, unique, [COLOR] palette, hand-crafted feel"
  }
];

const LogoGenerator = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("blurry, distorted text, low quality, pixelated");
  const [model, setModel] = useState(HF_MODELS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [advancedMode, setAdvancedMode] = useState(false);

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
      // Create the request options for the Hugging Face API
      const selectedModel = HF_MODELS.find(m => m.id === model)?.id || "stabilityai/stable-diffusion-xl-base-1.0";
      const apiEndpoint = `https://api-inference.huggingface.co/models/${selectedModel}`;
      
      // Prepare the request body
      let requestBody: any = {
        inputs: prompt,
      };
      
      // Add negative prompt for models that support it
      if (advancedMode && negativePrompt) {
        requestBody.parameters = {
          negative_prompt: negativePrompt
        };
      }
      
      // Call the Hugging Face API
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `API error: ${response.status}`);
      }
      
      // Get the image data from the response
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      
      setGeneratedLogo(imageUrl);
      toast.success("Logo generated successfully!");
    } catch (error) {
      console.error("Error generating logo:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate logo. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const applyPromptTemplate = (template: string) => {
    setPrompt(template);
  };

  const currentModelInfo = HF_MODELS.find(m => m.id === model);

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
            <label htmlFor="model" className="text-sm font-medium text-white flex items-center gap-2">
              Select Model
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                    <Info className="h-4 w-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-dark-lighter border-purple/30 p-3 max-w-sm">
                  <p className="text-sm text-white mb-2">Model Information:</p>
                  <p className="text-xs text-gray-300">{currentModelInfo?.description || "Select a model to see its description"}</p>
                </DropdownMenuContent>
              </DropdownMenu>
            </label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="bg-dark-lighter border-purple/30">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-dark border-purple/30 max-h-[300px]">
                {HF_MODELS.map((m) => (
                  <SelectItem key={m.id} value={m.id} className="focus:bg-purple/20 focus:text-white">
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="prompt" className="text-sm font-medium text-white">
                Prompt
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 text-xs text-gray-300 hover:text-white hover:bg-purple/20"
                  >
                    Templates
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-dark-lighter border-purple/30">
                  {PROMPT_TEMPLATES.map((template, index) => (
                    <DropdownMenuItem 
                      key={index} 
                      className="text-gray-300 hover:text-white focus:text-white hover:bg-purple/20 focus:bg-purple/20 cursor-pointer"
                      onClick={() => applyPromptTemplate(template.prompt)}
                    >
                      {template.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A modern minimalist logo for a tech company called 'Pulse', with clean lines and blue-purple gradient"
              className="bg-dark-lighter border-purple/30 focus:border-purple min-h-[100px] resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">
              Tip: Be specific about style, colors, and elements you want in your logo.
            </p>
          </div>

          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-purple hover:bg-purple/10" 
              onClick={() => setAdvancedMode(!advancedMode)}
            >
              {advancedMode ? "Hide Advanced Options" : "Show Advanced Options"}
            </Button>
          </div>

          {advancedMode && (
            <div className="space-y-2 pt-2 border-t border-purple/10">
              <label htmlFor="negativePrompt" className="text-sm font-medium text-white">
                Negative Prompt
              </label>
              <Input
                id="negativePrompt"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="Elements to avoid (e.g., text, realistic details, distortion)"
                className="bg-dark-lighter border-purple/30 focus:border-purple"
              />
              <p className="text-xs text-gray-400 mt-1">
                Specify what you don't want in the generated logo
              </p>
            </div>
          )}
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
