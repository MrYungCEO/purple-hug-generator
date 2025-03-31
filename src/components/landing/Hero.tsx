
import React from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-20 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-dark-light">
        <div className="absolute inset-0 bg-gradient-to-r from-purple/20 to-transparent opacity-60"></div>
      </div>
      
      {/* Animated shapes */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple/20 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-dark/30 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: "-2s" }}></div>
      
      <div className="container relative mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white purple-glow">
          Create Beautiful <span className="text-purple">Logos</span> With AI
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto">
          Generate stunning logo designs in seconds using advanced AI models with our powerful logo generator
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="purple-gradient hover:opacity-90 animate-glow"
            onClick={() => window.location.hash = "register"}
          >
            <Wand2 className="h-5 w-5 mr-2" />
            Start Creating
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-purple text-white hover:bg-purple/10"
            onClick={() => window.location.hash = "login"}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
