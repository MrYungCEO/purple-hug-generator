
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import AIModels from "@/components/landing/AIModels";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Dashboard from "@/components/dashboard/Dashboard";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      setActiveSection(hash);
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark">
        <Header />
        <div className="pt-20">
          <Dashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      
      {activeSection === "login" ? (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
          <LoginForm />
        </div>
      ) : activeSection === "register" ? (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
          <RegisterForm />
        </div>
      ) : (
        <main>
          <Hero />
          <Features />
          <AIModels />
          <div id="about" className="py-20 bg-dark">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                About <span className="text-purple">LogoAI</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
                LogoAI combines the power of artificial intelligence with intuitive design tools to help you create stunning logos for your brand. Our platform leverages state-of-the-art Hugging Face models to generate unique, professional logos based on your descriptions.
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Simply sign up, add your Hugging Face API key, and start generating beautiful logos in seconds. No design skills required!
              </p>
            </div>
          </div>
        </main>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
