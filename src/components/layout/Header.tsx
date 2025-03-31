
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-purple/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple mr-2 flex items-center justify-center animate-pulse-purple">
                <span className="text-xl font-bold text-white">L</span>
              </div>
              <span className="text-xl font-bold text-white purple-glow">LogoAI</span>
            </a>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-300 hover:text-purple">
              Features
            </a>
            <a href="#models" className="text-gray-300 hover:text-purple">
              Models
            </a>
            <a href="#about" className="text-gray-300 hover:text-purple">
              About
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button
                className="purple-gradient hover:opacity-90"
                onClick={() => window.location.href = "/"}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-white hover:text-purple hover:bg-dark-lighter"
                  onClick={() => window.location.hash = "login"}
                >
                  Sign In
                </Button>
                <Button
                  className="purple-gradient hover:opacity-90"
                  onClick={() => window.location.hash = "register"}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
