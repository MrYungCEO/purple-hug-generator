
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Palette, Zap, Image, Lock, Download } from "lucide-react";

const features = [
  {
    icon: <Lightbulb className="h-8 w-8 text-purple" />,
    title: "AI-Powered Generation",
    description: "Leverage powerful Hugging Face models to generate unique, creative logos",
  },
  {
    icon: <Palette className="h-8 w-8 text-purple" />,
    title: "Style Customization",
    description: "Choose from different styles and aesthetics to match your brand",
  },
  {
    icon: <Zap className="h-8 w-8 text-purple" />,
    title: "Fast Generation",
    description: "Generate professional logos in seconds, not days",
  },
  {
    icon: <Image className="h-8 w-8 text-purple" />,
    title: "High Resolution",
    description: "Download high-resolution logos ready for printing and digital use",
  },
  {
    icon: <Lock className="h-8 w-8 text-purple" />,
    title: "Secure & Private",
    description: "Your API keys and designs are securely stored and never shared",
  },
  {
    icon: <Download className="h-8 w-8 text-purple" />,
    title: "Easy Export",
    description: "Download your logos in various formats for different use cases",
  },
];

const Features = () => {
  return (
    <div className="bg-dark py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Powerful <span className="text-purple">Features</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to create stunning logos for your brand or clients
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass-card border-purple/20 hover:border-purple/40 transition-all duration-300"
            >
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
