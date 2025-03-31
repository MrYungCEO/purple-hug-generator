
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark py-10 border-t border-purple/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-purple mr-2 flex items-center justify-center">
                <span className="text-xl font-bold text-white">L</span>
              </div>
              <span className="text-xl font-bold text-white purple-glow">LogoAI</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Generate beautiful logos in seconds using the power of AI and your Hugging Face API key.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-purple transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#models" className="text-gray-400 hover:text-purple transition-colors">
                  AI Models
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-purple transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-purple/10 text-center">
          <p className="text-gray-500">
            &copy; {currentYear} LogoAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
