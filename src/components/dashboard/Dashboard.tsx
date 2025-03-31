
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import ApiKeyForm from "../generator/ApiKeyForm";
import LogoGenerator from "../generator/LogoGenerator";
import UserProfile from "./UserProfile";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

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
          <UserProfile user={user} />
          <div className="mt-6">
            <ApiKeyForm />
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
