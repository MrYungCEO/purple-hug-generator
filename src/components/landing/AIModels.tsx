
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const models = [
  {
    name: "Stable Diffusion XL",
    description: "High resolution logo generation with exceptional detail and quality",
    features: ["High Detail", "Best Quality", "Large Size"],
    tags: ["POPULAR", "PREMIUM"],
  },
  {
    name: "Stable Diffusion v1.5",
    description: "Balanced model for creating versatile logo designs efficiently",
    features: ["Fast Generation", "Good Quality", "Versatile"],
    tags: ["STANDARD"],
  },
  {
    name: "OpenJourney v4",
    description: "Specialized in creating artistic and creative logo concepts",
    features: ["Artistic Style", "Creative", "Unique"],
    tags: ["CREATIVE"],
  },
  {
    name: "InstructPix2Pix",
    description: "Edit and refine existing logos with precise text instructions",
    features: ["Logo Editing", "Refinement", "Instructions Based"],
    tags: ["EDITING"],
  },
];

const AIModels = () => {
  return (
    <div id="models" className="py-20 bg-dark-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Powered by <span className="text-purple">AI Models</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose from a selection of powerful AI models to create the perfect logo
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((model, index) => (
            <Card
              key={index}
              className="glass-card border-purple/20 overflow-hidden group hover:border-purple/40 transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white text-xl">{model.name}</CardTitle>
                  <div className="flex gap-2">
                    {model.tags.map((tag, i) => (
                      <Badge key={i} className="bg-purple text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardDescription className="text-gray-300">
                  {model.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {model.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-white">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIModels;
