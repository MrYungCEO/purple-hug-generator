
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import ApiKeyForm from "../generator/ApiKeyForm";
import LogoGenerator from "../generator/LogoGenerator";
import UserProfile from "./UserProfile";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, Sparkles } from "lucide-react";

const Dashboard = () => {
  const { profile, logout } = useAuth();

  if (!profile) return null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold purple-glow">LogoAI Dashboard</h2>
        <Button
          variant="ghost"
          className="text-white hover:text-purple hover:bg-dark-lighter"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserProfile user={profile} />
          <div className="mt-6">
            <ApiKeyForm />
          </div>
          <div className="mt-6 space-y-4">
            <div className="glass-card border-purple/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-purple" />
                Prompt Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple mt-1.5"></span>
                  <span>Be specific about target audience (tech startup, luxury brand, healthcare)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple mt-1.5"></span>
                  <span>Describe exact shapes and composition (circular, hexagonal, asymmetric)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple mt-1.5"></span>
                  <span>Specify exact colors (teal and orange, pastel blue, monochrome red)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple mt-1.5"></span>
                  <span>Mention design style (flat design, 3D rendered, gradient, minimalist)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple mt-1.5"></span>
                  <span>Include symbolic elements (leaf for eco brands, lightning for energy)</span>
                </li>
              </ul>
              <Button 
                variant="link" 
                className="text-purple text-xs p-0 h-auto mt-2"
                onClick={() => window.open("https://huggingface.co/blog/stable-diffusion-prompt-guide", "_blank")}
              >
                <BookOpen className="h-3 w-3 mr-1" />
                Read full guide
              </Button>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <LogoGenerator />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
